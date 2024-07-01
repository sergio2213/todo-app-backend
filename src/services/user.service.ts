import argon2 from 'argon2'
import pool from '../utils/db'
import { User, UserRow } from '../types/user.type'

export const checkIfEmailOrUsernameExists = async (email: string, username: string): Promise<boolean> => {
  return await getUserByEmail(email) !== null || await getUserByUsername(username) !== null
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const sql = 'SELECT * FROM `users` WHERE `email` = ?'
    const values = [email]
    const [rows] = await pool.query<UserRow[]>(sql, values)
    if (rows.length > 0) {
      const userRow = rows[0]
      const user: User = {
        id: userRow.user_id,
        email: userRow.email,
        username: userRow.username,
        password_hash: userRow.password_hash
      }
      return user
    } else {
      return null
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
    }
    return null
  }
}

export const getUserByUsername = async (username: string): Promise<User | null> => {
  try {
    const sql = 'SELECT * FROM users where username = ?'
    const values = [username]
    const [rows] = await pool.query<UserRow[]>(sql, values)
    if (rows.length > 0) {
      const userRow = rows[0]
      const user: User = {
        id: userRow.user_id,
        email: userRow.email,
        username: userRow.username,
        password_hash: userRow.password_hash
      }
      return user
    } else {
      return null
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
    }
    return null
  }
}

export const createUserService = async (username: string, email: string, password: string): Promise<void> => {
  try {
    const passwordHash = await argon2.hash(password)
    const sql = 'INSERT INTO `users`(`username`, `email`, `password_hash`) VALUES (?, ?, ?)'
    const values = [username, email, passwordHash]
    const [result] = await pool.execute(sql, values)
    console.log(result)
  } catch (err) {
    console.log(err)
  }
}
