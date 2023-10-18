import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

// import http from 'http' // Importe o módulo http
// import { Server } from 'socket.io'

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
/* const server = http.createServer(app)
const io = new Server(server) */
app.use(cors())

/* io.on('connection', (socket) => {
  console.log('Usuário conectado', socket.id)

  // Emita um evento Socket.IO para notificar os clientes
  io.sockets.emit('newTodo')
}) */

app.use(express.json())

app.use('/users', userRoute)
app.use('/todos', todoRoute)

app.listen(3333, () => {
  console.log(`💻 server running`)
})
