import express from "express"
import type { Request, Response } from "express"
import cors from "cors"
import fs from "fs/promises"
import { z } from "zod"

const server = express()

server.use(cors())
server.use(express.json())

type Student = {
  id: number
  name: string
  status: boolean
}

const BodySchema = z.object({
  name: z.string(),
})

server.get("/", async (req: Request, res: Response) => {
  res.send("<h1>Hello World! It's Codecool</h1>")
})

server.get("/api/users",async (req: Request, res: Response) => {
  const userData = await fs.readFile("./database/students.json","utf-8")
  const students:Student[] = JSON.parse(userData)

  res.send(students)
})

server.get("/api/users/:id", async (req: Request, res: Response) => {
  const id = +req.params.id

  const userData = await fs.readFile("./database/students.json","utf-8")
  const students:Student[] = JSON.parse(userData)
  const student = students.find(student => student.id === id)

  if (!student)
    return res.sendStatus(404)

  res.json(student)
})

server.get("/api/status/active",async (req: Request, res: Response) => {


  const userData = await fs.readFile("./database/students.json","utf-8")
  const students:Student[] = JSON.parse(userData)
  const activeStudents: Student[] = students.filter((student) => student.status === true)

  res.send(activeStudents)
})

server.get("/api/status/finished",async (req: Request, res: Response) => {
  const userData = await fs.readFile("./database/students.json","utf-8")
  const students:Student[] = JSON.parse(userData)
  const finishedStudents: Student[] = students.filter((student) => student.status === false)

  res.send(finishedStudents)
})

server.post("/api/students", async (req: Request, res: Response) => {

  const result = BodySchema.safeParse(req.body)
  if (!result.success) 
    return res.sendStatus(400)
  
  const body = result.data

  const userData = await fs.readFile("./database/students.json","utf-8")
  const students:Student[] = JSON.parse(userData)

  const student:Student = {id: students.length+1, name: body.name, status: true}
  students.push(student)

  await fs.writeFile("./database/students.json", JSON.stringify(students), "utf-8")
  res.json(students)
})


server.listen(3333)