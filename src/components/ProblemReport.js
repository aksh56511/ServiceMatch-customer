import React, { useState } from 'react';
import { Camera, Upload, X, MapPin, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import './ProblemReport.css';

function ProblemReport() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    urgency: 'normal',
    address: '',
    phone: ''
  });
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    { value: 'plumbing', label: 'Plumbing', emoji: '🔧' },
    { value: 'electrical', label: 'Electrical', emoji: '⚡' },
    { value: 'carpentry', label: 'Carpentry', emoji: '🔨' }
  ];

  const urgencyLevels = [
    { 
      value: 'normal', 
      label: 'Normal', 
      description: 'Can wait 1-2 days',
      price: '₹499',
      color: '#28a745'
    },
    { 
      value: 'urgent', 
      label: 'Urgent', 
      description: 'Need help today',
      price: '₹649',
      color: '#ffc107'
    },
    { 
      value: 'emergency', 
      label: 'Emergency', 
      description: 'Need immediate help',
      price: '₹799',
      color: '#dc3545'
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      if (file.type.startsWith('image/') && uploadedImages.length < 5) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedImages(prev => [
            ...prev,
            {
              id: Date.now() + Math.random(),
              file,
              url: e.target.result,
              name: file.name
            }
          ]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (imageId) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="problem-report">
        <div className="container">
          <div className="submission-success">
            <div className="success-icon">
              <CheckCircle size={48} />
            </div>
            <h2>Problem Report Submitted!</h2>
            <p>We've received your problem report and photos. Our professionals will review it and get back to you soon.</p>
            <div className="report-summary">
              <div className="summary-item">
                <strong>Problem:</strong> {formData.title}
              </div>
              <div className="summary-item">
                <strong>Category:</strong> {categories.find(c => c.value === formData.category)?.label}
              </div>
              <div className="summary-item">
                <strong>Urgency:</strong> {urgencyLevels.find(u => u.value === formData.urgency)?.label}
              </div>
              <div className="summary-item">
                <strong>Photos:</strong> {uploadedImages.length} uploaded
              </div>
            </div>
            <div className="next-steps">
              <h3>What's Next?</h3>
              <ul>
                <li>Our system will analyze your photos</li>
                <li>We'll match you with suitable professionals</li>
                <li>You'll receive quotes within 2-4 hours</li>
                <li>Choose your preferred professional and book</li>
              </ul>
            </div>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  title: '',
                  description: '',
                  category: '',
                  urgency: 'normal',
                  address: '',
                  phone: ''
                });
                setUploadedImages([]);
              }}
            >
              Report Another Problem
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="problem-report">
      <div className="container">
        <div className="page-header">
          <h1>Report a Problem</h1>
          <p>Upload photos and get instant help from verified professionals</p>
        </div>

        <form onSubmit={handleSubmit} className="report-form">
          <div className="form-section">
            <h3>Problem Details</h3>
            
            <div className="form-group">
              <label>Problem Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Briefly describe your problem (e.g., 'Kitchen sink is leaking')"
                required
                maxLength={100}
              />
            </div>

            <div className="form-group">
              <label>Category *</label>
              <div className="category-options">
                {categories.map(category => (
                  <label 
                    key={category.value} 
                    className={`category-option ${formData.category === category.value ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={category.value}
                      checked={formData.category === category.value}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      required
                    />
                    <span className="category-content">
                      <span className="category-emoji">{category.emoji}</span>
                      <span className="category-label">{category.label}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Detailed Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Provide more details about the problem, what you've tried, when it started, etc."
                rows={4}
                maxLength={500}
              />
              <div className="character-count">
                {formData.description.length}/500 characters
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Service Priority & Pricing</h3>
            <div className="urgency-options">
              {urgencyLevels.map(level => (
                <label 
                  key={level.value} 
                  className={`urgency-option ${formData.urgency === level.value ? 'selected' : ''}`}
                  style={{ '--urgency-color': level.color }}
                >
                  <input
                    type="radio"
                    name="urgency"
                    value={level.value}
                    checked={formData.urgency === level.value}
                    onChange={(e) => handleInputChange('urgency', e.target.value)}
                  />
                  <div className="urgency-content">
                    <div className="urgency-header">
                      <span className="urgency-label">{level.label}</span>
                      <span className="urgency-price">{level.price}</span>
                    </div>
                    <div className="urgency-description">{level.description}</div>
                  </div>
                </label>
              ))}
            </div>
            <div className="pricing-note">
              <AlertCircle size={16} />
              <span>Premium charges apply for urgent/emergency services and long distances ({'>'}2km)</span>
            </div>
          </div>

          <div className="form-section">
            <h3>Upload Problem Photos</h3>
            <p className="upload-description">
              Upload clear photos of the problem area. This helps professionals understand the issue better.
            </p>
            
            <div className="image-upload-area">
              <div className="upload-zone">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="file-input"
                  id="image-upload"
                  disabled={uploadedImages.length >= 5}
                />
                <label htmlFor="image-upload" className="upload-label">
                  <Camera size={32} />
                  <span>Click to upload photos</span>
                  <span className="upload-hint">or drag and drop images here</span>
                  <span className="upload-limit">Maximum 5 images (JPG, PNG)</span>
                </label>
              </div>

              {uploadedImages.length > 0 && (
                <div className="uploaded-images">
                  {uploadedImages.map(image => (
                    <div key={image.id} className="image-preview">
                      <img src={image.url} alt={image.name} />
                      <button 
                        type="button"
                        className="remove-image"
                        onClick={() => removeImage(image.id)}
                      >
                        <X size={16} />
                      </button>
                      <div className="image-name">{image.name}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-section">
            <h3>Location & Contact</h3>
            
            <div className="form-group">
              <label>Service Address *</label>
              <textarea
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter complete address where service is needed"
                required
                rows={2}
              />
            </div>

            <div className="form-group">
              <label>Contact Phone *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Your phone number"
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-primary submit-btn"
              disabled={isSubmitting || !formData.title || !formData.category || !formData.address || !formData.phone}
            >
              {isSubmitting ? (
                <>
                  <div className="loading-spinner"></div>
                  Submitting Report...
                </>
              ) : (
                <>
                  <Upload size={20} />
                  Submit Problem Report
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProblemReport;