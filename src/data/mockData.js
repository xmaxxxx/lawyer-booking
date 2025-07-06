// Mock API Data - Simulates backend responses
// This will be replaced with real API calls when backend is implemented

// Consultation Types
export const consultationTypes = [
  {
    id: "family-law",
    name: "Family Law",
    description: "Divorce, custody, adoption, and family matters",
    basePrice: 120,
    icon: "👨‍👩‍👧‍👦"
  },
  {
    id: "business-law",
    name: "Business Law",
    description: "Contracts, incorporation, and business disputes",
    basePrice: 150,
    icon: "💼"
  },
  {
    id: "criminal-law",
    name: "Criminal Law",
    description: "Criminal defense and legal representation",
    basePrice: 200,
    icon: "⚖️"
  },
  {
    id: "real-estate",
    name: "Real Estate",
    description: "Property transactions, disputes, and contracts",
    basePrice: 130,
    icon: "🏠"
  },
  {
    id: "general",
    name: "General Legal Advice",
    description: "General legal consultation and guidance",
    basePrice: 100,
    icon: "📋"
  }
];

// Available Time Slots
export const timeSlots = [
  { id: 1, date: "2025-01-15", time: "10:00 AM", available: true },
  { id: 2, date: "2025-01-15", time: "2:00 PM", available: true },
  { id: 3, date: "2025-01-16", time: "11:00 AM", available: true },
  { id: 4, date: "2025-01-16", time: "3:00 PM", available: false },
  { id: 5, date: "2025-01-17", time: "9:00 AM", available: true },
  { id: 6, date: "2025-01-17", time: "1:00 PM", available: true },
  { id: 7, date: "2025-01-18", time: "10:00 AM", available: true },
  { id: 8, date: "2025-01-18", time: "4:00 PM", available: true }
];

// Sample Bookings
export const bookings = [
  {
    id: 1,
    clientName: "John Doe",
    email: "john@example.com",
    phone: "+1-555-0123",
    date: "2025-01-15",
    time: "10:00 AM",
    duration: "60",
    consultationType: "family-law",
    consultationTypeName: "Family Law",
    status: "confirmed",
    paymentStatus: "paid",
    amount: 120,
    confirmationNumber: "BK-2025-001",
    createdAt: "2025-01-10T10:30:00Z"
  },
  {
    id: 2,
    clientName: "Jane Smith",
    email: "jane@example.com",
    phone: "+1-555-0456",
    date: "2025-01-16",
    time: "11:00 AM",
    duration: "45",
    consultationType: "business-law",
    consultationTypeName: "Business Law",
    status: "pending",
    paymentStatus: "pending",
    amount: 127.5,
    confirmationNumber: "BK-2025-002",
    createdAt: "2025-01-11T14:20:00Z"
  },
  {
    id: 3,
    clientName: "Mike Johnson",
    email: "mike@example.com",
    phone: "+1-555-0789",
    date: "2025-01-17",
    time: "9:00 AM",
    duration: "30",
    consultationType: "real-estate",
    consultationTypeName: "Real Estate",
    status: "confirmed",
    paymentStatus: "paid",
    amount: 91,
    confirmationNumber: "BK-2025-003",
    createdAt: "2025-01-12T09:15:00Z"
  }
];

// Lawyer Profile
export const lawyerProfile = {
  id: 1,
  name: "Sarah Wilson, Esq.",
  email: "lawyer@example.com",
  phone: "+1-555-123-4567",
  specialization: "Family Law, Business Law, Criminal Law",
  experience: "15+ years",
  education: "Harvard Law School, J.D.",
  barNumber: "CA123456",
  officeAddress: "123 Legal Street, Suite 100",
  officeCity: "San Francisco, CA 94102",
  officeHours: "Monday - Friday, 9:00 AM - 6:00 PM",
  consultationFee: {
    "30": 70,
    "45": 85,
    "60": 100
  }
};

// Dashboard Statistics
export const dashboardStats = {
  totalBookings: 156,
  confirmedBookings: 142,
  pendingBookings: 8,
  cancelledBookings: 6,
  totalRevenue: 18750,
  thisMonthBookings: 23,
  thisMonthRevenue: 2875,
  averageRating: 4.8,
  totalReviews: 89
};

// Recent Activity
export const recentActivity = [
  {
    id: 1,
    type: "booking_created",
    message: "New booking from John Doe for Family Law consultation",
    timestamp: "2025-01-12T10:30:00Z",
    bookingId: 1
  },
  {
    id: 2,
    type: "booking_confirmed",
    message: "Confirmed booking for Jane Smith",
    timestamp: "2025-01-11T16:45:00Z",
    bookingId: 2
  },
  {
    id: 3,
    type: "payment_received",
    message: "Payment received from Mike Johnson - $91.00",
    timestamp: "2025-01-10T14:20:00Z",
    bookingId: 3
  }
];

// Mock API Functions
export const mockAPI = {
  // Get consultation types
  getConsultationTypes: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, data: consultationTypes });
      }, 500);
    });
  },

  // Get available time slots
  getTimeSlots: (date) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredSlots = date 
          ? timeSlots.filter(slot => slot.date === date)
          : timeSlots;
        resolve({ success: true, data: filteredSlots });
      }, 300);
    });
  },

  // Get bookings
  getBookings: (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredBookings = [...bookings];
        
        if (filters.status) {
          filteredBookings = filteredBookings.filter(b => b.status === filters.status);
        }
        if (filters.date) {
          filteredBookings = filteredBookings.filter(b => b.date === filters.date);
        }
        
        resolve({ success: true, data: filteredBookings });
      }, 400);
    });
  },

  // Create new booking
  createBooking: (bookingData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newBooking = {
          id: Date.now(),
          ...bookingData,
          status: "pending",
          paymentStatus: "pending",
          confirmationNumber: `BK-${Date.now().toString().slice(-6)}`,
          createdAt: new Date().toISOString()
        };
        
        // Simulate adding to bookings array
        bookings.push(newBooking);
        
        resolve({ success: true, data: newBooking });
      }, 1000);
    });
  },

  // Update booking status
  updateBookingStatus: (bookingId, status) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const booking = bookings.find(b => b.id === bookingId);
        if (booking) {
          booking.status = status;
          resolve({ success: true, data: booking });
        } else {
          resolve({ success: false, error: "Booking not found" });
        }
      }, 500);
    });
  },

  // Get dashboard statistics
  getDashboardStats: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, data: dashboardStats });
      }, 300);
    });
  },

  // Get recent activity
  getRecentActivity: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, data: recentActivity });
      }, 400);
    });
  },

  // Get lawyer profile
  getLawyerProfile: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, data: lawyerProfile });
      }, 200);
    });
  },

  // Authentication
  login: (credentials) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (credentials.email === "lawyer@example.com" && credentials.password === "password123") {
          resolve({
            success: true,
            data: {
              token: "mock-jwt-token-" + Date.now(),
              user: {
                id: 1,
                email: "lawyer@example.com",
                role: "lawyer",
                name: "Sarah Wilson, Esq."
              }
            }
          });
        } else {
          resolve({
            success: false,
            error: "Invalid credentials"
          });
        }
      }, 1000);
    });
  },

  // Logout
  logout: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 300);
    });
  }
};

export default mockAPI; 