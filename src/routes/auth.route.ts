import { Router } from 'express'
import { createUserSession, userRegistration, refreshSession, getUsers } from '../controllers/auth.controller'

export const AuthRouter: Router = Router()

AuthRouter.get('/', getUsers)
AuthRouter.post('/register', userRegistration)
AuthRouter.post('/login', createUserSession)
AuthRouter.post('/refresh', refreshSession)
