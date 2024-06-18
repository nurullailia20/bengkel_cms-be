import Joi from 'joi'
import ProductType from '../types/product.type'

export const createProductValidation = (payload: ProductType) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    stock: Joi.number().required(),
    price: Joi.string().required(),
    date_in: Joi.date(),
    description: Joi.string().required(),
    warranty: Joi.number().required(),
    color: Joi.string().required(),
    image: Joi.string().required()
  })
  return schema.validate(payload)
}
