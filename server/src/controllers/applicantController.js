import { validationResult } from 'express-validator'
import Applicant from '../models/Applicant.js'

export const createApplicant = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      })
    }

    const { name, email, phone, interest, availability } = req.body

    // Check if email already exists
    const existingApplicant = await Applicant.findOne({ email })
    if (existingApplicant) {
      return res.status(400).json({
        error: 'An application with this email already exists'
      })
    }

    const applicant = new Applicant({
      name,
      email,
      phone,
      interest,
      availability
    })

    await applicant.save()

    res.status(201).json({
      message: 'Application submitted successfully',
      applicant: {
        id: applicant._id,
        name: applicant.name,
        email: applicant.email,
        createdAt: applicant.createdAt
      }
    })
  } catch (error) {
    console.error('Error creating applicant:', error)
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation failed',
        details: Object.values(error.errors).map(err => err.message)
      })
    }
    
    if (error.code === 11000) {
      return res.status(400).json({
        error: 'An application with this email already exists'
      })
    }
    
    res.status(500).json({
      error: 'Failed to submit application. Please try again.'
    })
  }
}

export const getApplicants = async (req, res) => {
  try {
    const { page = 1, limit = 50, interest, search } = req.query
    
    const query = {}
    
    if (interest) {
      query.interest = interest
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ]
    }

    const applicants = await Applicant.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean()

    const total = await Applicant.countDocuments(query)

    res.json(applicants)
  } catch (error) {
    console.error('Error fetching applicants:', error)
    res.status(500).json({
      error: 'Failed to fetch applicants'
    })
  }
}

export const getApplicantById = async (req, res) => {
  try {
    const applicant = await Applicant.findById(req.params.id)
    
    if (!applicant) {
      return res.status(404).json({
        error: 'Applicant not found'
      })
    }
    
    res.json(applicant)
  } catch (error) {
    console.error('Error fetching applicant:', error)
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        error: 'Invalid applicant ID'
      })
    }
    
    res.status(500).json({
      error: 'Failed to fetch applicant'
    })
  }
}
