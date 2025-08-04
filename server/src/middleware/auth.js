import jwt from 'jsonwebtoken'
import AdminUser from '../models/AdminUser.js'

export const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await AdminUser.findById(decoded.userId).select('-password')

    if (!user) {
      return res.status(401).json({ error: 'Invalid token.' })
    }

    req.user = user
    next()
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token.' })
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired.' })
    }

    console.error('JWT verification error:', error)
    res.status(500).json({ error: 'Internal server error.' })
  }
}

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next()
  } else {
    res.status(403).json({ error: 'Access denied. Admin role required.' })
  }
}
