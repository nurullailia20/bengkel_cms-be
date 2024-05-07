import { Request, Response } from 'express'
import { logger } from '../utils/logger'
import prisma from '../../lib/prisma'
import { calculateAgeInMonths, dateFormatter } from '../utils/commonFunctions'
import { createCustomerValidation } from '../validations/customer.validation'

export const createCustomer = async (req: Request, res: Response) => {
  const { error, value } = createCustomerValidation(req.body)
  if (error) {
    logger.error('Err = customer-create', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }

  try {
    const customer = await prisma.customer.create({
      data: {
        name: value.name,
        vehicle: value.vehicle,
        police_number: value.police_number,
        total_point: value.total_point,
        phone_number: value.phone_number
      }
    })
    return res.status(200).send({ status: true, statusCode: 200, message: 'Berhasil Menambahkan Data', data: customer })
  } catch (error) {
    logger.error('Err = customer-create', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

export const getCustomer = async (req: Request, res: Response) => {
  try {
     const responses = await prisma.customer.findMany({
       select: {
         name: true,
         vehicle: true,
         police_number: true,
         total_point: true,
         phone_number: true
       }
     })

    logger.info('Success get customer data')
    return res.status(200).send({ status: true, statusCode: 200, data: responses })
  } catch (error) {
    logger.error('Err = customer-get', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

export const updateCustomer = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  const { error, value } = createCustomerValidation(req.body)
  if (error) {
    logger.error('Err = customer-update', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }

  try {
    const customer = await prisma.customer.update({
      where: {
        id
      },
      data: {
        name: value.name,
        vehicle: value.vehicle,
        police_number: value.police_number,
        total_point: value.total_point,
        phone_number: value.phone_number
      }
    })
    if (customer) {
      logger.info('Success update new baby')
      return res.status(200).send({ status: true, statusCode: 200, message: 'Berhasil Memperbarui Data' })
    } else {
      logger.info('Baby not fount')
      return res.status(404).send({ status: true, statusCode: 404, message: 'Baby not found' })
    }
  } catch (error) {
    logger.error('Err = baby-update', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

export const deleteCustomer = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  try {
    const response = await prisma.customer.delete({
      where: {
        id
      }
    })

    if (response) {
      logger.info('Success delete customer')
      return res.status(200).send({ status: true, statusCode: 200, message: 'Berhasil Menghapus Data' })
    } else {
      logger.info('Baby not found')
      return res.status(404).send({ status: true, statusCode: 404, message: 'Customer not found' })
    }
  } catch (error) {
    logger.error('ERR: delete customer = ', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

export const getCustomerDetail = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req
  try {
    const response = await prisma.customer.findFirst({
      where: { id }
    })

    logger.info('Success get detail customer')
    return res.status(200).send({ status: true, statusCode: 200, data: response })
  } catch (error) {
    logger.error('ERR: detail-customer = ', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}
