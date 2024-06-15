import { Router } from 'express'
import { createUserSession, getUsers, refreshSession, userRegistration } from '../controllers/auth.controller'
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  getCustomerDetail,
  updateCustomer
} from '../controllers/customer.controller'
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductDetail,
  updateProduct
} from '../controllers/product.controller'

const router = Router()

// auth
router.get('auth/', getUsers)
router.post('auth/register', userRegistration)
router.post('auth/login', createUserSession)
router.post('auth/refresh', refreshSession)

// Customer
router.get('customer/', getCustomer)
router.post('customer/', createCustomer)
router.delete('customer/:id', deleteCustomer)
router.get('customer/:id', getCustomerDetail)
router.put('customer/:id', updateCustomer)

// product
router.get('product/', getProduct)
router.post('product/', createProduct)
router.delete('product/:id', deleteProduct)
router.get('product/:id', getProductDetail)
router.put('product/:id', updateProduct)

export default router
