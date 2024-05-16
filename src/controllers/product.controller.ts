import { Request, Response } from 'express'
import { logger } from '../utils/logger'
import prisma from '../../lib/prisma'
import { createProductValidation } from '../validations/product.validation'

export const createProduct = async (req: Request, res: Response) => {
  const { error, value } = createProductValidation(req.body)
  if (error) {
    logger.error('Err = product-create', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }

  try {
    const product = await prisma.product.create({
      data: {
        name: value.name,
        stock: value.stock,
        price: value.price,
        date_in: value.date_in
      }
    })
    return res.status(200).send({ status: true, statusCode: 200, message: 'Berhasil Menambahkan Data', data: product })
  } catch (error) {
    logger.error('Err = customer-create', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

export const getProduct = async (req: Request, res: Response) => {
  try {
     const responses = await prisma.product.findMany({
       select: {
         id: true,
         name: true,
         stock: true,
         price: true,
         date_in: true
       }
     })

    logger.info('Success get product data')
    return res.status(200).send({ status: true, statusCode: 200, data: responses })
  } catch (error) {
    logger.error('Err = product-get', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  const { error, value } = createProductValidation(req.body)
  if (error) {
    logger.error('Err = product-update', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }

  try {
    const product = await prisma.product.update({
      where: {
        id
      },
      data: {
        name: value.name,
        stock: value.stock,
        price: value.price,
        date_in: value.date_in
      }
    })
    if (product) {
      logger.info('Success update data product')
      return res.status(200).send({ status: true, statusCode: 200, message: 'Berhasil Memperbarui Data' })
    } else {
      logger.info('Data product not found')
      return res.status(404).send({ status: true, statusCode: 404, message: 'Product not found' })
    }
  } catch (error) {
    logger.error('Err = product-update', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  try {
    const response = await prisma.product.delete({
      where: {
        id
      }
    })

    if (response) {
      logger.info('Success delete product')
      return res.status(200).send({ status: true, statusCode: 200, message: 'Berhasil Menghapus Data' })
    } else {
      logger.info('Product not found')
      return res.status(404).send({ status: true, statusCode: 404, message: 'Product not found' })
    }
  } catch (error) {
    logger.error('ERR: delete customer = ', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

export const getProductDetail = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req
  try {
    const response = await prisma.product.findFirst({
      where: { id }
    })

    logger.info('Success get detail product')
    return res.status(200).send({ status: true, statusCode: 200, data: response })
  } catch (error) {
    logger.error('ERR: detail-customer = ', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}
