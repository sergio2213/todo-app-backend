import { sign } from 'jsonwebtoken'
import argon2 from 'argon2'
import { User } from '../types/user.type'
import { getUserByEmail } from './user.service'

export const generateToken = (payload: any): string => {
  return sign(payload, process.env.TOKEN_SECRET_KEY as string, { expiresIn: '1h' })
}

export const validatePassword = async (passwordHash: string, password: string): Promise<boolean> => {
  return await argon2.verify(passwordHash, password)
}

export const loginService = async (email: string, password: string): Promise<User | null> => {
  try {
    const user = await getUserByEmail(email)
    if (user != null) {
      const isPasswordValid = await argon2.verify(user.password_hash as string, password)
      if (isPasswordValid) {
        console.log('Password is valid')
        return user
      } else {
        console.log('Password is not valid')
        return null
      }
    } else {
      console.log('User does not exist')
      return null
    }
  } catch (err) {
    console.log(err)
    return null
  }
}
