import { Request, Response } from 'express'
import prisma from '../../lib/prisma'
import { logger } from '../utils/logger'
import { dateFormatter, getMonth } from '../utils/commonFunctions'

export const createBabyCondition = async (req: Request, res: Response) => {
  const { month, weight, height } = req.body

  const {
    params: { id }
  } = req

  try {
    const checkBaby = await prisma.baby.findUnique({
      where: {
        id
      }
    })

    if (!checkBaby) {
      return res.status(404).send({ status: false, statusCode: 404, message: 'Baby not found' })
    }

    const response = await prisma.baby_condition.create({
      data: {
        month,
        weight,
        height,
        baby: {
          connect: {
            id
          }
        }
      }
    })
    logger.info('Add baby condition successfully')
    return res
      .status(201)
      .send({ status: true, statusCode: 201, message: 'Baby condition added successfully', data: response })
  } catch (error) {
    logger.error('ERR: detail baby = ', error)
    return res.status(422).send({ status: false, statuseCode: 422, message: error })
  }
}

export const getBabyConditions = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req
  try {
    const responses = await prisma.baby_condition.findMany({
      where: {
        baby_id: id
      }
    })

    const result = responses.map((response) => ({
      ...response,
      month: getMonth(response.created_at),
      created_at: dateFormatter(response.created_at),
      updated_at: dateFormatter(response.updated_at)
    }))

    logger.info('Get baby conditions successfully')
    return res.status(200).send({ status: true, statusCode: 200, data: result })
  } catch (error) {
    logger.error('Err = baby-read', error)
    return res.status(422).send({ status: false, statuseCode: 422, message: error })
  }
}
