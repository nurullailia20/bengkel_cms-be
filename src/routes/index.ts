import { Router } from 'express'
import { userRegistration, createSession, getUsers, refreshSession, updateUser } from '../controllers/auth.controller'
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
import { createCustomerItem, deleteCustomerItem, updateCustomerItem } from '../controllers/customerItem.controller'

const router = Router()

// base
router.get('/', baseRoute)

// auth
router.get('/auth/customers', getUsers)
router.post('/auth/register', userRegistration)
router.post('/auth/login', createSession)
router.post('/auth/refresh', refreshSession)

// Customer
router.put('/customer/update/:id', updateUser)

// customer item
router.post('/customer-item/add/:id', createCustomerItem)
router.delete('/customer-item/delete/:id', deleteCustomerItem)
router.put('/customer-item/update/:id', updateCustomerItem)

// product
router.get('/product/', getProduct)
router.post('/product/add/', createProduct)
router.delete('/product/delete/:id', deleteProduct)
router.get('/product/detail/:id', getProductDetail)
router.put('/product/update/:id', updateProduct)

// service_history
router.post('/service_history', createServiceHistory)

export default router
