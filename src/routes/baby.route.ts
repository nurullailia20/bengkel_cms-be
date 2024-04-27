import { Router } from 'express'
import { createBaby, deleteBaby, getBaby, getBabyDetail, updateBaby } from '../controllers/baby.controller'

export const BabyRouter: Router = Router()

BabyRouter.get('/', getBaby)
BabyRouter.get('/:id', getBabyDetail)
BabyRouter.post('/', createBaby)
BabyRouter.delete('/:id', deleteBaby)
BabyRouter.put('/:id', updateBaby)
