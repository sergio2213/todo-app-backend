import { RequestHandler, Router } from 'express'
import { createUser } from '../controllers/user.controller'
const router = Router()

router.post('/new', createUser as RequestHandler)

export default router
