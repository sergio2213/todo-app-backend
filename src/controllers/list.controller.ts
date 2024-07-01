import { Request, Response } from 'express'
import { createListService, createTodoService, deleteListService, deleteTodoService, getLists, getTodos, updateIsCompletedService, updateListService, updateTodoService } from '../services/list.service'

export const fetchLists = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.user
  const todoLists = await getLists(id)
  if (todoLists === null) {
    res.status(500).json({
      message: 'Internal server error',
      ok: false
    })
    return
  }
  res.status(200).json({
    message: 'Success',
    ok: true,
    data: {
      todoLists
    }
  })
}

export const fetchTodos = async (req: Request, res: Response): Promise<void> => {
  const listId = req.params.listId
  const todos = await getTodos(listId)
  res.status(200).json({
    message: 'Authorized',
    ok: true,
    data: {
      todos
    }
  })
}

export const createList = async (req: Request, res: Response): Promise<void> => {
  const { title, description } = req.body
  const userId = req.user.id
  if (title === '' || Object.keys(req.body).length === 0) {
    res.status(400).json({
      message: 'Bad request',
      ok: false
    })
    return
  }
  const insertedId = await createListService({ userId, title, description })
  if (insertedId === null) {
    res.status(500).json({
      message: 'Internal server error',
      ok: false
    })
    return
  }
  res.status(201).json({
    message: 'Todo List have been created',
    ok: true,
    listId: insertedId
  })
}

export const createTodo = async (req: Request, res: Response): Promise<void> => {
  const { title, description } = req.body
  const listId = req.params.listId
  if (title === '' || title === undefined || Object.keys(req.body).length === 0) {
    res.status(400).json({
      message: 'Bad request',
      ok: false
    })
    return
  }
  const newTodoId = await createTodoService({ listId, title, description })
  if (newTodoId === null) {
    res.status(500).json({
      message: 'Internal server error',
      ok: false
    })
    return
  }
  res.status(201).json({
    message: 'Todo have been created',
    ok: true,
    todoId: newTodoId
  })
}

export const updateList = async (req: Request, res: Response): Promise<void> => {
  const { title, description } = req.body
  const listId = req.params.listId
  // const userId = req.user.id
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({
      message: 'Bad request',
      ok: false
    })
    return
  }
  const listIdUpdated = await updateListService({ listId, title, description })
  if (listIdUpdated === null) {
    res.status(500).json({
      message: 'Internal server error',
      ok: false
    })
    return
  }
  res.status(200).json({
    message: 'List has been updated',
    ok: true
  })
}

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({
      message: 'Bad request',
      ok: false
    })
    return
  }
  const { title, description } = req.body
  const { todoId } = req.params
  const affectedRows = await updateTodoService({ todoId, title, description })
  if (affectedRows === null) {
    res.status(500).json({
      message: 'Internal server error',
      ok: false
    })
    return
  }
  res.status(200).json({
    message: 'Todo has been updated',
    ok: true
  })
}

export const deleteList = async (req: Request, res: Response): Promise<void> => {
  const { listId } = req.params
  const affectedRows = await deleteListService(listId)
  if (affectedRows === null) {
    res.status(500).json({
      message: 'Internal server error',
      ok: false
    })
    return
  }
  if (affectedRows === 0) {
    res.status(404).json({
      message: 'Todo List not found',
      ok: false
    })
    return
  }
  res.status(200).json({
    message: 'Todo List has been deleted',
    ok: true
  })
}

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  const { todoId } = req.params
  const affectedRows = await deleteTodoService(todoId)
  if (affectedRows === null) {
    res.status(500).json({
      message: 'Internal server error',
      ok: false
    })
    return
  }
  if (affectedRows === 0) {
    res.status(404).json({
      message: 'Todo not found',
      ok: false
    })
    return
  }
  res.status(200).json({
    message: 'Todo has been deleted',
    ok: true
  })
}

export const updateIsCompleted = async (req: Request, res: Response): Promise<void> => {
  const { todoId } = req.params
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({
      message: 'isCompleted field is required',
      ok: false
    })
    return
  }
  const { isCompleted } = req.body
  if (typeof isCompleted !== 'boolean') {
    res.status(400).json({
      message: 'isCompleted field must be a boolean',
      ok: false
    })
    return
  }
  const affectedRows = await updateIsCompletedService({ todoId, isCompleted })
  if (affectedRows === null) {
    res.status(500).json({
      message: 'Internal server error',
      ok: false
    })
    return
  }
  if (affectedRows === 0) {
    res.status(404).json({
      message: 'Todo not found',
      ok: false
    })
    return
  }
  res.status(200).json({
    message: 'Todo has been updated',
    ok: true
  })
}
