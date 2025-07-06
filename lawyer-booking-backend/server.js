/* global process */
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://lawyer-booking-nxu8rtqxj-amrits-projects-3b1eeeda.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API is running' });
});

// Import routes
import authRoutes from './routes/auth.js';
import bookingsRoutes from './routes/bookings.js';
import consultationsRoutes from './routes/consultations.js';
import timeSlotsRoutes from './routes/timeSlots.js';
import dashboardRoutes from './routes/dashboard.js';

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/consultations', consultationsRoutes);
app.use('/api/timeslots', timeSlotsRoutes);
app.use('/api/dashboard', dashboardRoutes);

// MongoDB connection
const MONGOURL = process.env.MONGOURL;
const PORT = process.env.PORT || 4000;

mongoose.connect(MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
}); 