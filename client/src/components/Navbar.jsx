import React from 'react';
import { MapPin, Home, User, Building2 } from 'lucide-react';
import mitLogo from '../assets/mit-logo.png';

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="navbar">
      <div className="brand" onClick={() => setActiveTab('home')}>
        <img src={mitLogo} alt="MIT-ADT University Logo" className="brand-logo" />
        <div className="brand-text">
          <span className="brand-title">MIT Art, Design and Technology University, Pune</span>
          <span className="brand-subtitle">Campus Navigation System</span>
        </div>
      </div>
      <div className="nav-links">
        <button 
          className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <Home size={18} />
          <span>Home</span>
        </button>
        <button 
          className={`nav-btn ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          <MapPin size={18} />
          <span>Campus Map</span>
        </button>
        <button 
          className={`nav-btn ${activeTab === 'indoor' ? 'active' : ''}`}
          onClick={() => setActiveTab('indoor')}
        >
          <Building2 size={18} />
          <span>Indoor Navigation</span>
        </button>
        <button 
          className={`nav-btn ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab('login')}
        >
          <User size={18} />
          <span>Login</span>
        </button>
      </div>
    </nav>
  );
}
