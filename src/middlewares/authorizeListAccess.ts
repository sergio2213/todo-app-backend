import { NextFunction, Request, Response } from 'express'
import pool from '../utils/db'
import { TodoListRow } from '../types/list.type'

export const authorizeListAccess = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { listId } = req.params
  const { id } = req.user
  try {
    const sql = 'SELECT * FROM todolists WHERE list_id = ? AND user_id = ?'
    const values = [listId, id]
    // const [rows] = await pool.query<TodoRow[]>(sql, values)
    const [rows] = await pool.query<TodoListRow[]>(sql, values)
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
