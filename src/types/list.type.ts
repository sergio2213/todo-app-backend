import { RowDataPacket } from 'mysql2'

export interface TodoList {
  id: string
  userId: string
  title: string
  description: string
}

export interface TodoListRow extends RowDataPacket {
  list_id: string
  user_id: string
  title: string
  description: string
}
export interface Todo {
  id: string
  todoListId: string
  title: string
  description?: string
  isCompleted: boolean
}

export interface TodoRow extends RowDataPacket {
  todo_id: string
  list_id: string
  title: string
  description: string
  is_completed: boolean
}
