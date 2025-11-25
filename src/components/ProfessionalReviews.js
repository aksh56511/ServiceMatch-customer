import React, { useState } from 'react';
import { Star, ThumbsUp, Clock, User } from 'lucide-react';
import './ProfessionalReviews.css';

function ProfessionalReviews({ professional, isOpen, onClose }) {
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, highest, lowest

  if (!isOpen || !professional) return null;

  const sortedReviews = [...professional.reviewsData].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'newest':
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getRatingBreakdown = () => {
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    professional.reviewsData.forEach(review => {
      breakdown[review.rating]++;
    });
    return breakdown;
  };

  const ratingBreakdown = getRatingBreakdown();
  const totalReviews = professional.reviewsData.length;

  return (
    <div className="reviews-modal-overlay">
      <div className="reviews-modal">
        <div className="reviews-header">
          <div className="professional-info">
            <div className="professional-avatar">
              {professional.avatar}
            </div>
            <div className="professional-details">
              <h2>{professional.name}</h2>
              <p>{professional.profession} • {professional.experience} years experience</p>
              <div className="rating-summary">
                <div className="overall-rating">
                  <Star size={20} fill="currentColor" className="star-filled" />
                  <span className="rating-value">{professional.rating}</span>
                  <span className="total-reviews">({professional.reviews} reviews)</span>
                </div>
              </div>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="reviews-content">
          <div className="rating-breakdown">
            <h3>Rating Breakdown</h3>
            <div className="breakdown-bars">
              {[5, 4, 3, 2, 1].map(rating => {
                const count = ratingBreakdown[rating];
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                return (
                  <div key={rating} className="breakdown-row">
                    <span className="rating-label">{rating} ★</span>
                    <div className="breakdown-bar">
                      <div 
                        className="breakdown-fill" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="breakdown-count">({count})</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="reviews-section">
            <div className="reviews-controls">
              <h3>Customer Reviews</h3>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
            </div>

            <div className="reviews-list">
              {sortedReviews.map(review => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <div className="reviewer-avatar">
                        <User size={20} />
                      </div>
                      <div className="reviewer-details">
                        <span className="reviewer-name">{review.customer}</span>
                        <span className="review-date">{formatDate(review.date)}</span>
                      </div>
                    </div>
                    <div className="review-rating">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          fill={i < review.rating ? "currentColor" : "none"}
                          className={i < review.rating ? "star-filled" : "star-empty"}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="review-content">
                    <p>{review.comment}</p>
                  </div>
                  <div className="review-actions">
                    <button className="helpful-btn">
                      <ThumbsUp size={14} />
                      Helpful
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfessionalReviews;