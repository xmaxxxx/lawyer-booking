/* global process */
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Authentication middleware
const protect = async (req, res, next) => {
  console.log('Request Headers:', req.headers); // Debug: log all headers
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    console.log('Extracted Token:', token); // Debug: log extracted token
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }

  try {
    console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET); // Debug: check if secret exists
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded successfully:', decoded); // Debug: log decoded token
    req.user = await User.findById(decoded.id).select('-password');
    console.log('User found:', !!req.user); // Debug: check if user exists
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }
    next();
  } catch (error) {
    console.log('JWT verification failed:', error.message); // Debug: log the specific error
    return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
  }
};

// Authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden: insufficient role' });
    }
    next();
  };
};

export { protect, authorize }; 