import express from 'express';
const router = express.Router();
import { protect, authorize } from '../middleware/auth.js';
import { validate, schemas } from '../middleware/validate.js';
import {
  createTimeSlot,
  getTimeSlots,
  getTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
  createRecurringSlots
} from '../controllers/timeSlotController.js';

// Public routes
router.get('/', getTimeSlots);
router.get('/:id', getTimeSlot);

// Admin/Lawyer routes
router.post('/', protect, authorize('lawyer', 'admin'), validate(schemas.createTimeSlot), createTimeSlot);
router.put('/:id', protect, authorize('lawyer', 'admin'), validate(schemas.createTimeSlot), updateTimeSlot);
router.delete('/:id', protect, authorize('lawyer', 'admin'), deleteTimeSlot);
router.post('/recurring', protect, authorize('lawyer', 'admin'), createRecurringSlots);

export default router; 