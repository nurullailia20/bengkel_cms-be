import { Router } from 'express'
import { createCustomer, deleteCustomer, getCustomer, getCustomerDetail, updateCustomer } from '../controllers/customer.controller'

export const CustomerRouter: Router = Router()

CustomerRouter.get('/', getCustomer)
CustomerRouter.post('/', createCustomer)
CustomerRouter.delete('/:id', deleteCustomer)
CustomerRouter.get('/:id', getCustomerDetail)
CustomerRouter.put('/:id', updateCustomer)
