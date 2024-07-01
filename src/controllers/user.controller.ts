import { Request, Response } from 'express'
import { createUserService, checkIfEmailOrUsernameExists } from '../services/user.service'

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body
  if (username === '' || email === '' || password === '') {
    res.status(400).json({
      message: 'All fields are required',
      ok: false
    })
    return
  }
  const emailOrUsernameExist = await checkIfEmailOrUsernameExists(email, username)
  if (emailOrUsernameExist) {
    res.status(409).json({
      message: 'Email/Username already exists',
      ok: false
    })
    return
  }
  await createUserService(username, email, password)
  res.status(201).json({
    message: 'User has been created',
    ok: true
  })
}
