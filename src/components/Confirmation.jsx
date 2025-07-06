import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Confirmation() {
  const [data, setData] = useState(null);
  const [confNum, setConfNum] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const booking = localStorage.getItem("bookingData");
    if (booking) {
      setData(JSON.parse(booking));
      setConfNum(Math.floor(100000 + Math.random() * 900000).toString());
    }
  }, []);

  if (!data) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">No booking found</h2>
          <button 
            onClick={() => navigate("/book")}
            className="btn-primary"
          >
            Book Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed</h2>
          <p className="text-gray-600">Your consultation has been successfully scheduled</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Name:</span>
              <span className="text-gray-900">{data.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Email:</span>
              <span className="text-gray-900">{data.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Phone:</span>
              <span className="text-gray-900">{data.phone}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Duration:</span>
              <span className="text-gray-900">{data.duration} minutes</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Time Slot:</span>
              <span className="text-gray-900">{data.slot}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Confirmation #:</span>
              <span className="text-gray-900 font-mono">{confNum}</span>
            </div>
          </div>
        </div>

        {(data.duration === "45" || data.duration === "60") && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Payment Successful
          </div>
        )}

        <div className="text-center">
          <button 
            onClick={() => navigate("/")}
            className="btn-secondary"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation; 