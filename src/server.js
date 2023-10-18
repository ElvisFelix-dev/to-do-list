import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import http from 'http'

import { Server } from 'socket.io'

import dotEnv from 'dotenv'

import userRoute from './routes/users.js'
import todoRoute from './routes/todos.js'

dotEnv.config()

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('📊 connected to db')
  })
  .catch((err) => {
    console.log(err.message)
  })

const app = express()
const server = http.createServer(app)
app.use(cors())

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3333',
    credentials: true,
  },
})

const connectedUsers = {}

io.emit('add To-do')

io.on('connection', (socket) => {
  console.log(socket.handshake.query)

  const { user_id } = socket.handshake.query

  connectedUsers[user_id] = socket.id
})

app.use(express.json())

app.use('/users', userRoute)
app.use('/todos', todoRoute)

app.listen(3333, () => {
  console.log(`💻 server running`)
})
