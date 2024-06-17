import express, { Application } from 'express'
import { logger } from './utils/logger'
import bodyParser from 'body-parser'
import cors from 'cors'
import deserializeToken from './middleware/deserializedToken'
import router from './routes'

const app: Application = express()
const port: number = 4000

// parse body req
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// cors access handler
app.use(cors())
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
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
  logger.info(`listening on http://localhost:${port}/api/v1/`)
})

export default app
