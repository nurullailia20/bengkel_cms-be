import { Router } from 'express'
import { createUserSession, userRegistration } from '../controllers/auth.controller'

export const AuthRouter: Router = Router()

AuthRouter.post('/register', userRegistration)
AuthRouter.post('/login', createUserSession)
