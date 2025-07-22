import User from '../models/User.js';
import Booking from '../models/Booking.js';
import Consultation from '../models/Consultation.js';

export const getDashboardStats = async (req, res) => {
  try {
    if (!['admin', 'lawyer'].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    const [
      totalUsers,
      totalClients,
      totalLawyers,
      totalAdmins,
      totalBookings,
      totalConsultations,
      totalRevenue
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'client' }),
      User.countDocuments({ role: 'lawyer' }),
      User.countDocuments({ role: 'admin' }),
      Booking.countDocuments(),
      Consultation.countDocuments(),
      Booking.aggregate([
        { $match: { paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ])
    ]);
    res.json({
      success: true,
      stats: {
        totalUsers,
        totalClients,
        totalLawyers,
        totalAdmins,
        totalBookings,
        totalConsultations,
        totalRevenue: totalRevenue[0]?.total || 0
      }
    });
  } catch {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getBookingTrends = async (req, res) => {
  try {
    const trends = await Booking.aggregate([
      {
        $group: {
          _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);
    res.json({ success: true, trends });
  } catch {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getConsultationStats = async (req, res) => {
  try {
    const stats = await Consultation.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);
    res.json({ success: true, stats });
  } catch {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getRecentBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('client consultationType');
    res.json({ success: true, bookings });
  } catch {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}; 