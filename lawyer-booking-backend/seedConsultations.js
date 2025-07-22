import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Consultation from './models/Consultation.js';
import TimeSlot from './models/TimeSlot.js';

dotenv.config();

const MONGOURL = process.env.MONGOURL;

const consultations = [
  {
    name: 'Family Law',
    description: 'Consultation for family law matters.',
    duration: 60,
    price: 100,
    category: 'Family Law'
  },
  {
    name: 'Criminal Law',
    description: 'Consultation for criminal law matters.',
    duration: 60,
    price: 120,
    category: 'Criminal Law'
  },
  {
    name: 'Corporate Law',
    description: 'Consultation for corporate law matters.',
    duration: 60,
    price: 150,
    category: 'Corporate Law'
  },
  {
    name: 'Real Estate',
    description: 'Consultation for real estate matters.',
    duration: 45,
    price: 90,
    category: 'Real Estate'
  }
];

function getFutureDate(daysAhead) {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return date.toISOString().slice(0, 10);
}

async function seed() {
  await mongoose.connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true });
  await Consultation.deleteMany({});
  const insertedConsultations = await Consultation.insertMany(consultations);
  console.log('Consultation types seeded!');

  // Seed example time slots for all consultation types with future dates
  await TimeSlot.deleteMany({});
  const slots = insertedConsultations.flatMap((consultation, idx) => [
    {
      date: getFutureDate(1),
      startTime: '10:00',
      endTime: '11:00',
      consultationType: consultation._id,
      isAvailable: true
    },
    {
      date: getFutureDate(2),
      startTime: '12:00',
      endTime: '13:00',
      consultationType: consultation._id,
      isAvailable: true
    }
  ]);
  const insertedSlots = await TimeSlot.insertMany(slots);
  console.log('Time slots seeded!');

  // Optionally, print slot IDs for use in bookings
  insertedSlots.forEach(slot => {
    console.log(`TimeSlot for ${slot.consultationType}: ${slot._id}`);
  });

  process.exit(0);
}

seed(); 