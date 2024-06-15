import { Request, Response } from 'express'

export const baseRoute = async (req: Request, res: Response) => {
  res.status(200).send({ status: 200, message: 'API is ready to use' })
}
