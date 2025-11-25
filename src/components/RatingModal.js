import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import './RatingModal.css';

function RatingModal({ booking, onSubmit, onClose }) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit(rating, review.trim());
      setIsSubmitting(false);
    }, 1000);
  };

  const handleStarClick = (starRating) => {
    setRating(starRating);
  };

  const handleStarHover = (starRating) => {
    setHoveredRating(starRating);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const getRatingText = (currentRating) => {
    switch (currentRating) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return 'Rate this service';
    }
  };

  return (
    <div className="rating-modal-overlay">
      <div className="rating-modal">
        <div className="modal-header">
          <h2>Rate Your Service</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="service-summary">
          <div className="professional-info">
            <div className="professional-avatar">
              {booking.professionalAvatar}
            </div>
            <div className="professional-details">
              <h3>{booking.professionalName}</h3>
              <p>{booking.profession} • {booking.serviceType} Service</p>
              <p className="service-date">
                {new Date(booking.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
          <div className="service-description">
            <p>{booking.serviceDescription}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rating-form">
          <div className="rating-section">
            <label className="rating-label">How was your experience?</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star-btn ${star <= (hoveredRating || rating) ? 'active' : ''}`}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => handleStarHover(star)}
                  onMouseLeave={handleStarLeave}
                >
                  <Star 
                    size={32} 
                    fill={star <= (hoveredRating || rating) ? "currentColor" : "none"}
                  />
                </button>
              ))}
            </div>
            <div className="rating-text">
              {getRatingText(hoveredRating || rating)}
            </div>
          </div>

          <div className="review-section">
            <label className="review-label">
              Share your experience (Optional)
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Tell others about your experience with this professional..."
              className="review-textarea"
              rows={4}
              maxLength={500}
            />
            <div className="character-count">
              {review.length}/500 characters
            </div>
          </div>

          <div className="modal-actions">
            <button 
              type="button" 
              className="btn btn-secondary cancel-btn"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className={`btn btn-primary submit-btn ${rating === 0 ? 'disabled' : ''}`}
              disabled={rating === 0 || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="loading-spinner"></div>
                  Submitting...
                </>
              ) : (
                'Submit Rating'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RatingModal;