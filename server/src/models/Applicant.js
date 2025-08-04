import mongoose from 'mongoose'

const applicantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    minlength: [10, 'Phone number must be at least 10 digits']
  },
  interest: {
    type: String,
    required: [true, 'Area of interest is required'],
    enum: [
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
    ]
  },
  availability: {
    type: String,
    required: [true, 'Availability description is required'],
    minlength: [10, 'Please provide more details about your availability']
  }
}, {
  timestamps: true
})

// Create indexes for better query performance
applicantSchema.index({ email: 1 })
applicantSchema.index({ interest: 1 })
applicantSchema.index({ createdAt: -1 })

export default mongoose.model('Applicant', applicantSchema)
