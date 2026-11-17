import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import LoginPage from './pages/LoginPage';
import IndoorNavPage from './pages/IndoorNavPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [indoorFloor, setIndoorFloor] = useState(0);
  const [indoorRoom, setIndoorRoom] = useState(null);

  const handleExploreMap = (query = '', category = 'All') => {
    setSearchQuery(query);
    setSelectedCategory(category);
    setActiveTab('map');
  };

  const handleOpenIndoor = (floor = 0, roomId = null) => {
    setIndoorFloor(floor);
    setIndoorRoom(roomId);
    setActiveTab('indoor');
  };

  if (activeTab === 'login') {
    return <LoginPage onGoHome={() => setActiveTab('home')} />;
  }

  return (
    <div className="app-container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main style={{ flex: 1 }}>
        {activeTab === 'home' && (
          <HomePage 
            onExploreMap={handleExploreMap} 
            onOpenIndoor={handleOpenIndoor}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
        {activeTab === 'map' && (
          <MapPage 
            initialSearch={searchQuery}
            initialCategory={selectedCategory}
            onOpenIndoor={handleOpenIndoor}
          />
        )}
        {activeTab === 'indoor' && (
          <IndoorNavPage 
            onGoHome={() => setActiveTab('home')}
            initialFloor={indoorFloor}
            initialRoomId={indoorRoom}
          />
        )}
      </main>
    </div>
  );
}
