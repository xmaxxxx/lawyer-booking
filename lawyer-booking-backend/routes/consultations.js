import express from 'express';
const router = express.Router();
import { protect, authorize } from '../middleware/auth.js';
import { validate, schemas } from '../middleware/validate.js';
import {
  createConsultation,
  getConsultations,
  getConsultation,
  updateConsultation,
  deleteConsultation,
  getCategories
} from '../controllers/consultationController.js';

// Public routes
router.get('/', getConsultations);
router.get('/categories', getCategories);
router.get('/:id', getConsultation);

// Admin/Lawyer routes
router.post('/', protect, authorize('lawyer', 'admin'), validate(schemas.createConsultation), createConsultation);
router.put('/:id', protect, authorize('lawyer', 'admin'), validate(schemas.createConsultation), updateConsultation);
router.delete('/:id', protect, authorize('lawyer', 'admin'), deleteConsultation);

export default router; 