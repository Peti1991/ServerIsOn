import express from "express"
import type { Request, Response } from "express"
import cors from "cors"
import fs from "fs/promises"
import { z } from "zod"

const server = express()

server.use(cors())
server.use(express.json())

const BodySchema = z.object({
  name: z.string(),
})

const StudentSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.boolean()
})

type Student = z.infer<typeof StudentSchema>;

server.get("/", async (req: Request, res: Response) => {
  res.send("<h1>Hello World! It's Codecool</h1>")
})

server.get("/api/users",async (req: Request, res: Response) => {

  const students = await getData("./database/", "students.json")
  if (!students)
    return res.sendStatus(404)

  res.send(students)
})

server.get("/api/users/:id", async (req: Request, res: Response) => {
  const id = +req.params.id

  const students = await getData("./database/", "students.json")
  if (!students)
    return res.sendStatus(404)

  const student = students.find(student => student.id === id)
  if (!student)
    return res.sendStatus(404)

  res.json(student)
})

server.get("/api/status/active",async (req: Request, res: Response) => {

  const students = await getData("./database/", "students.json")
  if (!students)
    return res.sendStatus(404)
  
  const activeStudents = students.filter((student) => student.status === true)
  if (!activeStudents)
    return res.sendStatus(404)

  res.send(activeStudents)
})

server.get("/api/status/finished",async (req: Request, res: Response) => {

  const students = await getData("./database/", "students.json")
  if (!students)
    return res.sendStatus(404)

  const finishedStudents:Student[] = students.filter((student) => student.status === false)
  if (!finishedStudents)
    return res.sendStatus(404)

  res.send(finishedStudents)
})

server.post("/api/students", async (req: Request, res: Response) => {

  const resultBody = BodySchema.safeParse(req.body)
  if (!resultBody.success) 
    return res.sendStatus(400)
  
  const body = resultBody.data

  const students = await getData("./database/", "students.json")
  if (!students)
    return res.sendStatus(404)

  const student:Student = {id: students.length+1, name: body.name, status: true}
  students.push(student)

  await fs.writeFile("./database/students.json", JSON.stringify(students), "utf-8")
  res.json(students)
})

async function getData(path:string, filename:string) {
  const userData = await fs.readFile(path + filename,"utf-8")
  
  const result = StudentSchema.array().safeParse(JSON.parse(userData))
  if (!result.success)
    return null
  return  result.data
}

server.listen(3333)