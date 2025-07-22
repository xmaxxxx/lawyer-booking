import React, { useState, useEffect } from "react";
import EmailTemplatePreview from "./EmailTemplates";
import apiService from "../services/apiService";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './AdminCalendar.css'; // Add this import for custom styles

function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [bookings, setBookings] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [consultationTypes, setConsultationTypes] = useState([]); // Add state for consultation types
  const [newSlot, setNewSlot] = useState({
    date: '',
    time: '',
    duration: '30',
    price: '',
    consultationType: '' // Add consultationType to newSlot
  });
  const [error, setError] = useState(null);

  // Load data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        const [bookingsResponse, slotsResponse, typesResponse] = await Promise.all([
          apiService.getBookings(),
          apiService.getTimeSlots(),
          apiService.getConsultationTypes()
        ]);

        if (bookingsResponse.success && Array.isArray(bookingsResponse.data)) {
          setBookings(bookingsResponse.data);
        } else {
          setBookings([]); // Always set to an array
        }

        if (slotsResponse.success && Array.isArray(slotsResponse.data)) {
          setTimeSlots(slotsResponse.data);
        } else {
          setTimeSlots([]); // Always set to an array
        }

        if (typesResponse.success && Array.isArray(typesResponse.data)) {
          setConsultationTypes(typesResponse.data);
          console.log('Consultation Types:', typesResponse.data); // Debug log
          // Set default consultationType if not set
          setNewSlot(prev => ({ ...prev, consultationType: typesResponse.data[0]?._id || '' }));
        } else {
          setConsultationTypes([]);
        }
        setError(null);
      } catch (err) {
        setError('Failed to load data. Please check your login or try again.');
        setBookings([]);
        setTimeSlots([]);
        setConsultationTypes([]);
      }
    };

    loadData();
  }, []);

  // Ensure default consultationType is set after types load
  useEffect(() => {
    if (
      consultationTypes.length > 0 &&
      (!newSlot.consultationType || !consultationTypes.some(type => type._id === newSlot.consultationType))
    ) {
      setNewSlot(prev => ({ ...prev, consultationType: consultationTypes[0]._id }));
    }
  }, [consultationTypes, newSlot.consultationType]);

  // Debug: log newSlot state
  console.log('newSlot:', newSlot);

  const handleAddSlot = async (e) => {
    e.preventDefault();
    if (!newSlot.consultationType) {
      setError('Please select a consultation type.');
      return;
    }
    try {
      // Calculate endTime based on startTime and duration
      const [startHour, startMinute] = newSlot.time.split(':').map(Number);
      const durationMinutes = parseInt(newSlot.duration, 10);
      const startDate = new Date();
      startDate.setHours(startHour, startMinute, 0, 0);
      const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
      const endHour = String(endDate.getHours()).padStart(2, '0');
      const endMinute = String(endDate.getMinutes()).padStart(2, '0');
      const endTime = `${endHour}:${endMinute}`;

      const slot = {
        ...newSlot,
        date: newSlot.date,
        startTime: newSlot.time,
        endTime,
        consultationType: newSlot.consultationType, // Ensure this is present
      };
      delete slot.time;
      delete slot.duration;
      delete slot.price;
      delete slot.available;
      console.log('Slot payload:', slot); // Debug log
      const response = await apiService.createTimeSlot(slot);
      if (response.success) {
        // Reload slots from backend
        const slotsResponse = await apiService.getTimeSlots();
        if (slotsResponse.success && Array.isArray(slotsResponse.data)) {
          setTimeSlots(slotsResponse.data);
        } else {
          setTimeSlots([]);
        }
        setNewSlot({ date: '', time: '', duration: '30', price: '', consultationType: consultationTypes[0]?.id || '' });
      } else {
        setError('Failed to add slot.');
      }
    } catch (err) {
      setError('Failed to add slot.');
    }
  };

  const handleDeleteSlot = async (id) => {
    try {
      const response = await apiService.deleteTimeSlot(id);
      if (response.success) {
        // Reload slots from backend
        const slotsResponse = await apiService.getTimeSlots();
        if (slotsResponse.success && Array.isArray(slotsResponse.data)) {
          setTimeSlots(slotsResponse.data);
        } else {
          setTimeSlots([]);
        }
      } else {
        setError('Failed to delete slot.');
      }
    } catch (err) {
      setError('Failed to delete slot.');
    }
  };

  const handleBookingStatusChange = (bookingId, newStatus) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch(status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Lawyer Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your consultations, bookings, and availability</p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {[
            { id: 'dashboard', label: 'Overview', icon: '📊' },
            { id: 'bookings', label: 'Bookings', icon: '📅' },
            { id: 'slots', label: 'Time Slots', icon: '⏰' },
            { id: 'calendar', label: 'Calendar', icon: '📆' },
            { id: 'emails', label: 'Email Templates', icon: '📧' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">{error}</div>
      )}

      {/* Dashboard Overview */}
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-semibold text-gray-900">{bookings.length}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {bookings.filter(b => b.status === 'confirmed').length}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {bookings.filter(b => b.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">
                  ${bookings.reduce((sum, b) => sum + (b.paymentStatus === 'paid' ? b.amount : 0), 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bookings Management */}
      {activeTab === 'bookings' && (
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Bookings</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Array.isArray(bookings) && bookings.map(booking => (
                  <tr key={booking._id || booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{booking.clientName}</div>
                        <div className="text-sm text-gray-500">{booking.email}</div>
                        <div className="text-sm text-gray-500">{booking.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.date}</div>
                      <div className="text-sm text-gray-500">{booking.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.duration} min
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${booking.amount}</div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(booking.paymentStatus)}`}>
                        {booking.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <select
                        value={booking.status}
                        onChange={(e) => handleBookingStatusChange(booking.id, e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Time Slots Management */}
      {activeTab === 'slots' && (
        <div className="space-y-6">
          {/* Add New Slot Form */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Add New Time Slot</h2>
            <form onSubmit={handleAddSlot} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={newSlot.date}
                  onChange={(e) => setNewSlot({...newSlot, date: e.target.value})}
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  value={newSlot.time}
                  onChange={(e) => setNewSlot({...newSlot, time: e.target.value})}
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <select
                  value={newSlot.duration}
                  onChange={(e) => setNewSlot({...newSlot, duration: e.target.value})}
                  className="form-select"
                >
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                <input
                  type="number"
                  value={newSlot.price}
                  onChange={(e) => setNewSlot({...newSlot, price: e.target.value})}
                  className="form-input"
                  placeholder="80"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Type</label>
                {consultationTypes.length > 0 ? (
                  <select
                    value={newSlot.consultationType || consultationTypes[0]._id}
                    onChange={(e) => setNewSlot({...newSlot, consultationType: e.target.value})}
                    className="form-select"
                    required
                  >
                    {consultationTypes.map(type => (
                      <option key={type._id} value={type._id}>{type.name}</option>
                    ))}
                  </select>
                ) : (
                  <div>Loading consultation types...</div>
                )}
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="btn-primary w-full"
                  disabled={!newSlot.consultationType || consultationTypes.length === 0}
                >
                  Add Slot
                </button>
              </div>
            </form>
          </div>

          {/* Existing Slots */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Time Slots</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {timeSlots.map(slot => (
                <div key={slot._id || slot.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{slot.date}</h3>
                      <p className="text-sm text-gray-600">{slot.startTime}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteSlot(slot._id || slot.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Duration: {slot.duration} minutes</p>
                    <p>Price: ${slot.price}</p>
                    <p className={`font-medium ${slot.available ? 'text-green-600' : 'text-red-600'}`}>
                      {slot.available ? 'Available' : 'Booked'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Calendar Tab */}
      {activeTab === 'calendar' && (
        <div className="card flex flex-col items-center justify-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Calendar View</h2>
          <Calendar 
            value={new Date()}
            tileClassName={({ date, view }) => {
              if (view === 'month') {
                const hasBooking = bookings.some(booking => {
                  const bookingDate = new Date(booking.date);
                  return bookingDate.toDateString() === date.toDateString();
                });
                const hasSlot = timeSlots.some(slot => {
                  const slotDate = new Date(slot.date);
                  return slotDate.toDateString() === date.toDateString();
                });
                if (hasBooking && hasSlot) return 'booked-day slot-day';
                if (hasBooking) return 'booked-day';
                if (hasSlot) return 'slot-day';
                return null;
              }
              return null;
            }}
          />
        </div>
      )}

      {/* Email Templates */}
      {activeTab === 'emails' && (
        <EmailTemplatePreview />
      )}
    </div>
  );
}

export default Admin; 