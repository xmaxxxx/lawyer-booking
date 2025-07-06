import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Consultation name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [15, 'Duration must be at least 15 minutes'],
    max: [480, 'Duration cannot exceed 8 hours']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Family Law',
      'Criminal Law',
      'Corporate Law',
      'Real Estate',
      'Employment Law',
      'Intellectual Property',
      'Tax Law',
      'Immigration Law',
      'Personal Injury',
      'General Consultation'
    ]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  maxBookingsPerDay: {
    type: Number,
    default: 10,
    min: [1, 'Must allow at least 1 booking per day']
  },
  requirements: [{
    type: String,
    trim: true
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

// Index for efficient queries
consultationSchema.index({ category: 1, isActive: 1 });
consultationSchema.index({ price: 1 });

export default mongoose.model('Consultation', consultationSchema); 