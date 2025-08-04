import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import AdminUser from '../models/AdminUser.js'

export const login = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      })
    }

    const { email, password } = req.body

    // Find admin user
    const user = await AdminUser.findOne({ email })
    if (!user) {
      return res.status(401).json({
        error: 'Invalid email or password'
      })
    }

    // Verify password
    const isValidPassword = await user.comparePassword(password)
    if (!isValidPassword) {
      return res.status(401).json({
        error: 'Invalid email or password'
      })
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    // Set HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    })

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      error: 'Failed to login. Please try again.'
    })
  }
}

export const me = async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        email: req.user.email,
        role: req.user.role
      }
    })
  } catch (error) {
    console.error('Me endpoint error:', error)
    res.status(500).json({
      error: 'Failed to get user information'
    })
  }
}

export const logout = (req, res) => {
  res.clearCookie('token')
  res.json({ message: 'Logged out successfully' })
}

// Initialize admin user
export const initializeAdmin = async () => {
  try {
    const adminExists = await AdminUser.findOne({ email: process.env.ADMIN_EMAIL })

    if (!adminExists) {
      const admin = new AdminUser({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
      })

      await admin.save()
      console.log('✅ Admin user created successfully')
    } else {
      console.log('✅ Admin user already exists')
    }
  } catch (error) {
    console.error('❌ Error initializing admin user:', error)
  }
}
