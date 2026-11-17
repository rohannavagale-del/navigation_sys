import React from 'react';
import { Search, MapPin, BookOpen, Coffee, Dumbbell, Home, Sparkles, Building2, Compass, ArrowRight } from 'lucide-react';
import { AwardBadgeShowcase } from '../components/ui/award-badge-demo';

export default function HomePage({ onExploreMap, onOpenIndoor, searchQuery, setSearchQuery }) {
  const categories = [
    { title: 'Academic Buildings', count: 'Lecture halls & Labs', icon: <BookOpen size={24} />, name: 'Academic' },
    { title: 'Libraries & Study', count: 'Quiet reading & Tech', icon: <Search size={24} />, name: 'Library' },
    { title: 'Dining & Cafes', count: 'Food courts & Coffee', icon: <Coffee size={24} />, name: 'Dining' },
    { title: 'Sports & Fitness', count: 'Gyms, pool & courts', icon: <Dumbbell size={24} />, name: 'Sports' },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onExploreMap(searchQuery);
  };

  return (
    <div className="homepage">
      <section className="hero-section">
        <div className="hero-badge">
          <Sparkles size={16} />
          <span>MIT ADT University Pune • Loni Kalbhor</span>
        </div>
        <h1 className="hero-title">
          Explore MIT ADT Campus Buildings & <br />
          Find Locations Instantly
        </h1>
        <p className="hero-subtitle">
          Interactive real-time map for World Peace Dome, MIT ID, MANET, School of Engineering (SOE), Central Library, Food Court, and Rajbaug Hostels.
        </p>

        <div className="search-box-wrapper">
          <form onSubmit={handleSearchSubmit} className="search-input-group">
            <input 
              type="text" 
              placeholder="Search MIT ADT buildings (e.g. World Peace Dome, MIT ID, MANET, SOE)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <MapPin size={18} />
              <span>Explore Map</span>
            </button>
          </form>
        </div>

        {/* Feature Announcement: Internal Building Navigation */}
        <div className="indoor-feature-promo-card">
          <div className="promo-badge">
            <Building2 size={16} />
            <span>NEW: INDOOR NAVIGATION SYSTEM</span>
          </div>
          <div className="promo-content">
            <div className="promo-text">
              <h3>MIT-ADT Main Engineering & IT-Establishment Building</h3>
              <p>Explore 7 detailed floor plans (Ground Floor to 8th Floor). Navigate to Classrooms, Central Library, CRIYA Labs, Aerospace Rigs, and the Grand Auditorium with turn-by-turn hallway wayfinding.</p>
            </div>
            <button 
              className="promo-action-btn"
              onClick={() => onOpenIndoor && onOpenIndoor(0)}
            >
              <Compass size={18} />
              <span>Launch Indoor Navigation</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* 3D Award Badges Showcase */}
        <div style={{ marginTop: '2.5rem' }}>
          <AwardBadgeShowcase />
        </div>
      </section>

      <section style={{ padding: '0 2rem 3rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.5rem', color: '#94a3b8' }}>
          Quick Category Search
        </h2>
        <div className="category-grid">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className="category-card"
              onClick={() => onExploreMap('', cat.name)}
            >
              <div className="category-icon">
                {cat.icon}
              </div>
              <h3>{cat.title}</h3>
              <p>{cat.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Visual Academic Buildings Gallery */}
      <section style={{ padding: '0 2rem 5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ 
            fontSize: '0.8rem', 
            fontWeight: 700, 
            letterSpacing: '0.08em', 
            textTransform: 'uppercase', 
            color: '#2563eb',
            background: '#e0e7ff',
            padding: '0.3rem 0.8rem',
            borderRadius: '9999px',
            display: 'inline-block',
            marginBottom: '0.5rem'
          }}>
            Campus Architecture Directory
          </span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', margin: '0.25rem 0' }}>
            Academic Buildings Directory
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto' }}>
            Explore small pictures and details of every academic building across MIT ADT University Rajbaug Campus.
          </p>
        </div>

        <div className="building-gallery-grid">
          {[
            { name: "MANET Institute Building", code: "MANET-01", tag: "Marine Engineering", img: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=600&q=80" },
            { name: "Workshop 1 - Heavy Machinery", code: "WS-01", tag: "Mechanical Bay", img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80" },
            { name: "Workshop 2 - Carpentry & Foundry", code: "WS-02", tag: "Pattern Shop", img: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80" },
            { name: "Workshop 3 - Welding & Smithy", code: "WS-03", tag: "Fabrication Lab", img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80" },
            { name: "Workshop 4 - Automotive & EV", code: "WS-04", tag: "Electronics Bay", img: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=600&q=80" },
            { name: "Workshop 5 - Robotics & 3D Print", code: "WS-05", tag: "Mechatronics Lab", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80" },
            { name: "Ship in Campus Mockup", code: "MANET-SHIP", tag: "Navigation Deck", img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80" },
            { name: "SOE & Film & TV Studios", code: "SOE-FTII", tag: "Engineering & Media", img: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&w=600&q=80" },
            { name: "Vishwashanti Music Academy", code: "MUS-ACAD", tag: "Classical Performing", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80" },
            { name: "Art Gallery (AG)", code: "ART-GAL", tag: "Exhibitions & Fine Art", img: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80" },
            { name: "Engineering & IT Block – I", code: "EITB-01", tag: "School of Computing", img: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80" },
            { name: "Engineering & IT Block – II", code: "EITB-02", tag: "Cyber Security & IoT", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80" },
            { name: "Academic Building – I", code: "AB-01", tag: "Undergraduate Wing", img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80" },
            { name: "Academic Building – II", code: "AB-02", tag: "Postgraduate & Sciences", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80" },
            { name: "Academic Building – III & Aud.", code: "AB-03", tag: "500-Seat Auditorium", img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80" },
            { name: "Research Laboratory Building", code: "RES-LAB", tag: "Incubation Center", img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80" },
            { name: "School of Education", code: "SOE-EDU", tag: "Pedagogy Wing", img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80" },
            { name: "School of Vedic Science", code: "SVS-BLDG", tag: "IKS & Heritage", img: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80" },
            { name: "Raj Convocation Auditorium", code: "RAJ-AUD", tag: "Grand University Hall", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80" }
          ].map((bldg, idx) => (
            <div 
              key={idx} 
              className="building-gallery-card"
              onClick={() => onExploreMap(bldg.name, 'Academic')}
            >
              <div className="building-gallery-img-wrapper">
                <img src={bldg.img} alt={bldg.name} className="building-gallery-img" />
                <span className="building-gallery-badge">{bldg.code}</span>
              </div>
              <div className="building-gallery-info">
                <span className="building-gallery-tag">{bldg.tag}</span>
                <h3 className="building-gallery-title">{bldg.name}</h3>
                <div className="building-actions-row">
                  <span className="building-gallery-action">Locate on Map &rarr;</span>
                  {(bldg.code.includes('EITB') || bldg.code.includes('SOE')) && (
                    <button 
                      className="indoor-pill-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenIndoor && onOpenIndoor(0);
                      }}
                    >
                      <Building2 size={12} />
                      <span>Indoor Map</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
