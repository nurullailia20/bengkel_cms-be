import { Request, Response } from 'express'
import prisma from '../lib/prisma'
import { logger } from '../utils/logger'
import { customerItemValidation } from '../validations/customerItem.validation'

export const createCustomerItem = async (req: Request, res: Response) => {
  const { error, value } = customerItemValidation(req.body)
  const {
    params: { id }
  } = req
  if (error) {
    logger.error('Err = customer item - create', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }

  try {
    const checkClient = await prisma.user.findUnique({
      where: {
        id
      }
    })
    if (!checkClient) {
      return res.status(404).send({ status: false, statusCode: 404, message: 'User not found' })
    }
    const customer = await prisma.customer_item.create({
      data: {
        vehicle: value.vehicle,
        police_number: value.police_number,
        total_point: value.total_point,
        phone_number: value.phone_number,
        user: {
          connect: {
            id
          }
        }
      }
    })
    return res.status(200).send({ status: true, statusCode: 200, message: 'Berhasil Menambahkan Data', data: customer })
  } catch (error) {
    logger.error('Err =  customer item - create', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}
