import React from "react";

// Email Template Components
export const BookingConfirmationEmail = ({ bookingData }) => {
  return (
    <div className="email-template">
      <div className="email-header">
        <div className="email-logo">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="email-brand">Legal Consultations</span>
        </div>
      </div>

      <div className="email-content">
        <h1 className="email-title">Booking Confirmation</h1>
        
        <div className="email-greeting">
          <p>Dear {bookingData?.name || "Valued Client"},</p>
          <p>Thank you for booking a consultation with us. Your appointment has been confirmed.</p>
        </div>

        <div className="email-details">
          <h2 className="email-section-title">Appointment Details</h2>
          <div className="email-detail-grid">
            <div className="email-detail-item">
              <span className="email-detail-label">Date:</span>
              <span className="email-detail-value">{bookingData?.date || "January 15, 2025"}</span>
            </div>
            <div className="email-detail-item">
              <span className="email-detail-label">Time:</span>
              <span className="email-detail-value">{bookingData?.time || "10:00 AM"}</span>
            </div>
            <div className="email-detail-item">
              <span className="email-detail-label">Duration:</span>
              <span className="email-detail-value">{bookingData?.duration || "60"} minutes</span>
            </div>
            <div className="email-detail-item">
              <span className="email-detail-label">Consultation Type:</span>
              <span className="email-detail-value">{bookingData?.type || "General Legal Advice"}</span>
            </div>
            <div className="email-detail-item">
              <span className="email-detail-label">Confirmation #:</span>
              <span className="email-detail-value">{bookingData?.confirmationNumber || "BK-2025-001"}</span>
            </div>
          </div>
        </div>

        <div className="email-instructions">
          <h2 className="email-section-title">What to Expect</h2>
          <ul className="email-list">
            <li>Please arrive 10 minutes before your scheduled time</li>
            <li>Bring any relevant documents or information</li>
            <li>Consultation will be conducted in a private, confidential setting</li>
            <li>Payment will be processed at the end of your consultation</li>
          </ul>
        </div>

        <div className="email-contact">
          <h2 className="email-section-title">Contact Information</h2>
          <div className="email-contact-info">
            <p><strong>Law Office Address:</strong></p>
            <p>123 Legal Street, Suite 100<br />
            City, State 12345</p>
            
            <p><strong>Phone:</strong> (555) 123-4567</p>
            <p><strong>Email:</strong> office@legalconsultations.com</p>
          </div>
        </div>

        <div className="email-footer">
          <p>If you need to reschedule or cancel your appointment, please contact us at least 24 hours in advance.</p>
          <p>We look forward to meeting with you!</p>
          
          <div className="email-signature">
            <p><strong>Best regards,</strong></p>
            <p>Legal Consultations Team</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LawyerNotificationEmail = ({ bookingData }) => {
  return (
    <div className="email-template">
      <div className="email-header">
        <div className="email-logo">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="email-brand">New Booking Notification</span>
        </div>
      </div>

      <div className="email-content">
        <h1 className="email-title">New Consultation Booking</h1>
        
        <div className="email-greeting">
          <p>You have received a new consultation booking request.</p>
        </div>

        <div className="email-details">
          <h2 className="email-section-title">Client Information</h2>
          <div className="email-detail-grid">
            <div className="email-detail-item">
              <span className="email-detail-label">Name:</span>
              <span className="email-detail-value">{bookingData?.name || "John Doe"}</span>
            </div>
            <div className="email-detail-item">
              <span className="email-detail-label">Email:</span>
              <span className="email-detail-value">{bookingData?.email || "john@example.com"}</span>
            </div>
            <div className="email-detail-item">
              <span className="email-detail-label">Phone:</span>
              <span className="email-detail-value">{bookingData?.phone || "+1-555-0123"}</span>
            </div>
          </div>
        </div>

        <div className="email-details">
          <h2 className="email-section-title">Appointment Details</h2>
          <div className="email-detail-grid">
            <div className="email-detail-item">
              <span className="email-detail-label">Date:</span>
              <span className="email-detail-value">{bookingData?.date || "January 15, 2025"}</span>
            </div>
            <div className="email-detail-item">
              <span className="email-detail-label">Time:</span>
              <span className="email-detail-value">{bookingData?.time || "10:00 AM"}</span>
            </div>
            <div className="email-detail-item">
              <span className="email-detail-label">Duration:</span>
              <span className="email-detail-value">{bookingData?.duration || "60"} minutes</span>
            </div>
            <div className="email-detail-item">
              <span className="email-detail-label">Consultation Type:</span>
              <span className="email-detail-value">{bookingData?.type || "General Legal Advice"}</span>
            </div>
            <div className="email-detail-item">
              <span className="email-detail-label">Confirmation #:</span>
              <span className="email-detail-value">{bookingData?.confirmationNumber || "BK-2025-001"}</span>
            </div>
          </div>
        </div>

        <div className="email-actions">
          <h2 className="email-section-title">Actions Required</h2>
          <div className="email-action-buttons">
            <button className="email-btn email-btn-primary">Confirm Booking</button>
            <button className="email-btn email-btn-secondary">Reschedule</button>
            <button className="email-btn email-btn-danger">Cancel</button>
          </div>
        </div>

        <div className="email-footer">
          <p>Please review and confirm this booking in your admin dashboard.</p>
          
          <div className="email-signature">
            <p><strong>Best regards,</strong></p>
            <p>Booking System</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ReminderEmail = ({ bookingData }) => {
  return (
    <div className="email-template">
      <div className="email-header">
        <div className="email-logo">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="email-brand">Appointment Reminder</span>
        </div>
      </div>

      <div className="email-content">
        <h1 className="email-title">Appointment Reminder</h1>
        
        <div className="email-greeting">
          <p>Dear {bookingData?.name || "Valued Client"},</p>
          <p>This is a friendly reminder about your upcoming consultation appointment.</p>
        </div>

        <div className="email-details">
          <h2 className="email-section-title">Your Appointment</h2>
          <div className="email-detail-grid">
            <div className="email-detail-item">
              <span className="email-detail-label">Date:</span>
              <span className="email-detail-value">{bookingData?.date || "January 15, 2025"}</span>
            </div>
            <div className="email-detail-item">
              <span className="email-detail-label">Time:</span>
              <span className="email-detail-value">{bookingData?.time || "10:00 AM"}</span>
            </div>
            <div className="email-detail-item">
              <span className="email-detail-label">Duration:</span>
              <span className="email-detail-value">{bookingData?.duration || "60"} minutes</span>
            </div>
          </div>
        </div>

        <div className="email-reminder">
          <h2 className="email-section-title">Important Reminders</h2>
          <ul className="email-list">
            <li>Please arrive 10 minutes before your scheduled time</li>
            <li>Bring any relevant documents or information</li>
            <li>If you need to reschedule, please contact us at least 24 hours in advance</li>
            <li>Consultation will be conducted in a private, confidential setting</li>
          </ul>
        </div>

        <div className="email-footer">
          <p>We look forward to meeting with you!</p>
          
          <div className="email-signature">
            <p><strong>Best regards,</strong></p>
            <p>Legal Consultations Team</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Email Template Preview Component
export const EmailTemplatePreview = () => {
  const [selectedTemplate, setSelectedTemplate] = React.useState('confirmation');
  const [bookingData] = React.useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1-555-0123",
    date: "2025-01-15",
    time: "10:00 AM",
    duration: "60",
    type: "Family Law Consultation",
    confirmationNumber: "BK-2025-001"
  });

  const renderTemplate = () => {
    switch(selectedTemplate) {
      case 'confirmation':
        return <BookingConfirmationEmail bookingData={bookingData} />;
      case 'lawyer':
        return <LawyerNotificationEmail bookingData={bookingData} />;
      case 'reminder':
        return <ReminderEmail bookingData={bookingData} />;
      default:
        return <BookingConfirmationEmail bookingData={bookingData} />;
    }
  };

  return (
    <div className="email-preview-container">
      <div className="email-preview-header">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Email Templates</h1>
        
        <div className="email-preview-controls">
          <div className="email-template-selector">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Template:</label>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="form-select"
            >
              <option value="confirmation">Booking Confirmation</option>
              <option value="lawyer">Lawyer Notification</option>
              <option value="reminder">Appointment Reminder</option>
            </select>
          </div>
        </div>
      </div>

      <div className="email-preview-content">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default EmailTemplatePreview; 