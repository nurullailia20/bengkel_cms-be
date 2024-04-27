import { Request, Response } from 'express'
import { createBabyValidation } from '../validations/baby.validation'
import { logger } from '../utils/logger'
import prisma from '../../lib/prisma'
import { calculateAgeInMonths, dateFormatter } from '../utils/commonFunctions'

export const createBaby = async (req: Request, res: Response) => {
  const { error, value } = createBabyValidation(req.body)
  if (error) {
    logger.error('Err = baby-create', error.details[0].message)
    return res.status(422).send({ status: false, statuseCode: 422, message: error.details[0].message })
  }

  try {
    const baby = await prisma.baby.create({
      data: {
        name: value.name,
        gender: value.gender,
        birthdate: value.birthdate,
        parent_name: value.parent_name,
        address: value.address,
        phone_number: value.phone_number
      }
    })
    return res.status(200).send({ status: true, statusCode: 200, message: 'Add Baby successfuly', data: { baby } })
  } catch (error) {
    logger.error('Err = baby-create', error)
    return res.status(422).send({ status: false, statuseCode: 422, message: error })
  }
}

export const getBaby = async (req: Request, res: Response) => {
  try {
    const responses = await prisma.baby.findMany({
      select: {
        name: true,
        gender: true,
        parent_name: true,
        phone_number: true,
        address: true,
        birthdate: true
      }
    })
    const result = responses.map((response) => ({
      ...response,
      birthdate: dateFormatter(response.birthdate),
      age: calculateAgeInMonths(response.birthdate)
    }))
    logger.info('Success get baby data')
    return res.status(200).send({ status: true, statusCode: 200, data: result })
  } catch (error) {
    logger.error('Err = baby-get', error)
    return res.status(422).send({ status: false, statuseCode: 422, message: error })
  }
}

export const updateBaby = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  const { error, value } = createBabyValidation(req.body)
  if (error) {
    logger.error('Err = baby-update', error.details[0].message)
    return res.status(422).send({ status: false, statuseCode: 422, message: error.details[0].message })
  }

  try {
    const baby = await prisma.baby.update({
      where: {
        id
      },
      data: {
        name: value.name,
        gender: value.gender,
        birthdate: value.birthdate,
        parent_name: value.parent_name,
        address: value.address,
        phone_number: value.phone_number
      }
    })
    if (baby) {
      logger.info('Success update new baby')
      return res.status(200).send({ status: true, statusCode: 200, message: 'Update Baby Successfuly' })
    } else {
      logger.info('Baby not fount')
      return res.status(404).send({ status: true, statusCode: 404, message: 'Baby not found' })
    }
  } catch (error) {
    logger.error('Err = baby-update', error)
    return res.status(422).send({ status: false, statuseCode: 422, message: error })
  }
}

export const deleteBaby = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  try {
    const response = await prisma.baby.delete({
      where: {
        id
      }
    })

    if (response) {
      logger.info('Success delete baby')
      return res.status(200).send({ status: true, statusCode: 200, message: 'Delete baby successfuly' })
    } else {
      logger.info('Baby not fount')
      return res.status(404).send({ status: true, statusCode: 404, message: 'Baby not found' })
    }
  } catch (error) {
    logger.error('ERR: delete baby = ', error)
    return res.status(422).send({ status: false, statuseCode: 422, message: error })
  }
}

export const getBabyDetail = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req
  try {
    const response = await prisma.baby.findFirst({
      where: { id },
      select: {
        name: true,
        gender: true,
        parent_name: true,
        phone_number: true,
        address: true,
        birthdate: true,
        baby_condition: true
      }
    })
    const result = {
      ...response,
      age: calculateAgeInMonths(response?.birthdate),
      birthdate: dateFormatter(response?.birthdate)
    }
    logger.info('Success get detail baby')
    return res.status(200).send({ status: true, statusCode: 200, data: result })
  } catch (error) {
    logger.error('ERR: detail-baby = ', error)
    return res.status(422).send({ status: false, statuseCode: 422, message: error })
  }
}
