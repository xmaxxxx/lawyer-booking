import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to Legal Consultations
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Book a professional consultation with an experienced lawyer. Get advice, schedule meetings, and manage your legal needs easily online.
          </p>
        </div>
        <button 
          onClick={() => navigate('/book')}
          className="btn-primary text-lg px-8 py-3"
        >
          Book a Consultation
        </button>
      </div>
    </div>
  );
}

export default Home; 