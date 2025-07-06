import express from 'express';
const router = express.Router();
import { protect } from '../middleware/auth.js';
import { validate, schemas } from '../middleware/validate.js';
import {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  logout  
} from '../controllers/authController.js';

// Public routes
router.post('/register', validate(schemas.register), register);
router.post('/login', validate(schemas.login), login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);
router.post('/logout', protect, logout);

export default router; 