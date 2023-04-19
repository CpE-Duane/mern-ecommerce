import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js'
import cors from 'cors'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'

// configure env
dotenv.config()

// database config
connectDB()

// rest object
const app = express()
app.use(cors())

// middlewares
app.use(express.json())
app.use(morgan('dev'))

// routes
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/category", categoryRoutes)
app.use("/api/v1/product", productRoutes)


app.listen(process.env.PORT, () => {
     console.log(`Server running on mode ${process.env.DEV_MODE} on port ${process.env.PORT}`.bgBlue)
})