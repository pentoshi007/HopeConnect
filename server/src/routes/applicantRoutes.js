import express from 'express'
import { body } from 'express-validator'
import { verifyJWT, isAdmin } from '../middleware/auth.js'
import {
  createApplicant,
  getApplicants,
  getApplicantById
} from '../controllers/applicantController.js'

const router = express.Router()

// Validation rules
const applicantValidation = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email address'),
  body('phone')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Phone number must be at least 10 digits'),
  body('interest')
    .notEmpty()
    .withMessage('Please select an area of interest')
    .isIn([
      'Education & Literacy',
      'Rural Development',
      'Women Empowerment',
      'Child Welfare',
      'Healthcare & Sanitation',
      'Environmental Conservation',
      'Skill Development & Training',
      'Elderly Care',
      'Disaster Relief',
      'Digital Literacy',
      'Arts & Culture',
      'Food Security & Nutrition'
    ])
    .withMessage('Invalid area of interest'),
  body('availability')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Please provide more details about your availability')
]

// Public routes
router.post('/', applicantValidation, createApplicant)

// Protected admin routes
router.get('/', verifyJWT, isAdmin, getApplicants)
router.get('/:id', verifyJWT, isAdmin, getApplicantById)

export default router
