import { mockAPI } from '../data/mockData';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api.js';

// API Service Layer
// This service layer abstracts API calls and can be easily replaced with real API endpoints

// Helper function to make API calls
// const apiCall = async (endpoint, options = {}) => { ... }

class ApiService {
  // Consultation Types
  async getConsultationTypes() {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CONSULTATIONS}`);
      const data = await response.json();
      // Return array of consultations (types)
      if (data.success && Array.isArray(data.consultations)) {
        return { success: true, data: data.consultations };
      } else {
        return { success: false, data: [] };
      }
    } catch (error) {
      console.error('Error fetching consultation types:', error);
      throw error;
    }
  }

  // Time Slots
  async getTimeSlots(date = null) {
    try {
      let url = `${API_BASE_URL}${API_ENDPOINTS.TIME_SLOTS}`;
      if (date) {
        url += `?date=${encodeURIComponent(date)}`;
      }
      const token = localStorage.getItem('authToken');
      const response = await fetch(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching time slots:', error);
      throw error;
    }
  }

  // Create a new time slot
  async createTimeSlot(slotData) {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.TIME_SLOTS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(slotData)
    });
    return await response.json();
  }

  // Delete a time slot
  async deleteTimeSlot(slotId) {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.TIME_SLOTS}/${slotId}`, {
      method: 'DELETE',
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return await response.json();
  }

  // Bookings
  async getBookings(filters = {}) {
    try {
      let url = `${API_BASE_URL}${API_ENDPOINTS.BOOKINGS}`;
      const params = new URLSearchParams(filters).toString();
      if (params) {
        url += `?${params}`;
      }
      const token = localStorage.getItem('authToken');
      const response = await fetch(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  }

  async createBooking(bookingData) {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.BOOKINGS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(bookingData)
      });
      return await response.json();
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
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LOGIN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      return await response.json();
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