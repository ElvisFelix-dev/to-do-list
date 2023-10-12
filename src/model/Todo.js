import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema(
  {
    name: { type: String },
    createdAt: { type: Date, default: Date.now }, // Adicione a propriedade createdAt
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Associe o "to-do" a um usuário
  },
  {
    timestamps: true,
  },
)

const Todo = mongoose.model('Todo', todoSchema)
export default Todo
