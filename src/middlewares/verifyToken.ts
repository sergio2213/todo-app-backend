import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../types/user.type'

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1]
  if (token === undefined) {
    res.status(401).json({
      message: 'Authentication required',
      ok: false
    })
    return
  }
  jwt.verify(token, process.env.TOKEN_SECRET_KEY as string, (err, decode) => {
    if (err !== null) {
      res.status(403).json({
        message: 'Invalid token',
        ok: false
      })
      return
    }
    req.user = decode as User
    next()
  })
}
