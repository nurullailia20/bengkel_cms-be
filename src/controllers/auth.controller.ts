import { Request, Response } from 'express'
import { createSessionValidation, createUserValidation, refreshSessionValidation } from '../validations/auth.validation'
import { logger } from '../utils/logger'
import { checkPassword, hashing } from '../utils/hashing'
import prisma from '../../lib/prisma'
import { signJWT, verifyJWT } from '../utils/jwt'

export const userRegistration = async (req: Request, res: Response) => {
  const { error, value } = createUserValidation(req.body)

  if (error) {
    logger.info('ERR: user - registration = ', error.details[0].message)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message
    })
  }

  try {
    value.password = `${hashing(value.password)}`
    await prisma.user.create({
      data: {
        id: value.id,
        name: value.name,
        email: value.email,
        password: value.password,
        address: value.address,
        role: value.role
      }
    })
    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: 'User Registration Successfully'
    })
  } catch (error: any) {
    logger.info('ERR: auth - registration = ', error.details[0].message)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message
    })
  }
}

export const createUserSession = async (req: Request, res: Response) => {
  const { error, value } = createSessionValidation(req.body)

  if (error) {
    logger.info('ERR: user - registration = ', error.details[0].message)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message
    })
  }

  try {
    const user: any = await prisma.user.findFirst({
      where: {
        email: req.body.email
      }
    })
    const isValid = checkPassword(value.password, user?.password)
    if (!isValid) {
      return res.status(401).json({
        status: false,
        statusCode: 401,
        message: 'Invalid Email or Password'
      })
    }

    const accessToken = signJWT({ ...user }, { expiresIn: '1d' })

    const refreshToken = signJWT({ ...user }, { expiresIn: '1y' })

    return res.status(200).send({ status: true, statusCode: 200, message: 'Login success', data: { accessToken, refreshToken } })
  } catch (error: any) {
    logger.info('ERR: user - registration = ', error.message)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message
    })
  }
}

export const refreshSession = async (req: Request, res: Response) => {
  const { error, value } = refreshSessionValidation(req.body)

  if (error) {
    logger.info('ERR: auth - refresh token = ', error.details[0].message)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message
    })
  }

  try {
    const { decoded }: any = verifyJWT(value.refreshToken)
    const user = await prisma.user.findUnique({
      where: {
        email: decoded._doc.email
      }
    })
    if (!user) return false

    const accessToken = signJWT(
      {
        ...user
      },
      {
        expiresIn: '1d'
      }
    )
    return res
      .status(200)
      .send({ status: true, statusCode: 200, message: 'Refresh Session Successfully', data: { accessToken } })
  } catch (error: any) {
    logger.info('ERR: refresh - token = ', error.message)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.message
    })
  }
}