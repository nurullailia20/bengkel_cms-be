import jwt from 'jsonwebtoken'
import config from '../config/environment'

export const signJWT = (payload: Object, options?: jwt.SignOptions | undefined) => {
  return jwt.sign(payload, config.jwt_private, {
    ...(options && options),
    algorithm: 'RS256'
  })
}
