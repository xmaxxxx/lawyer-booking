import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // Check if user is authenticated
  const isAuthenticated = () => {
    const token = localStorage.getItem("authToken");
    const userRole = localStorage.getItem("userRole");
    return token && userRole === "lawyer";
  };

  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute; 