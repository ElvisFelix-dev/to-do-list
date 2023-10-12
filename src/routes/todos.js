import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Todo from '../model/Todo.js'
import { isAuth } from '../utils.js'

const todoRoute = express.Router()

todoRoute.get(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const userId = req.user._id // ID do usuário autenticado
    const todos = await Todo.find({ userId }) // Busque "to-dos" do usuário pelo ID
    // const todos = await Todo.find().sort({ createdAt: -1 }) // Ordene por data de criação em ordem decrescente

    res.send(todos) // Envie a lista de "to-dos" ordenada como uma resposta JSON
  }),
)

todoRoute.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { name } = req.body

    if (!name || name.trim() === '') {
      res.status(400).send({ message: 'O campo "name" é obrigatório' })
      return
    }

    const newTodo = new Todo({
      name,
      userId: req.user._id, // Associe o "to-do" ao ID do usuário autenticado
    })

    const createdTodo = await newTodo.save()

    res
      .status(201)
      .send({ message: 'To-Do criado com sucesso', todo: createdTodo })
  }),
)

// Rota para excluir um "to-do" pelo ID
todoRoute.delete(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const todoId = req.params.id // Obtenha o ID do "to-do" a ser excluído

    // Verifique se o ID é válido (por exemplo, se é um ID válido do MongoDB)

    // Tente excluir o "to-do" com base no ID
    const deletedTodo = await Todo.findByIdAndRemove(todoId)

    if (deletedTodo) {
      res.send({ message: 'To-Do excluído com sucesso', todo: deletedTodo })
    } else {
      res.status(404).send({ message: 'To-Do não encontrado' })
    }
  }),
)

// outros códigos do arquivo
export default todoRoute
