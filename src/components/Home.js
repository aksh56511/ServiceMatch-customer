import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Clock, MapPin, Users } from 'lucide-react';
import './Home.css';
import { useTranslation } from "react-i18next";

function Home() {
  const stats = [
    { icon: Users, labelKey: "verified_professionals", value: '500+' },
    { icon: Star, labelKey: "average_rating", value: '4.8' },
    { icon: Clock, labelKey: "avg_response_time", value: '15 min' },
    { icon: MapPin, labelKey: "cities_covered", value: '25+' }
  ];

  const popularServices = [
    { nameKey: "plumbing", image: '🔧', bookingsKey: "plumbing_bookings" },
    { nameKey: "electrician", image: '⚡', bookingsKey: "electrician_bookings" },
    { nameKey: "carpentry", image: '🔨', bookingsKey: "carpentry_bookings" }
  ];

  const { t } = useTranslation();

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>{t("home_hero_title")}</h1>
            <p>
              {t("home_hero_description")}
            </p>
            <div className="hero-actions">
              <Link to="/professionals" className="btn btn-primary hero-btn">
                <Search size={20} />
                {t("find_professionals")}
              </Link>
              <Link to="/bookings" className="btn btn-secondary hero-btn">
                📋 {t("my_bookings")}
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
                  <div className="stat-label">{t(stat.labelKey)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="popular-services">
        <div className="container">
          <div className="section-header">
            <h2>{t("popular_services")}</h2>
            <p>{t("popular_services_description")}</p>
          </div>
          <div className="services-grid">
            {popularServices.map((service, index) => (
              <div key={index} className="service-item">
                <div className="service-icon">{service.image}</div>
                <h3>{t(service.nameKey)}</h3>
                <p>{t(service.bookingsKey)}</p>
              </div>
            ))}
          </div>
          <div className="services-footer">
            <Link to="/professionals" className="btn btn-primary">
              {t("view_all_services")}
            </Link>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>{t("how_it_works")}</h2>
            <p>{t("how_it_works_description")}</p>
          </div>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <h3>{t("choose_service")}</h3>
              <p>{t("choose_service_description")}</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>{t("pick_professional")}</h3>
              <p>{t("pick_professional_description")}</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>{t("book_relax")}</h3>
              <p>{t("book_relax_description")}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;