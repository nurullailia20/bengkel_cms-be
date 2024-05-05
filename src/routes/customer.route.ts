import { Router } from 'express'
import { createBaby, createCustomer, deleteBaby, getBaby, getBabyDetail, updateBaby } from '../controllers/baby.controller'
import { requireUser } from '../middleware/auth'

export const CustomerRouter: Router = Router()

// BabyRouter.get('/', getBaby)
// BabyRouter.get('/:id', getBabyDetail)
CustomerRouter.post('/', createCustomer)
// BabyRouter.delete('/:id', deleteBaby)
// BabyRouter.put('/:id', updateBaby)
