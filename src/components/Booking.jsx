import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";

function Booking() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    consultationType: "general",
    duration: "30",
    slot: null
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [consultationTypes, setConsultationTypes] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Calculate pricing based on consultation type and duration
  const calculatePrice = () => {
    const selectedType = getSelectedType();
    const basePrice = selectedType ? parseFloat(selectedType.price) : 100;
    
    switch(form.duration) {
      case "30": return basePrice * 0.7; // 70% of base price
      case "45": return basePrice * 0.85; // 85% of base price
      case "60": return basePrice; // Full base price
      default: return basePrice;
    }
  };

  const getSelectedSlot = () => {
    return timeSlots.find(slot => slot.id === parseInt(form.slot));
  };

  const getSelectedType = () => {
    return consultationTypes.find(type => type.id === form.consultationType || type._id === form.consultationType);
  };

  // Filter time slots for the selected consultation type
  const getFilteredSlots = () => {
    return timeSlots.filter(slot => {
      if (slot.consultationType && typeof slot.consultationType === 'object') {
        console.log(
          'Comparing slot.consultationType._id:',
          slot.consultationType._id,
          'with form.consultationType:',
          form.consultationType
        );
        return String(slot.consultationType._id) === String(form.consultationType) ||
               String(slot.consultationType.id) === String(form.consultationType);
      }
      return String(slot.consultationType) === String(form.consultationType);
    });
  };

  const handleNext = () => {
    if (step === 1) {
      if (!form.consultationType || !form.duration) {
        setError("Please select consultation type and duration.");
        return;
      }
      setStep(2);
      setError("");
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    setError("");
  };

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoadingData(true);
        const [typesResponse, slotsResponse] = await Promise.all([
          apiService.getConsultationTypes(),
          apiService.getTimeSlots()
        ]);
        
        if (typesResponse.success && Array.isArray(typesResponse.data) && typesResponse.data.length > 0) {
          setConsultationTypes(typesResponse.data);
          setForm(prev => ({ ...prev, consultationType: typesResponse.data[0]._id })); // Always use _id
        } else {
          setConsultationTypes([]);
          setForm(prev => ({ ...prev, consultationType: "" }));
        }
        
        if (slotsResponse.success && Array.isArray(slotsResponse.data) && slotsResponse.data.length > 0) {
          setTimeSlots(slotsResponse.data);
          setForm(prev => ({ ...prev, slot: slotsResponse.data[0].id }));
        } else {
          setTimeSlots([]);
          setForm(prev => ({ ...prev, slot: null }));
        }
      } catch {
        setError("Failed to load booking data. Please try again.");
      } finally {
        setIsLoadingData(false);
      }
    };
    
    loadData();
  }, []);

  // Set default slot when consultationType or timeSlots change
  useEffect(() => {
    if (timeSlots.length > 0) {
      const filtered = getFilteredSlots();
      if (filtered.length > 0) {
        setForm(prev => ({ ...prev, slot: filtered[0].id || filtered[0]._id }));
      } else {
        setForm(prev => ({ ...prev, slot: null }));
      }
    }
    // eslint-disable-next-line
  }, [form.consultationType, timeSlots]);

  // Debug logs for troubleshooting slot selection
  console.log("form.consultationType:", form.consultationType);
  console.log("timeSlots:", timeSlots);
  console.log("Filtered slots:", getFilteredSlots());

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      setError("Please fill in all required fields.");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const bookingData = {
        ...form,
        price: calculatePrice(),
        consultationTypeName: getSelectedType()?.name,
        timeSlot: form.slot, // Add this line to fix backend validation
        slotDetails: getSelectedSlot(),
        date: getSelectedSlot()?.date,
        time: getSelectedSlot()?.time
      };
      
      const response = await apiService.createBooking(bookingData);
      
      if (response.success) {
        localStorage.setItem("bookingData", JSON.stringify(response.data));
        navigate("/confirm");
      } else {
        setError("Failed to create booking. Please try again.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="animate-spin w-8 h-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Booking Options</h3>
            <p className="text-gray-600">Please wait while we load available consultation types and time slots.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            1
          </div>
          <div className={`flex-1 h-1 mx-4 ${
            step >= 2 ? 'bg-blue-600' : 'bg-gray-200'
          }`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            2
          </div>
        </div>
        <div className="flex justify-center mt-2 text-sm text-gray-600">
          <span className={step >= 1 ? 'text-blue-600 font-medium' : ''}>Select Service</span>
          <span className="mx-4">→</span>
          <span className={step >= 2 ? 'text-blue-600 font-medium' : ''}>Personal Details</span>
        </div>
      </div>

      <div className="card">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Book a Consultation</h2>
        
        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Consultation Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {consultationTypes.map(type => (
                  <div
                    key={type.id || type._id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      form.consultationType === type.id || form.consultationType === type._id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setForm({ ...form, consultationType: type.id || type._id })}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">{type.name}</h4>
                      <span className="text-sm font-medium text-blue-600">${type.price}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                    {(form.consultationType === type.id || form.consultationType === type._id) && (
                      <div className="text-sm text-green-600 font-medium">✓ Selected</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Duration</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: "30", label: "30 minutes", discount: "30% off" },
                  { value: "45", label: "45 minutes", discount: "15% off" },
                  { value: "60", label: "60 minutes", discount: "Full price" }
                ].map(option => (
                  <div
                    key={option.value}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      form.duration === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setForm({ ...form, duration: option.value })}
                  >
                    <div className="text-center">
                      <h4 className="font-semibold text-gray-900">{option.label}</h4>
                      <p className="text-sm text-gray-600">{option.discount}</p>
                      <p className="text-lg font-bold text-blue-600 mt-2">
                        ${Math.round(calculatePrice())}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Time Slot</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getFilteredSlots().map(slot => (
                  <div
                    key={slot.id || slot._id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      (slot.isAvailable !== false)
                        ? (form.slot === (slot.id || slot._id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300')
                        : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                    }`}
                    onClick={() => (slot.isAvailable !== false) && setForm({ ...form, slot: slot.id || slot._id })}
                  >
                    <div className="text-center">
                      <h4 className="font-semibold text-gray-900">{slot.date}</h4>
                      <p className="text-lg font-medium text-blue-600">{slot.startTime} - {slot.endTime}</p>
                      {slot.isAvailable === false && (
                        <p className="text-sm text-red-600 mt-1">Unavailable</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="btn-primary px-8 py-3"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Personal Details */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={form.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={form.phone}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Booking Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Consultation Type:</span>
                  <span className="font-medium">{getSelectedType()?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{form.duration} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date & Time:</span>
                  <span className="font-medium">
                    {getSelectedSlot()?.date} at {getSelectedSlot()?.time}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Price:</span>
                    <span className="text-blue-600">${Math.round(calculatePrice())}</span>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="btn-secondary px-8 py-3"
              >
                Back
              </button>
              <button 
                type="submit" 
                disabled={isLoading}
                className="btn-primary px-8 py-3 flex items-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Booking; 