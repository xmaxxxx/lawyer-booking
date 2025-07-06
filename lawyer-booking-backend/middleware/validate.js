import Joi from 'joi';

// Validation middleware
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errorMessage
      });
    }
    next();
  };
};

// Validation schemas
const schemas = {
  // User registration
  register: Joi.object({
    name: Joi.string().required().min(2).max(50),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
    role: Joi.string().valid('client', 'lawyer', 'admin').default('client')
  }),
  // User login
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),
  // Booking creation
  createBooking: Joi.object({
    consultationType: Joi.string().required(),
    timeSlot: Joi.string().required(),
    appointmentDate: Joi.date().min('now').required(),
    appointmentTime: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
    clientNotes: Joi.string().max(500).optional()
  }),
  // Time slot creation
  createTimeSlot: Joi.object({
    date: Joi.date().min('now').required(),
    startTime: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
    endTime: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
    consultationType: Joi.string().required(),
    maxBookings: Joi.number().integer().min(1).default(1),
    isRecurring: Joi.boolean().default(false),
    recurringDays: Joi.array().items(
      Joi.string().valid('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')
    ).when('isRecurring', {
      is: true,
      then: Joi.required(),
      otherwise: Joi.optional()
    })
  }),
  // Consultation creation
  createConsultation: Joi.object({
    name: Joi.string().required().max(100),
    description: Joi.string().required().max(500),
    duration: Joi.number().integer().min(15).max(480).required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().valid(
      'Family Law', 'Criminal Law', 'Corporate Law', 'Real Estate',
      'Employment Law', 'Intellectual Property', 'Tax Law',
      'Immigration Law', 'Personal Injury', 'General Consultation'
    ).required(),
    maxBookingsPerDay: Joi.number().integer().min(1).default(10),
    requirements: Joi.array().items(Joi.string().trim()).optional()
  }),
  // Booking status update
  updateBookingStatus: Joi.object({
    status: Joi.string().valid('pending', 'confirmed', 'completed', 'cancelled', 'no-show').required(),
    lawyerNotes: Joi.string().max(500).optional()
  }),
  // Payment update
  updatePayment: Joi.object({
    paymentStatus: Joi.string().valid('pending', 'paid', 'failed', 'refunded').required(),
    paymentMethod: Joi.string().valid('online', 'cash', 'card').optional(),
    paymentId: Joi.string().optional()
  })
};

export { validate, schemas }; 