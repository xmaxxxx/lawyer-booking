import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const MONGOURL = process.env.MONGOURL;

async function seedLawyer() {
  try {
    await mongoose.connect(MONGOURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    const email = 'lawyer@example.com';
    const password = 'password123';
    const name = 'Demo Lawyer';
    const role = 'lawyer';

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      console.log('User already exists:', email);
      process.exit(0);
    }

    const user = new User({ name, email, password, role, phone: '1234567890' });
    await user.save();
    console.log('Lawyer user created:', email);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding lawyer user:', err);
    process.exit(1);
  }
}

seedLawyer(); 