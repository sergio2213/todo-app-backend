import { NextFunction, Request, Response } from 'express'
import pool from '../utils/db'
import { TodoRow } from '../types/list.type'

export const authorizeTodoAccess = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { listId, todoId } = req.params
  try {
    const sql = 'SELECT * FROM todos WHERE list_id = ? AND todo_id = ?'
    const values = [listId, todoId]
    const [rows] = await pool.query<TodoRow[]>(sql, values)
    if (rows.length === 0) {
      res.status(403).json({
        message: 'Not authorized',
        ok: false
      })
      return
    }
    next()
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
    }
    res.status(500).json({
      message: 'Server internal error',
      ok: false
    })
  }
}
