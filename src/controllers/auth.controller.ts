/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { Request, Response } from 'express'
import {
  createSessionValidation,
  createUserValidation,
  refreshSessionValidation,
  updateUserValidation
} from '../validations/auth.validation'
import { logger } from '../utils/logger'
import { checkPassword, hashing } from '../utils/hashing'
import { signJWT, verifyJWT } from '../utils/jwt'
import prisma from '../lib/prisma'

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
        email: value.email,
        password: value.password,
        name: value.name,
        role: value.role
      }
    })
    logger.info('User created')
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

export const createSession = async (req: Request, res: Response) => {
  const { error, value } = createSessionValidation(req.body)

  if (error) {
    logger.info('ERR: user - login = ', error.details[0].message)
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

    if (!user) {
      return res.status(401).json({
        status: false,
        statusCode: 401,
        message: 'Invalid Email or Password'
      })
    }

    const isValid = checkPassword(value.password, user.password)
    if (!isValid) {
      return res.status(401).json({
        status: false,
        statusCode: 401,
        message: 'Invalid Email or Password'
      })
    }

    const username = user.name
    const userRole = user.role

    const accessToken = signJWT({ ...user }, { expiresIn: '1d' })
    const refreshToken = signJWT({ ...user }, { expiresIn: '1y' })

    let redirectUrl = ''
    if (userRole === 'ADMIN') {
      redirectUrl = '/admin/product'
    } else if (userRole === 'CLIENT') {
      redirectUrl = '/'
    }

    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: 'Login success',
      data: { accessToken, refreshToken, username, userRole, redirectUrl }
    })
  } catch (error: any) {
    logger.info('ERR: user - login = ', error.message)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.message
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

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: 'CLIENT'
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone_number: true,
        total_point: true,
        customer_items: true
      }
    })
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Users fetched successfully',
      data: users
    })
  } catch (error: any) {
    logger.error('Error fetching users:', error)
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: 'Internal server error'
    })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const { error, value } = updateUserValidation(req.body)
  if (error) {
    logger.info('ERR: user registration - update = ', error)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error
    })
  }

  const { id } = req.params

  try {
    // value.password = `${hashing(value.password)}`
    await prisma.user.update({
      where: { id },
      data: {
        email: value.email,
        // password: value.password,
        name: value.name,
        phone_number: value.phone_number,
        total_point: value.total_point
      }
    })
    logger.info('User created')
    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: 'User Update Successfully'
    })
  } catch (error: any) {
    logger.info('ERR: registration update = ', error)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error
    })
  }
}
