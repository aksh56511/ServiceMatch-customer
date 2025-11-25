import React, { useState } from 'react';
import { Star, MapPin, Clock, MessageCircle, Calendar, MessageSquare } from 'lucide-react';
import ProfessionalReviews from './ProfessionalReviews';
import './ProfessionalCard.css';

function ProfessionalCard({ professional, onBook, onChat }) {
  const [showReviews, setShowReviews] = useState(false);
  
  const {
    id,
    name,
    profession,
    experience,
    rating,
    reviews,
    distance,
    avatar,
    normalPrice,
    premiumPrice,
    availability,
    description,
    skills,
    reviewsData
  } = professional;

  return (
    <div className="professional-card">
      <div className="card-header">
        <div className="professional-avatar">
          {avatar}
        </div>
        <div className="professional-basic-info">
          <h3>{name}</h3>
          <p className="profession">{profession} • {experience} years exp</p>
          <div className="rating-info">
            <div className="rating">
              <Star size={16} fill="currentColor" />
              <span>{rating}</span>
            </div>
            <span className="review-count">({reviews} reviews)</span>
          </div>
        </div>
        <button 
          className="chat-btn"
          onClick={() => onChat(professional)}
          title="Chat with professional"
        >
          <MessageCircle size={18} />
        </button>
      </div>

      <div className="location-availability">
        <div className="location">
          <MapPin size={16} />
          <span>{distance} km away</span>
        </div>
        <div className="availability">
          <Clock size={16} />
          <span>{availability}</span>
        </div>
      </div>

      <div className="description">
        <p>{description}</p>
      </div>

      <div className="skills">
        {skills.slice(0, 3).map((skill, index) => (
          <span key={index} className="skill-tag">{skill}</span>
        ))}
        {skills.length > 3 && (
          <span className="skill-tag more">+{skills.length - 3} more</span>
        )}
      </div>

      <div className="pricing">
        <div className="service-option normal">
          <div className="service-info">
            <h4>Normal Service</h4>
            <p>Standard quality service</p>
          </div>
          <div className="price">₹{normalPrice}</div>
        </div>
        <div className="service-option premium">
          <div className="service-info">
            <h4>Premium Service</h4>
            <p>Enhanced service with extras</p>
          </div>
          <div className="price">₹{premiumPrice}</div>
        </div>
      </div>

      <div className="card-actions">
        <button 
          className="btn btn-outline view-reviews"
          onClick={() => setShowReviews(true)}
        >
          <MessageSquare size={16} />
          View Reviews
        </button>
        <button 
          className="btn btn-secondary view-profile"
          onClick={() => {/* In a real app, this would open a detailed profile */}}
        >
          View Profile
        </button>
        <button 
          className="btn btn-primary book-now"
          onClick={() => onBook(professional)}
        >
          <Calendar size={18} />
          Book Now
        </button>
      </div>

      {showReviews && (
        <ProfessionalReviews
          professional={professional}
          reviews={reviewsData || []}
          onClose={() => setShowReviews(false)}
        />
      )}
    </div>
  );
}

export default ProfessionalCard;