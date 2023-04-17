import express from 'express'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import router from './routes/index.js'

const PORT = 3000
const app = express()

// Middlewares
app.use(logger('dev'))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/', router)

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`)
})
