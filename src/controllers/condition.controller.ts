import { Request, Response } from 'express'
import prisma from '../../lib/prisma'
import { logger } from '../utils/logger'

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
    logger.info('Get baby conditions successfully')
    return res.status(200).send({ status: true, statusCode: 200, data: responses })
  } catch (error) {
    logger.error('Err = baby-read', error)
    return res.status(422).send({ status: false, statuseCode: 422, message: error })
  }
}
