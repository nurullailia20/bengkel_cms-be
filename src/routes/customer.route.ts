// import { Router } from 'express'
// // import { createBaby, createCustomer, deleteBaby, getBaby, getBabyDetail, updateBaby } from '../controllers/customer.controller'
// import { requireUser } from '../middleware/auth'
// import { createCustomer, deleteCustomer, getCustomer } from '../controllers/customer.controller'

// export const CustomerRouter: Router = Router()

// CustomerRouter.get('/', getCustomer)
// // BabyRouter.get('/:id', getBabyDetail)
// CustomerRouter.post('/', createCustomer)
// CustomerRouter.delete('/:id', deleteCustomer)
// // BabyRouter.put('/:id', updateBaby)
import { Router } from 'express'
import { createCustomer, deleteCustomer, getCustomer, getCustomerDetail, updateCustomer } from '../controllers/customer.controller'

export const CustomerRouter: Router = Router()

CustomerRouter.get('/', getCustomer)
CustomerRouter.post('/', createCustomer)
CustomerRouter.delete('/:id', deleteCustomer)
CustomerRouter.get('/:id', getCustomerDetail)
CustomerRouter.put('/:id', updateCustomer)
