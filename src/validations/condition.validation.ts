import Joi from 'joi'
import BabyConditionType from '../types/condition.type'

export const createBabyValidation = (payload: BabyConditionType) => {
  const schema = Joi.object({
    weight: Joi.number().required(),
    height: Joi.number().required(),
    month: Joi.number().required()
  })
  return schema.validate(payload)
}
