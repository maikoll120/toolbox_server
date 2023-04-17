import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { PORT } from './lib/config.js'
import routes from './routes/index.js'
import { errorHandler } from './middlewares/index.js'

const app = express()

// Middlewares
app.use(logger('dev'))
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
routes(app)

// Error handler
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`)
})
