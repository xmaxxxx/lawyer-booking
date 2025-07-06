import express from 'express';
const router = express.Router();
import { protect, authorize } from '../middleware/auth.js';
import {
  getDashboardStats,
  getBookingTrends,
  getConsultationStats,
  getRecentBookings
} from '../controllers/dashboardController.js';

// Admin/Lawyer routes
router.use(protect);
router.use(authorize('lawyer', 'admin'));
router.get('/stats', getDashboardStats);
router.get('/booking-trends', getBookingTrends);
router.get('/consultation-stats', getConsultationStats);
router.get('/recent-bookings', getRecentBookings);

export default router; 