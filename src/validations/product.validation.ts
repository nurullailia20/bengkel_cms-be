import Joi from 'joi'
import ProductType from '../types/product.type'

export const createProductValidation = (payload: ProductType) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    stock: Joi.number(),
    price: Joi.string().required(),
    date_in: Joi.date().required()
  })
  return schema.validate(payload)
}
