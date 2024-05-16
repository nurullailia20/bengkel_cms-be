import { Application, Router } from 'express'
import { AuthRouter } from './auth.route'
import { CustomerRouter } from './customer.route'
import { ProductRouter } from './product.route'

const _routes: Array<[string, Router]> = [
  ['/auth', AuthRouter],
  ['/customer', CustomerRouter],
  ['/product', ProductRouter]
]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}
