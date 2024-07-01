import { Request, Response } from 'express'
import { getUserByEmail } from '../services/user.service'
import { generateToken, validatePassword } from '../services/auth.service'

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body
  if (email === '' || password === '' || Object.keys(req.body).length === 0) {
    res.status(400).json({
      message: 'All fields are required',
      ok: false
    })
    return
  }
  const user = await getUserByEmail(email)
  if (user === null) {
    res.status(404).json({
      message: 'User not found',
      ok: false
    })
    return
  }
  const isValidate = await validatePassword(user.password_hash as string, password)
  if (!isValidate) {
    res.status(401).json({
      message: 'Password is incorrect',
      ok: false
    })
    return
  }
  const token = generateToken({ id: user.id, username: user.username, email: user.email })
  res.cookie('jwt-token', token)
  res.status(200).json({
    message: 'Password is correct',
    ok: true,
    data: { token, user: { id: user.id, email: user.email, username: user.username } }
  })
}
