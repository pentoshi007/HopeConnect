import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const adminUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  role: {
    type: String,
    default: 'admin',
    enum: ['admin']
  }
}, {
  timestamps: true
})

// Hash password before saving
adminUserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  try {
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Compare password method
adminUserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

// Remove password from JSON output
adminUserSchema.methods.toJSON = function () {
  const userObject = this.toObject()
  delete userObject.password
  return userObject
}

export default mongoose.model('AdminUser', adminUserSchema)
