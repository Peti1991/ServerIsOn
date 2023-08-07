import express from "express"
import type { Request, Response } from "express"
import cors from "cors"
import fs from "fs/promises"
import { z } from "zod"

const server = express()

server.use(cors())

type User = {
  id: number
  name: string
  age: number
}

const parse = (data: string): User[] => data
    .split("\n")
    .filter(row => !!row)
    .map(row => ({
      id: +row.split(",")[0],
      name: row.split(",")[1],
      age: +row.split(",")[2],
    }))

// REST API - GET (method) /api/users (path) -> array
/* server.get("/api/users", async (req: Request, res: Response) => {

  const userData = await fs.readFile("./database/users.txt", "utf-8")

  const response: User[] = parse(userData)

  res.json(response)
}) */

const QuerySchema = z.object({
  name: z.string(),
})

// GET /api/users?name=John   /api/users?age=30&name=John  -> array
/* server.get("/api/users", async (req: Request, res: Response) => {

  const result = QuerySchema.safeParse(req.query)
  if (!result.success)
    return res.sendStatus(400)
  const query = result.data

  const userData = await fs.readFile("./database/users.txt", "utf-8")
  const users = parse(userData)
  let filteredUsers = users.filter(user => user.name.includes(query.name))

  res.json(filteredUsers)
}) */

// GET /api/users/15 (id!!!!) path variable -> 1 object
server.get("/api/users/:id", async (req: Request, res: Response) => {
  const id = +req.params.id

  const userData = await fs.readFile("./database/users.txt", "utf-8")
  const users = parse(userData)
  let filteredUser = users.find(user => user.id === id)

  if (!filteredUser)
    return res.sendStatus(404)

  res.json(filteredUser)
})

server.listen(3333)