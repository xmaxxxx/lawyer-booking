import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactLogo from '../assets/react.svg';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is authenticated
  const isAuthenticated = () => {
    const token = localStorage.getItem("authToken");
    const userRole = localStorage.getItem("userRole");
    return token && userRole === "lawyer";
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/book", label: "Booking" },
    { path: "/confirm", label: "Confirmation" },
    { path: "/admin", label: "Admin" }
  ];

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-brand">
            <img src={ReactLogo} alt="Logo" className="nav-logo" />
            <span className="nav-title">Lawyer Booking</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="nav-desktop">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'nav-link-active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
            {isAuthenticated() && (
              <button
                onClick={handleLogout}
                className="nav-link text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="nav-mobile-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="nav-mobile-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="nav-mobile">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-mobile-link ${isActive(item.path) ? 'nav-mobile-link-active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {isAuthenticated() && (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="nav-mobile-link text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header; 