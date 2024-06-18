import { Router } from 'express'
import { userRegistration, createSession, getUsers, refreshSession } from '../controllers/auth.controller'
// import {
//   createCustomer,
//   deleteCustomer,
//   getCustomer,
//   getCustomerDetail,
//   updateCustomer
// } from '../controllers/customer.controller'
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductDetail,
  updateProduct
} from '../controllers/product.controller'
import { baseRoute } from './baseRoute.route'
import { createServiceHistory } from '../controllers/serviceHistory.controller'
import { createCustomerItem } from '../controllers/customerItem.controller'

const router = Router()

// base
router.get('/', baseRoute)

// auth
router.get('/auth/', getUsers)
router.post('/auth/register', userRegistration)
router.post('/auth/login', createSession)
router.post('/auth/refresh', refreshSession)

// customer item
router.post('/customer-item', createCustomerItem)

// Customer
// router.get('/customer/', getCustomer)
// router.post('/customer/', createCustomer)
// router.delete('/customer/:id', deleteCustomer)
// router.get('/customer/:id', getCustomerDetail)
// router.put('/customer/:id', updateCustomer)

// product
router.get('/product/', getProduct)
router.post('/product/add/', createProduct)
router.delete('/product/delete/:id', deleteProduct)
router.get('/product/detail/:id', getProductDetail)
router.put('/product/update/:id', updateProduct)

// service_history
router.post('/service_history', createServiceHistory)

export default router
