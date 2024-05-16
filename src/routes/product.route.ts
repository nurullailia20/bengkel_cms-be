import { Router } from 'express'
import { getProductDetail, updateProduct, deleteProduct, createProduct, getProduct } from '../controllers/product.controller'

export const ProductRouter: Router = Router()

ProductRouter.get('/', getProduct)
ProductRouter.post('/', createProduct)
ProductRouter.delete('/:id', deleteProduct)
ProductRouter.get('/:id', getProductDetail)
ProductRouter.put('/:id', updateProduct)
