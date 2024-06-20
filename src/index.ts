/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import express, { Application } from 'express'
import { logger } from './utils/logger'
import bodyParser from 'body-parser'
import cors from 'cors'
import deserializeToken from './middleware/deserializedToken'
import router from './routes'

const app: Application = express()
const port = 4000

// parse body req
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// cors access handler
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

app.use(deserializeToken)

app.use('/api/v1/', router)

app.listen(port, () => {
  logger.info(`Listening on http://localhost:${port}/api/v1/`)
})

export default app
