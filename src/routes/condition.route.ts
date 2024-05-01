import { Router } from 'express'
import { DeleteBabyCondition, createBabyCondition, getBabyConditions } from '../controllers/condition.controller'
import { requireBaby } from '../middleware/baby'

export const BabyConditionRouter: Router = Router()

BabyConditionRouter.get('/:id', requireBaby, getBabyConditions)
BabyConditionRouter.post('/:id', requireBaby, createBabyCondition)
BabyConditionRouter.delete('/:id', requireBaby, DeleteBabyCondition)
