import mongoose from 'mongoose';

const timeSlotSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  startTime: {
    type: String,
    required: [true, 'Start time is required'],
    match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time in HH:MM format']
  },
  endTime: {
    type: String,
    required: [true, 'End time is required'],
    match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time in HH:MM format']
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  consultationType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consultation',
    required: [true, 'Consultation type is required']
  },
  maxBookings: {
    type: Number,
    default: 1,
    min: [1, 'Must allow at least 1 booking']
  },
  currentBookings: {
    type: Number,
    default: 0,
    min: [0, 'Current bookings cannot be negative']
  },
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurringDays: [{
    type: String,
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  }],
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

// Virtual for checking if slot is full
timeSlotSchema.virtual('isFull').get(function() {
  return this.currentBookings >= this.maxBookings;
});

// Virtual for available spots
timeSlotSchema.virtual('availableSpots').get(function() {
  return Math.max(0, this.maxBookings - this.currentBookings);
});

// Indexes for efficient queries
timeSlotSchema.index({ date: 1, startTime: 1 });
timeSlotSchema.index({ date: 1, isAvailable: 1 });
timeSlotSchema.index({ consultationType: 1, date: 1 });

// Ensure virtuals are included in JSON output
timeSlotSchema.set('toJSON', { virtuals: true });

export default mongoose.model('TimeSlot', timeSlotSchema); 