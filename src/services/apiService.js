import { mockAPI } from '../data/mockData';
import { API_BASE_URL, API_ENDPOINTS, buildApiUrl } from '../config/api.js';

// API Service Layer
// This service layer abstracts API calls and can be easily replaced with real API endpoints

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  const url = buildApiUrl(endpoint);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

class ApiService {
  // Consultation Types
  async getConsultationTypes() {
    try {
      const response = await mockAPI.getConsultationTypes();
      return response;
    } catch (error) {
      console.error('Error fetching consultation types:', error);
      throw error;
    }
  }

  // Time Slots
  async getTimeSlots(date = null) {
    try {
      const response = await mockAPI.getTimeSlots(date);
      return response;
    } catch (error) {
      console.error('Error fetching time slots:', error);
      throw error;
    }
  }

  // Bookings
  async getBookings(filters = {}) {
    try {
      const response = await mockAPI.getBookings(filters);
      return response;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  }

  async createBooking(bookingData) {
    try {
      const response = await mockAPI.createBooking(bookingData);
      return response;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  }

  async updateBookingStatus(bookingId, status) {
    try {
      const response = await mockAPI.updateBookingStatus(bookingId, status);
      return response;
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw error;
    }
  }

  // Dashboard
  async getDashboardStats() {
    try {
      const response = await mockAPI.getDashboardStats();
      return response;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  }

  async getRecentActivity() {
    try {
      const response = await mockAPI.getRecentActivity();
      return response;
    } catch (error) {
      console.error('Error fetching recent activity:', error);
      throw error;
    }
  }

  // Lawyer Profile
  async getLawyerProfile() {
    try {
      const response = await mockAPI.getLawyerProfile();
      return response;
    } catch (error) {
      console.error('Error fetching lawyer profile:', error);
      throw error;
    }
  }

  // Authentication
  async login(credentials) {
    try {
      const response = await mockAPI.login(credentials);
      return response;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  async logout() {
    try {
      const response = await mockAPI.logout();
      return response;
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService; 