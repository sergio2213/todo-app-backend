import { ResultSetHeader } from 'mysql2'
import { Todo, TodoList, TodoListRow, TodoRow } from '../types/list.type'
import pool from '../utils/db'

export const getLists = async (id: string): Promise<TodoList[] | null> => {
  try {
    const sql = 'SELECT * FROM todolists WHERE user_id = ?'
    const values = [id]
    const [rows] = await pool.query<TodoListRow[]>(sql, values)
    const lists: TodoList[] = []
    if (rows.length > 0) {
      rows.forEach((todoListRow) => {
        const todoList: TodoList = {
          id: todoListRow.list_id,
          userId: todoListRow.user_id,
          title: todoListRow.title,
          description: todoListRow.description
        }
        lists.push(todoList)
      })
    }
    return lists
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
    }
    return null
  }
}

export const getOneListService = async (id: string): Promise<TodoList | null> => {
  try {
    const sql = 'SELECT * FROM todolists WHERE list_id = ?'
    const values = [id]
    const [rows] = await pool.query<TodoListRow[]>(sql, values)
    if (rows.length === 1) {
      const todoListRow = rows[0]
      const list: TodoList = {
        id: todoListRow.list_id,
        userId: todoListRow.user_id,
        title: todoListRow.title,
        description: todoListRow.description
      }
      return list
    }
    return null
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
    }
    return null
  }
}

export const getTodos = async (id: string): Promise<Todo[] | null> => {
  try {
    const sql = 'SELECT * FROM todos where list_id = ?'
    const values = [id]
    const [rows] = await pool.query<TodoRow[]>(sql, values)
    const todos: Todo[] = []
    if (rows.length > 0) {
      rows.forEach((todoRow) => {
        const todo: Todo = {
          id: todoRow.todo_id,
          todoListId: todoRow.list_id,
          title: todoRow.title,
          description: todoRow.description,
          isCompleted: Boolean(todoRow.is_completed)
        }
        todos.push(todo)
      })
    }
    return todos
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
    }
    return null
  }
}

export interface CreateListParams {
  userId: string
  title: string
  description?: string
}

export const createListService = async (params: CreateListParams): Promise<number | null> => {
  try {
    const sql = 'INSERT INTO todolists (user_id, title, description) values (?, ?, ?)'
    const { userId, title, description } = params
    const values = [userId, title, description]
    const [results] = await pool.query<ResultSetHeader>(sql, values)
    return results.insertId
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
    }
    return null
  }
}

export interface CreateTodoParams {
  listId: string
  title: string
  description?: string
}

export const createTodoService = async (params: CreateTodoParams): Promise<number | null> => {
  try {
    const sql = 'INSERT INTO todos (list_id, title, description) values (?, ?, ?)'
    const { listId, title, description } = params
    const values = [listId, title, description]
    const [results] = await pool.query<ResultSetHeader>(sql, values)
    return results.insertId
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
    }
    return null
  }
}

interface UpdateListParams {
  listId: string
  title?: string
  description?: string
}

export const updateListService = async (params: UpdateListParams): Promise<number | null> => {
  try {
    const { listId, title, description } = params
    let sql = 'UPDATE todolists SET '
    const values = []
    if (title !== undefined) {
      sql += 'title = ?, '
      values.push(title)
    }
    if (description !== undefined) {
      sql += 'description = ?, '
      values.push(description)
    }
    sql = sql.slice(0, -2)
    sql += ' WHERE list_id = ?'
    values.push(listId)
    const [result] = await pool.query<ResultSetHeader>(sql, values)
    console.log('Affected rows:', result.affectedRows)
    return result.affectedRows
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
    }
    return null
  }
}

interface UpdateTodoParams {
  todoId: string
  title?: string
  description?: string
}

export const updateTodoService = async (params: UpdateTodoParams): Promise<number | null> => {
  try {
    const { todoId, title, description } = params
    const values = []
    let sql = 'UPDATE todos SET '
    if (title !== undefined) {
      sql += 'title = ?, '
      values.push(title)
    }
    if (description !== undefined) {
      sql += 'description = ?, '
      values.push(description)
    }
    sql = sql.slice(0, -2)
    sql += ' WHERE todo_id = ?'
    values.push(todoId)
    const [result] = await pool.query<ResultSetHeader>(sql, values)
    return result.affectedRows
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
    }
    return null
  }
}

export const deleteListService = async (listId: string): Promise<number | null> => {
  try {
    const sql = 'DELETE FROM todolists WHERE list_id = ?'
    const values = [listId]
    const [result] = await pool.query<ResultSetHeader>(sql, values)
    return result.affectedRows
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
    }
    return null
  }
}

export const deleteTodoService = async (todoId: string): Promise<number | null> => {
  try {
    const sql = 'DELETE FROM todos WHERE todo_id = ?'
    const values = [todoId]
    const [result] = await pool.query<ResultSetHeader>(sql, values)
    return result.affectedRows
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
    }
    return null
  }
}

interface UpdateIsCompletedParams {
  todoId: string
  isCompleted: boolean
}

export const updateIsCompletedService = async (params: UpdateIsCompletedParams): Promise<number | null> => {
  try {
    const sql = 'UPDATE todos SET is_completed = ? WHERE todo_id = ?'
    const { isCompleted, todoId } = params
    const values = [isCompleted, todoId]
    const [result] = await pool.query<ResultSetHeader>(sql, values)
    return result.affectedRows
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
    }
    return null
  }
}
