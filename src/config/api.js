// API Configuration for different environments
const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:4000/api',
    timeout: 10000
  },
  production: {
    // Use Vite env variable for production API URL
    baseURL: import.meta.env.VITE_API_URL || 'https://lawyer-booking.onrender.com/api',
    timeout: 15000
  }
};

// Get current environment
const environment = import.meta.env.MODE || 'development';

// Export API configuration
export const API_BASE_URL = API_CONFIG[environment].baseURL;
export const API_TIMEOUT = API_CONFIG[environment].timeout;

// API endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  
  // Users
  USERS: '/users',
  PROFILE: '/users/profile',
  
  // Consultations
  CONSULTATIONS: '/consultations',
  
  // Time Slots
  TIME_SLOTS: '/timeslots',
  AVAILABLE_SLOTS: '/timeslots/available',
  
  // Bookings
  BOOKINGS: '/bookings',
  MY_BOOKINGS: '/bookings/my-bookings',
  
  // Admin
  DASHBOARD: '/admin/dashboard',
  ALL_BOOKINGS: '/admin/bookings',
  
  // Health Check
  HEALTH: '/health'
};

// Helper function to build full URL
export const buildApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

// NOTE: For production, set VITE_API_URL in your .env file at the project root. 