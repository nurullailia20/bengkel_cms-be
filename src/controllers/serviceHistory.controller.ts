/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { Request, Response } from 'express'
import { logger } from '../utils/logger'
import prisma from '../lib/prisma'
import { createServiceHistoryValidation } from '../validations/serviceHistory.validation'

export const createServiceHistory = async (req: Request, res: Response) => {
  const { user_id } = req.query
  const { error, value } = createServiceHistoryValidation(req.body)

  if (error) {
    logger.error('Err = service history - create', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }

  try {
    const response = await prisma.service_history.create({
      data: {
        user_id: user_id as string,
        description: value.description,
        recomendation: value.recomendation,
        date: value.date
      },
      include: {
        user: true
      }
    })
    return res.status(200).send({ status: true, statusCode: 200, message: 'Berhasil Menambahkan Data', data: response })
  } catch (error) {
    logger.error('Err = service history - create', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

// export const updateCustomer = async (req: Request, res: Response) => {
//   const {
//     params: { id }
//   } = req

//   const { error, value } = createCustomerValidation(req.body)
//   if (error) {
//     logger.error('Err = customer-update', error.details[0].message)
//     return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
//   }

//   try {
//     const customer = await prisma.customer.update({
//       where: {
//         id
//       },
//       data: {
//         name: value.name,
//         vehicle: value.vehicle,
//         police_number: value.police_number,
//         total_point: value.total_point,
//         phone_number: value.phone_number
//       }
//     })
//     if (customer) {
//       logger.info('Success update new baby')
//       return res.status(200).send({ status: true, statusCode: 200, message: 'Berhasil Memperbarui Data' })
//     } else {
//       logger.info('Baby not fount')
//       return res.status(404).send({ status: true, statusCode: 404, message: 'Baby not found' })
//     }
//   } catch (error) {
//     logger.error('Err = baby-update', error)
//     return res.status(422).send({ status: false, statusCode: 422, message: error })
//   }
// }

// export const deleteCustomer = async (req: Request, res: Response) => {
//   const {
//     params: { id }
//   } = req

//   try {
//     const response = await prisma.customer.delete({
//       where: {
//         id
//       }
//     })

//     if (response) {
//       logger.info('Success delete customer')
//       return res.status(200).send({ status: true, statusCode: 200, message: 'Berhasil Menghapus Data' })
//     } else {
//       logger.info('Baby not found')
//       return res.status(404).send({ status: true, statusCode: 404, message: 'Customer not found' })
//     }
//   } catch (error) {
//     logger.error('ERR: delete customer = ', error)
//     return res.status(422).send({ status: false, statusCode: 422, message: error })
//   }
// }

// export const getCustomerDetail = async (req: Request, res: Response) => {
//   const {
//     params: { id }
//   } = req
//   try {
//     const response = await prisma.customer.findFirst({
//       where: { id }
//     })

//     logger.info('Success get detail customer')
//     return res.status(200).send({ status: true, statusCode: 200, data: response })
//   } catch (error) {
//     logger.error('ERR: detail-customer = ', error)
//     return res.status(422).send({ status: false, statusCode: 422, message: error })
//   }
// }
