import { Router } from 'express'
import { createBabyCondition, getBabyConditions } from '../controllers/condition.controller'
// import { createBaby, deleteBaby, getBaby, getBabyDetail, updateBaby } from '../controllers/baby.controller'

export const BabyConditionRouter: Router = Router()

BabyConditionRouter.get('/:id', getBabyConditions)
// BabyRouter.get('/:id', getBabyDetail)
BabyConditionRouter.post('/:id', createBabyCondition)
// BabyRouter.delete('/:id', deleteBaby)
// BabyRouter.put('/:id', updateBaby)
