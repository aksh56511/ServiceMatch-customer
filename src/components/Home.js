import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Clock, MapPin, Users } from 'lucide-react';
import './Home.css';

function Home() {
  const stats = [
    { icon: Users, label: 'Verified Professionals', value: '500+' },
    { icon: Star, label: 'Average Rating', value: '4.8' },
    { icon: Clock, label: 'Avg Response Time', value: '15 min' },
    { icon: MapPin, label: 'Cities Covered', value: '25+' }
  ];

  const popularServices = [
    { name: 'Plumbing', image: '🔧', bookings: '1,200+ bookings' },
    { name: 'Electrician', image: '⚡', bookings: '950+ bookings' },
    { name: 'Carpentry', image: '🔨', bookings: '750+ bookings' }
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Book Trusted Professionals Near You</h1>
            <p>
              Get instant access to verified service professionals in your area. 
              From home cleaning to repairs, we've got you covered with quality service at transparent pricing.
            </p>
            <div className="hero-actions">
              <Link to="/professionals" className="btn btn-primary hero-btn">
                <Search size={20} />
                Find Professionals
              </Link>
              <Link to="/bookings" className="btn btn-secondary hero-btn">
                📋 My Bookings
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-graphic">
              <div className="service-card demo">
                <div className="service-header">
                  <div className="professional-avatar">👨‍🔧</div>
                  <div className="professional-info">
                    <h4>John Smith</h4>
                    <p>Plumber • 5 years exp</p>
                  </div>
                </div>
                <div className="service-details">
                  <div className="rating">
                    <Star size={16} fill="currentColor" />
                    <span>4.9</span>
                  </div>
                  <div className="distance">📍 1.2 km away</div>
                </div>
                <div className="pricing">
                  <span className="price">₹499</span>
                  <span className="service-type">Normal Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <stat.icon size={24} className="stat-icon" />
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="popular-services">
        <div className="container">
          <div className="section-header">
            <h2>Popular Services</h2>
            <p>Most booked services in your area</p>
          </div>
          <div className="services-grid">
            {popularServices.map((service, index) => (
              <div key={index} className="service-item">
                <div className="service-icon">{service.image}</div>
                <h3>{service.name}</h3>
                <p>{service.bookings}</p>
              </div>
            ))}
          </div>
          <div className="services-footer">
            <Link to="/professionals" className="btn btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Book professional services in 3 simple steps</p>
          </div>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Choose Service</h3>
              <p>Browse and select from our wide range of professional services</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Pick Professional</h3>
              <p>Review profiles, ratings, and choose the best professional for your needs</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Book & Relax</h3>
              <p>Schedule your service and let our verified professionals handle the rest</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;