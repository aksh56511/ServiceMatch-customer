import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Menu, X, MessageCircle, FileText } from 'lucide-react';
import './Navbar.css';
import { useTranslation } from "react-i18next";

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { i18n, t } = useTranslation();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
    setMobileMenuOpen(false)};

  const changeLanguage = (lang) => { 
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            Fixora
          </Link>
        </div>

          {/* Language Switcher */}
          <div className="language-switcher">
            <button onClick={() => i18n.changeLanguage("en")} className="lang-btn">
              English 
              </button>
              <button onClick={() => i18n.changeLanguage("kn")} className="lang-btn"> 
              ಕನ್ನಡ
              </button>
              </div>
        
        {user && (
          <>
            <div className="navbar-menu">
              <Link to="/" className="nav-link">{t("home")}</Link>
              <Link to="/book-service" className="nav-link">{t("book_service")}</Link>
              <Link to="/professionals" className="nav-link">{t("find_professionals")}</Link>
              <Link to="/bookings" className="nav-link">{t("my_bookings")}</Link>
              <Link to="/report-problem" className="nav-link">
                <FileText size={16} />
                {t("report_problem")}
              </Link>
              <div className="user-menu">
                <User size={20} />
                <span>{user.name}</span>
                <button onClick={handleLogout} className="btn btn-secondary">
                  {t("logout")}
                </button>
              </div>
            </div>

            <button 
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {mobileMenuOpen && (
              <div className="mobile-menu">
                <Link to="/" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  {t("home")}
                </Link>
                <Link to="/book-service" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  {t("book_service")}
                </Link>
                <Link to="/professionals" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  {t("find_professionals")}
                </Link>
                <Link to="/bookings" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  {t("my_bookings")}
                </Link>
                <Link to="/report-problem" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  <FileText size={16} />
                  {t("report_problem")}
                </Link>
                <div className="mobile-user-info">
                  <span>{t("welcome")}, {user.name}</span>
                  <button onClick={handleLogout} className="btn btn-secondary">
                    {t("logout")}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;