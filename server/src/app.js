import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import applicantRoutes from './routes/applicantRoutes.js'
import authRoutes from './routes/authRoutes.js'
import { initializeAdmin } from './controllers/authController.js'

dotenv.config()

const app = express()

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('📦 Connected to MongoDB')
    // Initialize admin user after database connection
    initializeAdmin()
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err))

// Middleware
app.use(helmet())

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
})

app.use(limiter)

// Routes
app.use('/api/applicants', applicantRoutes)
app.use('/api/auth', authRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err)

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: Object.values(err.errors).map(e => e.message)
    })
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      error: 'Invalid ID format'
    })
  }

  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  })
})

export default app
