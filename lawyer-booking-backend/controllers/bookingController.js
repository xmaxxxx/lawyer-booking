import Booking from '../models/Booking.js';

export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      client: req.user._id
    });
    await booking.populate('client consultationType timeSlot');
    res.status(201).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ client: req.user._id })
      .populate('consultationType timeSlot');
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('client consultationType timeSlot');
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    if (
      req.user.role === 'client' &&
      booking.client._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    if (
      req.user.role === 'client' &&
      booking.client.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    Object.assign(booking, req.body);
    await booking.save();
    await booking.populate('client consultationType timeSlot');
    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    if (
      req.user.role === 'client' &&
      booking.client.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    booking.status = 'cancelled';
    await booking.save();
    res.json({ success: true, message: 'Booking cancelled', booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    if (!['admin', 'lawyer'].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    const bookings = await Booking.find()
      .populate('client consultationType timeSlot');
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    if (!['admin', 'lawyer'].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    booking.status = req.body.status;
    booking.lawyerNotes = req.body.lawyerNotes || booking.lawyerNotes;
    await booking.save();
    await booking.populate('client consultationType timeSlot');
    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}; 