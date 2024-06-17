import Joi from 'joi'
import ServiceHistoryType from '../types/serviceHistory.type'

export const createServiceHistoryValidation = (payload: ServiceHistoryType) => {
  const schema = Joi.object({
    description: Joi.string().required(),
    recomendation: Joi.number().required(),
    date: Joi.date()
  })
  return schema.validate(payload)
}
