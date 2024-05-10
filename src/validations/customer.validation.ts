import Joi from 'joi'
import CustomerType from '../types/customer.type'

export const createCustomerValidation = (payload: CustomerType) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    vehicle: Joi.string().required(),
    police_number: Joi.string().required(),
    phone_number: Joi.string().required()
  })
  return schema.validate(payload)
}
