import express from 'express'
import { body } from 'express-validator'
import { verifyJWT } from '../middleware/auth.js'
import { login, me, logout, initializeAdmin } from '../controllers/authController.js'

const router = express.Router()



// Validation rules
const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
]

// Public routes
router.post('/login', loginValidation, login)
router.post('/logout', logout)

// Protected routes
router.get('/me', verifyJWT, me)

export default router
