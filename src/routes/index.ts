import { Application, Router } from 'express'
import { HealthRouter } from './health'
import { AuthRouter } from './auth.route'
import { BabyRouter } from './baby.route'
import { BabyConditionRouter } from './condition.route'

const _routes: Array<[string, Router]> = [
  ['/health', HealthRouter],
  ['/auth', AuthRouter],
  ['/baby', BabyRouter],
  ['/condition', BabyConditionRouter]
]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}