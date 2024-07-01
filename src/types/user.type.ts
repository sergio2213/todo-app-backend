import { RowDataPacket } from 'mysql2'

export interface User {
  id: string
  username: string
  email: string
  password_hash?: string
}

export interface UserRow extends RowDataPacket {
  user_id: string
  username: string
  email: string
  password_hash: string
}
