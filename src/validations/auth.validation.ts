import Joi from 'joi'
import UserType from '../types/user.type'

export const createUserValidation = (payload: UserType) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    role: Joi.string().required(),
    phone_number: Joi.string(),
    total_point: Joi.number()
  })
  return schema.validate(payload)
}

export const updateUserValidation = (payload: UserType) => {
  const schema = Joi.object({
    email: Joi.string(),
    // password: Joi.string(),
    name: Joi.string(),
    phone_number: Joi.string(),
    total_point: Joi.number()
  })
  return schema.validate(payload)
}

export const createSessionValidation = (payload: UserType) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    userRole: Joi.string().required()
  })
  return schema.validate(payload)
}

export const refreshSessionValidation = (payload: UserType) => {
  const schema = Joi.object({
    refreshToken: Joi.string().required()
  })
  return schema.validate(payload)
}
