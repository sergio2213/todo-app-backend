import express from 'express'
import userRouter from './routes/user.route'
import authRouter from './routes/auth.route'
import listRouter from './routes/list.route'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())

app.get('/', (_req, res) => {
  res.send('<h1>Express App</h1>')
})

app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/lists', listRouter)

export default app
