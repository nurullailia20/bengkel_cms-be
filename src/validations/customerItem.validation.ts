import Joi from 'joi'
import { CustomerItem } from '../types/customerItem.type'

export const customerItemValidation = (payload: CustomerItem) => {
  const schema = Joi.object({
    vehicle: Joi.string().required(),
    police_number: Joi.string().required(),
    phone_number: Joi.string().required(),
    user: Joi.string().required()
  })
  return schema.validate(payload)
}
