import { NextFunction, Request, Response } from 'express'

export const requireBaby = (req: Request, res: Response, next: NextFunction) => {
  const baby = req.params.id || req.body.id
  if (!baby) {
    return res.sendStatus(403).json({ message: 'Baby not found' })
  }
  return next()
}
