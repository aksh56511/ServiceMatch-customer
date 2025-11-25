import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Star, MapPin, Clock, MessageCircle } from 'lucide-react';
import ProfessionalCard from './ProfessionalCard';
import FilterPanel from './FilterPanel';
import './ProfessionalList.css';

// Mock data for professionals
const mockProfessionals = [
  {
    id: 1,
    name: 'John Smith',
    profession: 'Plumber',
    experience: 5,
    rating: 4.9,
    reviews: 127,
    distance: 1.2,
    avatar: '👨‍🔧',
    normalPrice: 499,
    premiumPrice: 699, // Higher for urgent service
    availability: 'Available now',
    description: 'Expert plumber with 5+ years experience in residential and commercial plumbing.',
    skills: ['Pipe Repair', 'Drain Cleaning', 'Water Heater', 'Emergency Service'],
    reviewsData: [
      { id: 1, customer: 'Priya S.', rating: 5, comment: 'Excellent service! Fixed my kitchen sink quickly and professionally.', date: '2025-11-20' },
      { id: 2, customer: 'Raj K.', rating: 5, comment: 'Very punctual and knowledgeable. Highly recommended!', date: '2025-11-18' },
      { id: 3, customer: 'Anita M.', rating: 4, comment: 'Good work, but took longer than expected.', date: '2025-11-15' }
    ]
  },
  {
    id: 2,
    name: 'Mike Wilson',
    profession: 'Electrician',
    experience: 8,
    rating: 4.9,
    reviews: 156,
    distance: 2.1,
    avatar: '👨‍⚡',
    normalPrice: 499,
    premiumPrice: 649, // Distance-based premium
    availability: 'Available tomorrow',
    description: 'Licensed electrician specializing in home wiring, repairs, and electrical installations.',
    skills: ['Wiring', 'Electrical Repair', 'Installation', 'Safety Inspection'],
    reviewsData: [
      { id: 1, customer: 'Sunita R.', rating: 5, comment: 'Professional and efficient. Solved electrical issues safely.', date: '2025-11-22' },
      { id: 2, customer: 'Vikram P.', rating: 5, comment: 'Great experience! Very knowledgeable about electrical work.', date: '2025-11-19' },
      { id: 3, customer: 'Meera J.', rating: 4, comment: 'Satisfied with the service quality.', date: '2025-11-16' }
    ]
  },
  {
    id: 3,
    name: 'Lisa Anderson',
    profession: 'Carpenter',
    experience: 7,
    rating: 4.9,
    reviews: 112,
    distance: 2.5,
    avatar: '👩‍🔨',
    normalPrice: 499,
    premiumPrice: 699, // Distance-based premium
    availability: 'Available today',
    description: 'Skilled carpenter specializing in custom furniture and home improvements.',
    skills: ['Custom Furniture', 'Repairs', 'Installation', 'Restoration'],
    reviewsData: [
      { id: 1, customer: 'Amit B.', rating: 5, comment: 'Amazing craftsmanship! Built beautiful custom shelves.', date: '2025-11-21' },
      { id: 2, customer: 'Kavya T.', rating: 5, comment: 'Very creative and professional. Highly recommend!', date: '2025-11-17' },
      { id: 3, customer: 'Rohan D.', rating: 4, comment: 'Good quality work, delivered on time.', date: '2025-11-14' }
    ]
  },
  {
    id: 4,
    name: 'Sarah Johnson',
    profession: 'Plumber',
    experience: 3,
    rating: 4.8,
    reviews: 89,
    distance: 0.8,
    avatar: '👩‍🔧',
    normalPrice: 499,
    premiumPrice: 599, // Normal premium for close distance
    availability: 'Available in 2 hours',
    description: 'Professional plumber with expertise in pipe repairs and installations.',
    skills: ['Pipe Installation', 'Leak Repair', 'Bathroom Plumbing', 'Kitchen Plumbing'],
    reviewsData: [
      { id: 1, customer: 'Deepak L.', rating: 5, comment: 'Quick response and excellent service quality.', date: '2025-11-23' },
      { id: 2, customer: 'Sushma K.', rating: 4, comment: 'Solved the problem efficiently. Good service.', date: '2025-11-20' },
      { id: 3, customer: 'Arjun N.', rating: 5, comment: 'Very professional and courteous. Great work!', date: '2025-11-18' }
    ]
  },
  {
    id: 5,
    name: 'Robert Brown',
    profession: 'Electrician',
    experience: 6,
    rating: 4.8,
    reviews: 94,
    distance: 1.5,
    avatar: '👨‍⚡',
    normalPrice: 499,
    premiumPrice: 649, // Standard premium for moderate distance
    availability: 'Available in 1 hour',
    description: 'Residential electrician with focus on safety and quality installations.',
    skills: ['Home Wiring', 'Socket Installation', 'Light Fixtures', 'Circuit Breakers'],
    reviewsData: [
      { id: 1, customer: 'Ritu S.', rating: 5, comment: 'Excellent work! Fixed all electrical issues perfectly.', date: '2025-11-24' },
      { id: 2, customer: 'Manish G.', rating: 4, comment: 'Reliable and trustworthy. Good experience overall.', date: '2025-11-21' },
      { id: 3, customer: 'Pooja V.', rating: 5, comment: 'Very punctual and professional service.', date: '2025-11-19' }
    ]
  },
  {
    id: 6,
    name: 'David Miller',
    profession: 'Carpenter',
    experience: 4,
    rating: 4.7,
    reviews: 73,
    distance: 1.8,
    avatar: '👨‍🔨',
    normalPrice: 499,
    premiumPrice: 649, // Distance-based premium
    availability: 'Available now',
    description: 'Experienced carpenter specializing in woodwork and furniture repair.',
    skills: ['Furniture Repair', 'Wood Installation', 'Door Frames', 'Cabinet Work'],
    reviewsData: [
      { id: 1, customer: 'Neha A.', rating: 5, comment: 'Great craftsmanship! Repaired my dining table perfectly.', date: '2025-11-22' },
      { id: 2, customer: 'Kiran M.', rating: 4, comment: 'Satisfied with the repair work. Good value for money.', date: '2025-11-20' },
      { id: 3, customer: 'Arun P.', rating: 5, comment: 'Skilled carpenter with attention to detail.', date: '2025-11-17' }
    ]
  }
];

function ProfessionalList({ onBookProfessional, onOpenChat }) {
  const [professionals, setProfessionals] = useState(mockProfessionals);
  const [filteredProfessionals, setFilteredProfessionals] = useState(mockProfessionals);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    experience: '',
    priceRange: '',
    rating: '',
    distance: '',
    availability: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filters]);

  const applyFilters = () => {
    let filtered = professionals;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(prof => 
        prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prof.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prof.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Experience filter
    if (filters.experience) {
      const expRange = filters.experience;
      filtered = filtered.filter(prof => {
        if (expRange === '0-2') return prof.experience <= 2;
        if (expRange === '3-5') return prof.experience >= 3 && prof.experience <= 5;
        if (expRange === '6-10') return prof.experience >= 6 && prof.experience <= 10;
        if (expRange === '10+') return prof.experience > 10;
        return true;
      });
    }

    // Price range filter
    if (filters.priceRange) {
      // For this demo, all professionals have the same pricing structure
      // In a real app, this would filter based on actual price differences
    }

    // Rating filter
    if (filters.rating) {
      const minRating = parseFloat(filters.rating);
      filtered = filtered.filter(prof => prof.rating >= minRating);
    }

    // Distance filter
    if (filters.distance) {
      const maxDistance = parseFloat(filters.distance);
      filtered = filtered.filter(prof => prof.distance <= maxDistance);
    }

    // Availability filter
    if (filters.availability) {
      if (filters.availability === 'now') {
        filtered = filtered.filter(prof => prof.availability.includes('Available now'));
      }
    }

    setFilteredProfessionals(filtered);
  };

  const handleBookProfessional = (professional) => {
    onBookProfessional(professional);
    navigate('/booking');
  };

  const handleChatWithProfessional = (professional) => {
    onBookProfessional(professional); // Set selected professional for chat
    onOpenChat();
  };

  return (
    <div className="professional-list">
      <div className="container">
        <div className="page-header">
          <h1>Find Professionals</h1>
          <p>Browse and book verified service professionals in your area</p>
        </div>

        <div className="search-controls">
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search by name, profession, or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} />
            Filters
          </button>
        </div>

        {showFilters && (
          <FilterPanel 
            filters={filters}
            onFiltersChange={setFilters}
            onClose={() => setShowFilters(false)}
          />
        )}

        <div className="results-info">
          <p>{filteredProfessionals.length} professionals found</p>
        </div>

        <div className="professionals-grid">
          {filteredProfessionals.map(professional => (
            <ProfessionalCard
              key={professional.id}
              professional={professional}
              onBook={handleBookProfessional}
              onChat={handleChatWithProfessional}
            />
          ))}
        </div>

        {filteredProfessionals.length === 0 && (
          <div className="no-results">
            <h3>No professionals found</h3>
            <p>Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfessionalList;