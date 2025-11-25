import React from 'react';
import { X, Star, MapPin, Clock } from 'lucide-react';
import './FilterPanel.css';

function FilterPanel({ filters, onFiltersChange, onClose }) {
  const handleFilterChange = (filterType, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    onFiltersChange({
      experience: '',
      priceRange: '',
      rating: '',
      distance: '',
      availability: ''
    });
  };

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>Filters</h3>
        <div className="filter-actions">
          <button className="clear-filters" onClick={clearFilters}>
            Clear All
          </button>
          <button className="close-filters" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="filter-content">
        <div className="filter-section">
          <label className="filter-label">
            <Clock size={16} />
            Experience Level
          </label>
          <div className="filter-options">
            <label className="filter-option">
              <input
                type="radio"
                name="experience"
                value="0-2"
                checked={filters.experience === '0-2'}
                onChange={(e) => handleFilterChange('experience', e.target.value)}
              />
              <span>0-2 years</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="experience"
                value="3-5"
                checked={filters.experience === '3-5'}
                onChange={(e) => handleFilterChange('experience', e.target.value)}
              />
              <span>3-5 years</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="experience"
                value="6-10"
                checked={filters.experience === '6-10'}
                onChange={(e) => handleFilterChange('experience', e.target.value)}
              />
              <span>6-10 years</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="experience"
                value="10+"
                checked={filters.experience === '10+'}
                onChange={(e) => handleFilterChange('experience', e.target.value)}
              />
              <span>10+ years</span>
            </label>
          </div>
        </div>

        <div className="filter-section">
          <label className="filter-label">
            💰 Price Range
          </label>
          <div className="filter-options">
            <label className="filter-option">
              <input
                type="radio"
                name="priceRange"
                value="normal"
                checked={filters.priceRange === 'normal'}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              />
              <span>Normal Service (₹499)</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="priceRange"
                value="premium"
                checked={filters.priceRange === 'premium'}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              />
              <span>Premium Service (₹599)</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="priceRange"
                value="both"
                checked={filters.priceRange === 'both'}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              />
              <span>Both Options Available</span>
            </label>
          </div>
        </div>

        <div className="filter-section">
          <label className="filter-label">
            <Star size={16} />
            Minimum Rating
          </label>
          <div className="filter-options">
            <label className="filter-option">
              <input
                type="radio"
                name="rating"
                value="4.0"
                checked={filters.rating === '4.0'}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
              />
              <span>4.0+ ⭐</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="rating"
                value="4.5"
                checked={filters.rating === '4.5'}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
              />
              <span>4.5+ ⭐</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="rating"
                value="4.8"
                checked={filters.rating === '4.8'}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
              />
              <span>4.8+ ⭐</span>
            </label>
          </div>
        </div>

        <div className="filter-section">
          <label className="filter-label">
            <MapPin size={16} />
            Distance
          </label>
          <div className="filter-options">
            <label className="filter-option">
              <input
                type="radio"
                name="distance"
                value="1"
                checked={filters.distance === '1'}
                onChange={(e) => handleFilterChange('distance', e.target.value)}
              />
              <span>Within 1 km</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="distance"
                value="2"
                checked={filters.distance === '2'}
                onChange={(e) => handleFilterChange('distance', e.target.value)}
              />
              <span>Within 2 km</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="distance"
                value="5"
                checked={filters.distance === '5'}
                onChange={(e) => handleFilterChange('distance', e.target.value)}
              />
              <span>Within 5 km</span>
            </label>
          </div>
        </div>

        <div className="filter-section">
          <label className="filter-label">
            <Clock size={16} />
            Availability
          </label>
          <div className="filter-options">
            <label className="filter-option">
              <input
                type="radio"
                name="availability"
                value="now"
                checked={filters.availability === 'now'}
                onChange={(e) => handleFilterChange('availability', e.target.value)}
              />
              <span>Available Now</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="availability"
                value="today"
                checked={filters.availability === 'today'}
                onChange={(e) => handleFilterChange('availability', e.target.value)}
              />
              <span>Available Today</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;