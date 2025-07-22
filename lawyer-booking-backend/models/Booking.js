import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Client is required']
  },
  consultationType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consultation',
    required: [true, 'Consultation type is required']
  },
  timeSlot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TimeSlot',
    required: [true, 'Time slot is required']
  },
  appointmentDate: {
    type: Date,
    required: [true, 'Appointment date is required']
  },
  appointmentTime: {
    type: String,
    required: [true, 'Appointment time is required']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [15, 'Duration must be at least 15 minutes']
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'no-show'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['online', 'cash', 'card'],
    default: 'online'
  },
  paymentId: {
    type: String,
    default: null
  },
  clientNotes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  lawyerNotes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  meetingLink: {
    type: String,
    default: null
  },
  meetingPlatform: {
    type: String,
    enum: ['zoom', 'google-meet', 'teams', 'phone', 'in-person'],
    default: 'zoom'
  },
  reminderSent: {
    type: Boolean,
    default: false
  },
  reminderSentAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Virtual for booking reference
bookingSchema.virtual('bookingRef').get(function() {
  return `BK${this._id.toString().slice(-6).toUpperCase()}`;
});

// Virtual for formatted date
bookingSchema.virtual('formattedDate').get(function() {
  return this.appointmentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Indexes for efficient queries
bookingSchema.index({ client: 1, appointmentDate: 1 });
bookingSchema.index({ status: 1, appointmentDate: 1 });
bookingSchema.index({ paymentStatus: 1 });
bookingSchema.index({ consultationType: 1, appointmentDate: 1 });

// Ensure virtuals are included in JSON output
bookingSchema.set('toJSON', { virtuals: true });

// Pre-save middleware to update time slot booking count
bookingSchema.pre('save', async function(next) {
  if (this.isNew) {
    try {
      const TimeSlot = mongoose.model('TimeSlot');
      await TimeSlot.findByIdAndUpdate(
        this.timeSlot,
        { $inc: { currentBookings: 1 } }
      );
    } catch {
      next();
    }
  }
  next();
});

export default mongoose.model('Booking', bookingSchema); 