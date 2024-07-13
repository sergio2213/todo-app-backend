import { RequestHandler, Router } from 'express'
import { fetchLists, fetchTodos, createList, createTodo, updateList, updateTodo, deleteList, deleteTodo, updateIsCompleted, fetchOneList } from '../controllers/list.controller'
import { verifyToken } from '../middlewares/verifyToken'
import { authorizeListAccess } from '../middlewares/authorizeListAccess'
import { authorizeTodoAccess } from '../middlewares/authorizeTodoAccess'

const router = Router()

router.post('/', verifyToken, createList as RequestHandler)
router.get('/', verifyToken, fetchLists as RequestHandler)
router.get('/:listId', verifyToken, fetchOneList as RequestHandler)
router.get('/:listId/todos', verifyToken, authorizeListAccess as RequestHandler, fetchTodos as RequestHandler)
router.post('/:listId/todos', verifyToken, authorizeListAccess as RequestHandler, createTodo as RequestHandler)
router.patch('/:listId', verifyToken, authorizeListAccess as RequestHandler, updateList as RequestHandler)
router.patch('/:listId/todos/:todoId', verifyToken, authorizeListAccess as RequestHandler, authorizeTodoAccess as RequestHandler, updateTodo as RequestHandler)
router.delete('/:listId', verifyToken, authorizeListAccess as RequestHandler, deleteList as RequestHandler)
router.delete('/:listId/todos/:todoId', verifyToken, authorizeListAccess as RequestHandler, authorizeTodoAccess as RequestHandler, deleteTodo as RequestHandler)
router.patch('/:listId/todos/:todoId/completed', verifyToken, authorizeListAccess as RequestHandler, authorizeTodoAccess as RequestHandler, updateIsCompleted as RequestHandler)

export default router
