import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Clock, Calendar, CreditCard, Check } from 'lucide-react';
import './BookingPage.css';

function BookingPage({ professional, onBookingComplete }) {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState('normal');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [urgencyLevel, setUrgencyLevel] = useState('normal'); // normal, urgent, emergency
  const [estimatedDistance, setEstimatedDistance] = useState(2); // km
  const [bookingDetails, setBookingDetails] = useState({
    address: '',
    instructions: '',
    phone: ''
  });
  const [isBooking, setIsBooking] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Calculate dynamic premium pricing
  const calculatePrice = (basePrice, urgency, distance) => {
    let price = basePrice;
    
    // Urgency multiplier
    if (urgency === 'urgent') {
      price += 150; // +₹150 for urgent
    } else if (urgency === 'emergency') {
      price += 300; // +₹300 for emergency
    }
    
    // Distance multiplier (for distances > 2km)
    if (distance > 2) {
      const extraDistance = distance - 2;
      price += extraDistance * 50; // +₹50 per extra km
    }
    
    return Math.round(price);
  };

  // Generate available time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 18; hour++) {
      slots.push(`${hour}:00`);
      if (hour < 18) slots.push(`${hour}:30`);
    }
    return slots;
  };

  // Generate next 7 days
  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: i === 0 ? 'Today' : 
               i === 1 ? 'Tomorrow' : 
               date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      });
    }
    return dates;
  };

  const timeSlots = generateTimeSlots();
  const availableDates = generateDates();

  const normalPrice = calculatePrice(professional.normalPrice, urgencyLevel, estimatedDistance);
  const premiumPrice = calculatePrice(professional.premiumPrice, urgencyLevel, estimatedDistance);
  const selectedPrice = selectedService === 'normal' ? normalPrice : premiumPrice;

  const handleInputChange = (field, value) => {
    setBookingDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsBooking(true);

    // Simulate booking process
    setTimeout(() => {
      setBookingConfirmed(true);
      setIsBooking(false);
      
      // Auto redirect after 3 seconds
      setTimeout(() => {
        onBookingComplete();
        navigate('/professionals');
      }, 3000);
    }, 2000);
  };

  if (bookingConfirmed) {
    return (
      <div className="booking-page">
        <div className="container">
          <div className="booking-success">
            <div className="success-icon">
              <Check size={48} />
            </div>
            <h2>Booking Confirmed!</h2>
            <p>Your service has been successfully booked with {professional.name}</p>
            <div className="booking-summary">
              <div className="summary-item">
                <strong>Service:</strong> {selectedService === 'normal' ? 'Normal' : 'Premium'} Service
              </div>
              <div className="summary-item">
                <strong>Date & Time:</strong> {availableDates.find(d => d.value === selectedDate)?.label} at {selectedTime}
              </div>
              <div className="summary-item">
                <strong>Total Amount:</strong> ₹{selectedPrice}
              </div>
            </div>
            <p className="redirect-notice">Redirecting you back to professionals list...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="container">
        <div className="booking-header">
          <button className="back-button" onClick={() => navigate('/professionals')}>
            <ArrowLeft size={20} />
            Back to Professionals
          </button>
          <h1>Book Service</h1>
        </div>

        <div className="booking-content">
          <div className="professional-summary">
            <div className="professional-info">
              <div className="professional-avatar">
                {professional.avatar}
              </div>
              <div className="professional-details">
                <h3>{professional.name}</h3>
                <p>{professional.profession} • {professional.experience} years experience</p>
                <div className="professional-stats">
                  <div className="stat">
                    <Star size={16} fill="currentColor" />
                    <span>{professional.rating} ({professional.reviews} reviews)</span>
                  </div>
                  <div className="stat">
                    <MapPin size={16} />
                    <span>{professional.distance} km away</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleBookingSubmit} className="booking-form">
            <div className="form-section">
              <h3>Select Service Type</h3>
              <div className="service-options">
                <label className={`service-option ${selectedService === 'normal' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="service"
                    value="normal"
                    checked={selectedService === 'normal'}
                    onChange={(e) => setSelectedService(e.target.value)}
                  />
                  <div className="service-details">
                    <h4>Normal Service</h4>
                    <p>Standard quality service with basic features</p>
                    <div className="service-price">₹{normalPrice}</div>
                  </div>
                </label>
                
                <label className={`service-option premium ${selectedService === 'premium' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="service"
                    value="premium"
                    checked={selectedService === 'premium'}
                    onChange={(e) => setSelectedService(e.target.value)}
                  />
                  <div className="service-details">
                    <h4>Premium Service</h4>
                    <p>Enhanced service with extra features and priority support</p>
                    <div className="service-price">₹{premiumPrice}</div>
                  </div>
                </label>
              </div>
            </div>

            <div className="form-section">
              <h3>Service Priority & Location</h3>
              
              <div className="priority-section">
                <label>Service Urgency</label>
                <div className="urgency-options">
                  <label className={`urgency-option ${urgencyLevel === 'normal' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="urgency"
                      value="normal"
                      checked={urgencyLevel === 'normal'}
                      onChange={(e) => setUrgencyLevel(e.target.value)}
                    />
                    <div className="urgency-content">
                      <span className="urgency-label">Normal</span>
                      <span className="urgency-desc">Can wait 1-2 days</span>
                      <span className="urgency-extra">Base price</span>
                    </div>
                  </label>
                  
                  <label className={`urgency-option urgent ${urgencyLevel === 'urgent' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="urgency"
                      value="urgent"
                      checked={urgencyLevel === 'urgent'}
                      onChange={(e) => setUrgencyLevel(e.target.value)}
                    />
                    <div className="urgency-content">
                      <span className="urgency-label">Urgent</span>
                      <span className="urgency-desc">Need help today</span>
                      <span className="urgency-extra">+₹150</span>
                    </div>
                  </label>
                  
                  <label className={`urgency-option emergency ${urgencyLevel === 'emergency' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="urgency"
                      value="emergency"
                      checked={urgencyLevel === 'emergency'}
                      onChange={(e) => setUrgencyLevel(e.target.value)}
                    />
                    <div className="urgency-content">
                      <span className="urgency-label">Emergency</span>
                      <span className="urgency-desc">Need immediate help</span>
                      <span className="urgency-extra">+₹300</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="distance-section">
                <label>Estimated Distance from Your Location</label>
                <div className="distance-slider">
                  <input
                    type="range"
                    min="0.5"
                    max="10"
                    step="0.5"
                    value={estimatedDistance}
                    onChange={(e) => setEstimatedDistance(parseFloat(e.target.value))}
                    className="distance-input"
                  />
                  <div className="distance-display">
                    <span>{estimatedDistance} km away</span>
                    {estimatedDistance > 2 && (
                      <span className="extra-charge">+₹{(estimatedDistance - 2) * 50} for distance</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Select Date & Time</h3>
              <div className="datetime-selection">
                <div className="date-selection">
                  <label>Choose Date</label>
                  <select 
                    value={selectedDate} 
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                  >
                    <option value="">Select a date</option>
                    {availableDates.map(date => (
                      <option key={date.value} value={date.value}>
                        {date.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="time-selection">
                  <label>Choose Time</label>
                  <select 
                    value={selectedTime} 
                    onChange={(e) => setSelectedTime(e.target.value)}
                    required
                    disabled={!selectedDate}
                  >
                    <option value="">Select a time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Service Details</h3>
              <div className="form-group">
                <label>Service Address *</label>
                <textarea
                  value={bookingDetails.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter complete address where service is needed"
                  required
                  rows={3}
                />
              </div>
              
              <div className="form-group">
                <label>Contact Phone *</label>
                <input
                  type="tel"
                  value={bookingDetails.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Your contact number"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Special Instructions (Optional)</label>
                <textarea
                  value={bookingDetails.instructions}
                  onChange={(e) => handleInputChange('instructions', e.target.value)}
                  placeholder="Any specific requirements or instructions for the professional"
                  rows={3}
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Payment Summary</h3>
              <div className="payment-summary">
                <div className="summary-row">
                  <span>Service Fee</span>
                  <span>₹{selectedPrice}</span>
                </div>
                <div className="summary-row">
                  <span>Platform Fee</span>
                  <span>₹49</span>
                </div>
                <div className="summary-row total">
                  <span>Total Amount</span>
                  <span>₹{selectedPrice + 49}</span>
                </div>
              </div>
            </div>

            <div className="booking-actions">
              <button 
                type="submit" 
                className="btn btn-primary book-button"
                disabled={isBooking || !selectedDate || !selectedTime}
              >
                {isBooking ? (
                  <>
                    <div className="loading-spinner"></div>
                    Processing Booking...
                  </>
                ) : (
                  <>
                    <CreditCard size={20} />
                    Book & Pay ₹{selectedPrice + 49}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;