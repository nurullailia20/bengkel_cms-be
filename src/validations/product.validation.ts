import Joi from 'joi'
import ProductType from '../types/product.type'

export const createProductValidation = (payload: ProductType) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    stock: Joi.string().required(),
    price: Joi.string().required(),
    date_in: Joi.string().required()
  })
  return schema.validate(payload)
}
