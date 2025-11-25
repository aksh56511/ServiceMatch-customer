import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Star, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import RatingModal from './RatingModal';
import './BookingHistory.css';

// Mock booking history data
const mockBookings = [
  {
    id: 'BK001',
    professionalName: 'John Smith',
    profession: 'Plumber',
    serviceType: 'Premium',
    date: '2025-11-20',
    time: '14:30',
    address: '123 Main Street, Downtown',
    status: 'completed',
    amount: 648, // 599 + 49 platform fee
    rating: null,
    professionalAvatar: '👨‍🔧',
    serviceDescription: 'Kitchen sink pipe repair and maintenance'
  },
  {
    id: 'BK002',
    professionalName: 'Mike Wilson',
    profession: 'Electrician',
    serviceType: 'Normal',
    date: '2025-11-18',
    time: '10:00',
    address: '456 Oak Avenue, Suburb',
    status: 'completed',
    amount: 548, // 499 + 49 platform fee
    rating: 5,
    professionalAvatar: '👨‍⚡',
    serviceDescription: 'Electrical socket installation in living room'
  },
  {
    id: 'BK003',
    professionalName: 'Lisa Anderson',
    profession: 'Carpenter',
    serviceType: 'Premium',
    date: '2025-11-25',
    time: '16:00',
    address: '789 Pine Road, City Center',
    status: 'upcoming',
    amount: 648,
    rating: null,
    professionalAvatar: '👩‍🔨',
    serviceDescription: 'Custom wooden shelf installation'
  },
  {
    id: 'BK004',
    professionalName: 'Sarah Johnson',
    profession: 'Plumber',
    serviceType: 'Normal',
    date: '2025-11-15',
    time: '09:30',
    address: '321 Elm Street, Residential Area',
    status: 'completed',
    amount: 548,
    rating: 4,
    professionalAvatar: '👩‍🔧',
    serviceDescription: 'Bathroom faucet repair and replacement'
  },
  {
    id: 'BK005',
    professionalName: 'Robert Brown',
    profession: 'Electrician',
    serviceType: 'Normal',
    date: '2025-11-22',
    time: '11:00',
    address: '654 Maple Drive, Suburb',
    status: 'cancelled',
    amount: 0,
    rating: null,
    professionalAvatar: '👨‍⚡',
    serviceDescription: 'Light fixture installation (cancelled by customer)'
  }
];

function BookingHistory() {
  const [bookings, setBookings] = useState(mockBookings);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [filter, setFilter] = useState('all'); // all, completed, upcoming, cancelled

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={20} className="status-icon completed" />;
      case 'upcoming':
        return <Clock size={20} className="status-icon upcoming" />;
      case 'cancelled':
        return <XCircle size={20} className="status-icon cancelled" />;
      default:
        return <AlertCircle size={20} className="status-icon" />;
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const handleRateService = (booking) => {
    setSelectedBooking(booking);
    setShowRatingModal(true);
  };

  const handleRatingSubmit = (rating, review) => {
    setBookings(prev => prev.map(booking => 
      booking.id === selectedBooking.id 
        ? { ...booking, rating, review }
        : booking
    ));
    setShowRatingModal(false);
    setSelectedBooking(null);
  };

  const completedBookings = bookings.filter(b => b.status === 'completed').length;
  const upcomingBookings = bookings.filter(b => b.status === 'upcoming').length;
  const totalSpent = bookings
    .filter(b => b.status === 'completed')
    .reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="booking-history">
      <div className="container">
        <div className="page-header">
          <h1>My Bookings</h1>
          <p>View and manage your service bookings</p>
        </div>

        <div className="booking-stats">
          <div className="stat-card">
            <div className="stat-value">{completedBookings}</div>
            <div className="stat-label">Completed Services</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{upcomingBookings}</div>
            <div className="stat-label">Upcoming Services</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">₹{totalSpent}</div>
            <div className="stat-label">Total Spent</div>
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-tabs">
            <button 
              className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({bookings.length})
            </button>
            <button 
              className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed ({completedBookings})
            </button>
            <button 
              className={`filter-tab ${filter === 'upcoming' ? 'active' : ''}`}
              onClick={() => setFilter('upcoming')}
            >
              Upcoming ({upcomingBookings})
            </button>
            <button 
              className={`filter-tab ${filter === 'cancelled' ? 'active' : ''}`}
              onClick={() => setFilter('cancelled')}
            >
              Cancelled ({bookings.filter(b => b.status === 'cancelled').length})
            </button>
          </div>
        </div>

        <div className="bookings-list">
          {filteredBookings.length > 0 ? (
            filteredBookings.map(booking => (
              <div key={booking.id} className={`booking-card ${booking.status}`}>
                <div className="booking-header">
                  <div className="professional-info">
                    <div className="professional-avatar">
                      {booking.professionalAvatar}
                    </div>
                    <div className="professional-details">
                      <h3>{booking.professionalName}</h3>
                      <p>{booking.profession} • {booking.serviceType} Service</p>
                    </div>
                  </div>
                  <div className="booking-status">
                    {getStatusIcon(booking.status)}
                    <span>{getStatusText(booking.status)}</span>
                  </div>
                </div>

                <div className="booking-details">
                  <div className="detail-item">
                    <Calendar size={16} />
                    <span>{formatDate(booking.date)} at {booking.time}</span>
                  </div>
                  <div className="detail-item">
                    <MapPin size={16} />
                    <span>{booking.address}</span>
                  </div>
                  <div className="service-description">
                    <p>{booking.serviceDescription}</p>
                  </div>
                </div>

                <div className="booking-footer">
                  <div className="booking-amount">
                    <span className="amount-label">Total Paid:</span>
                    <span className="amount-value">₹{booking.amount}</span>
                  </div>
                  
                  <div className="booking-actions">
                    {booking.status === 'completed' && !booking.rating && (
                      <button 
                        className="btn btn-primary rate-btn"
                        onClick={() => handleRateService(booking)}
                      >
                        <Star size={16} />
                        Rate Service
                      </button>
                    )}
                    
                    {booking.status === 'completed' && booking.rating && (
                      <div className="existing-rating">
                        <div className="rating-display">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              fill={i < booking.rating ? "currentColor" : "none"}
                              className={i < booking.rating ? "star-filled" : "star-empty"}
                            />
                          ))}
                        </div>
                        <span className="rating-text">Rated {booking.rating}/5</span>
                      </div>
                    )}
                    
                    {booking.status === 'upcoming' && (
                      <div className="upcoming-actions">
                        <button className="btn btn-secondary">Reschedule</button>
                        <button className="btn btn-outline">Cancel</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-bookings">
              <div className="no-bookings-icon">📅</div>
              <h3>No {filter !== 'all' ? filter : ''} bookings found</h3>
              <p>
                {filter === 'all' 
                  ? "You haven't made any bookings yet." 
                  : `No ${filter} bookings to display.`
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {showRatingModal && (
        <RatingModal
          booking={selectedBooking}
          onSubmit={handleRatingSubmit}
          onClose={() => {
            setShowRatingModal(false);
            setSelectedBooking(null);
          }}
        />
      )}
    </div>
  );
}

export default BookingHistory;