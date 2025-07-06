import express from 'express';
const router = express.Router();
import { protect, authorize } from '../middleware/auth.js';
import { validate, schemas } from '../middleware/validate.js';
import {
  createBooking,
  getMyBookings,
  getBooking,
  updateBooking,
  cancelBooking,
  getAllBookings,
  updateBookingStatus
} from '../controllers/bookingController.js';

// Protected routes
router.post('/', protect, validate(schemas.createBooking), createBooking);
router.get('/', protect, getMyBookings);
router.get('/:id', protect, getBooking);
router.put('/:id', protect, updateBooking);
router.put('/:id/cancel', protect, cancelBooking);

// Admin/Lawyer routes
router.get('/all', protect, authorize('lawyer', 'admin'), getAllBookings);
router.put('/:id/status', protect, authorize('lawyer', 'admin'), validate(schemas.updateBookingStatus), updateBookingStatus);

export default router; 