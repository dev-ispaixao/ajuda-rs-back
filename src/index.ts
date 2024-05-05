import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import { connectToDatabase } from './databaseConnection'
import { requestRoute } from './routes/request.route'
import { shelterRoute } from './routes/shelter.route'

dotenv.config()

const HOST = process.env.HOST || 'http://localhost'
const PORT = parseInt(process.env.PORT || '4500')

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', requestRoute())
app.use('/', shelterRoute())

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World!' })
})

app.listen(PORT, async () => {
  await connectToDatabase()

  console.log(`Application started on URL ${HOST}:${PORT} 🎉`)
})
