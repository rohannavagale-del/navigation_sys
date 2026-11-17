import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Compass, 
  Navigation, 
  Search, 
  MapPin, 
  ArrowRight, 
  ArrowLeftRight, 
  CornerDownRight, 
  Info, 
  SlidersHorizontal, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Layers, 
  RotateCcw,
  Footprints,
  Clock,
  ChevronRight
} from 'lucide-react';
import { FLOORS, ALL_ROOMS, calculateIndoorPath } from '../data/indoorFloorData';
import FloorPlanSvg from '../components/FloorPlanSvg';

export default function IndoorNavPage({ onGoHome, initialFloor = 0, initialRoomId = null }) {
  const [activeFloorId, setActiveFloorId] = useState(initialFloor);
  const [viewMode, setViewMode] = useState('vector'); // 'vector' or 'blueprint'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Navigation Route State
  const [startRoomId, setStartRoomId] = useState('GF-MAIN-ENTRANCE');
  const [endRoomId, setEndRoomId] = useState(initialRoomId || '3F-N314');
  const [activeRoute, setActiveRoute] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(
    initialRoomId ? ALL_ROOMS.find(r => r.id === initialRoomId) : null
  );

  // Active Floor Object
  const currentFloor = useMemo(() => {
    return FLOORS.find(f => f.id === activeFloorId) || FLOORS[0];
  }, [activeFloorId]);

  // Rooms on Current Floor
  const roomsOnCurrentFloor = useMemo(() => {
    return ALL_ROOMS.filter(r => r.floor === activeFloorId);
  }, [activeFloorId]);

  // Filtered Rooms based on search query and category
  const filteredRooms = useMemo(() => {
    return ALL_ROOMS.filter(room => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = !q || 
        room.code.toLowerCase().includes(q) ||
        room.name.toLowerCase().includes(q) ||
        room.dept.toLowerCase().includes(q) ||
        room.description.toLowerCase().includes(q);

      const matchesCategory = selectedCategory === 'All' || 
        (selectedCategory === 'lab' && room.category === 'lab') ||
        (selectedCategory === 'classroom' && room.category === 'classroom') ||
        (selectedCategory === 'office' && (room.category === 'office' || room.category === 'admin')) ||
        (selectedCategory === 'library' && (room.category === 'library' || room.category === 'auditorium')) ||
        (selectedCategory === 'amenity' && room.category === 'amenity');

      return matchesQuery && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Calculate Navigation Route
  const handleCalculateRoute = () => {
    if (!startRoomId || !endRoomId || startRoomId === endRoomId) return;
    const route = calculateIndoorPath(startRoomId, endRoomId);
    setActiveRoute(route);
    
    // Automatically switch floor to start floor
    const startRoom = ALL_ROOMS.find(r => r.id === startRoomId);
    if (startRoom && startRoom.floor !== activeFloorId) {
      setActiveFloorId(startRoom.floor);
    }
  };

  // Swap Start & Destination
  const handleSwapLocations = () => {
    const temp = startRoomId;
    setStartRoomId(endRoomId);
    setEndRoomId(temp);
    if (activeRoute) {
      const reversedRoute = calculateIndoorPath(endRoomId, temp);
      setActiveRoute(reversedRoute);
    }
  };

  // Handle Room Selection from map or search
  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
    if (room.floor !== activeFloorId) {
      setActiveFloorId(room.floor);
    }
  };

  // Quick Action: Navigate Here
  const handleNavigateToRoom = (room) => {
    setEndRoomId(room.id);
    const route = calculateIndoorPath(startRoomId, room.id);
    setActiveRoute(route);
    if (room.floor !== activeFloorId) {
      setActiveFloorId(room.floor);
    }
  };

  return (
    <div className="indoor-nav-container">
      {/* Top Header Banner */}
      <div className="indoor-header-banner">
        <div className="indoor-brand">
          <div className="indoor-icon-box">
            <Building2 size={24} />
          </div>
          <div>
            <h2 className="indoor-title">MIT School of Engineering & IT-Establishment</h2>
            <p className="indoor-subtitle">Multi-Floor Internal Wayfinding & Architectural Blueprint Navigator</p>
          </div>
        </div>

        <div className="indoor-header-right">
          <div className="building-quick-stat">
            <span className="stat-pill">7 Floors Mapped</span>
            <span className="stat-pill">120+ Rooms & Labs</span>
            <span className="stat-pill highlight">Turn-by-Turn GPS</span>
          </div>
        </div>
      </div>

      {/* Horizontal Floor Selector Bar */}
      <div className="floor-selector-bar">
        <span className="floor-bar-label">SELECT FLOOR:</span>
        <div className="floor-tabs-scroll">
          {FLOORS.map(fl => {
            const isActive = fl.id === activeFloorId;
            const hasStart = activeRoute?.startRoom?.floor === fl.id;
            const hasEnd = activeRoute?.endRoom?.floor === fl.id;

            return (
              <button
                key={fl.id}
                className={`floor-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveFloorId(fl.id)}
              >
                <span className="floor-badge-pill">{fl.shortLabel}</span>
                <div className="floor-tab-info">
                  <span className="floor-tab-title">{fl.label}</span>
                  <span className="floor-tab-desc">{fl.keyLocations[0]}</span>
                </div>
                {hasStart && <span className="route-indicator-dot start" title="Route Starts Here" />}
                {hasEnd && <span className="route-indicator-dot end" title="Destination Floor" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace Layout (Sidebar + Floorplan Canvas) */}
      <div className="indoor-main-layout">
        {/* Left Control Panel / Route Planner */}
        <aside className="indoor-sidebar">
          {/* Section 1: Route Finder Box */}
          <div className="nav-planner-card">
            <div className="card-header-row">
              <div className="flex-row items-center gap-2">
                <Navigation size={18} className="text-blue-600" />
                <h3 className="section-title">Indoor Route Planner</h3>
              </div>
              {activeRoute && (
                <button 
                  className="clear-route-link"
                  onClick={() => setActiveRoute(null)}
                >
                  Clear Route
                </button>
              )}
            </div>

            <div className="route-inputs-group">
              {/* Start Point */}
              <div className="route-input-row">
                <div className="point-indicator start-dot">A</div>
                <div className="route-select-wrapper">
                  <label>Start Location</label>
                  <select 
                    value={startRoomId}
                    onChange={(e) => setStartRoomId(e.target.value)}
                    className="nav-select-box"
                  >
                    <optgroup label="Ground Floor Entrances">
                      <option value="GF-MAIN-ENTRANCE">Main Building Entrance Portico (GF)</option>
                      <option value="GF-WELCOME-LOUNGE">Welcomes Lounge Main Lobby (GF)</option>
                      <option value="GF-LIFT-1">1st Lift (South Corridor)</option>
                      <option value="GF-LIFT-2">2nd Lift (North Corridor)</option>
                    </optgroup>
                    <optgroup label="Popular Labs & Destinations">
                      {ALL_ROOMS.map(r => (
                        <option key={r.id} value={r.id}>
                          Floor {r.floor === 0 ? 'GF' : r.floor} • {r.code} - {r.name}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>

              {/* Swap Button */}
              <div className="swap-button-row">
                <button 
                  className="swap-btn"
                  onClick={handleSwapLocations}
                  title="Swap Start and Destination"
                >
                  <ArrowLeftRight size={14} />
                </button>
              </div>

              {/* Destination Point */}
              <div className="route-input-row">
                <div className="point-indicator end-dot">B</div>
                <div className="route-select-wrapper">
                  <label>Destination</label>
                  <select 
                    value={endRoomId}
                    onChange={(e) => setEndRoomId(e.target.value)}
                    className="nav-select-box"
                  >
                    <optgroup label="Key Campus Destinations">
                      <option value="3F-N314">3rd Floor • N-314 - Central Engineering Library</option>
                      <option value="3F-N319">3rd Floor • N-319 - Large Study & Reading Hall</option>
                      <option value="7F-AUDITORIUM">7th Floor • AUD-01 - Grand Campus Auditorium</option>
                      <option value="4F-N419">4th Floor • N-419 - Robotics Laboratory</option>
                      <option value="4F-N404">4th Floor • N-404 - Aircraft Propulsion Lab</option>
                      <option value="2F-N214">2nd Floor • N-214 - CAD/CAM Laboratory</option>
                      <option value="3F-BOARD-ROOM">3rd Floor • Board Meeting & Conference Hall</option>
                      <option value="GF-S004">Ground Floor • S-004 - Central Admission Office</option>
                      <option value="8F-OPEN-TERRACE">8th Floor • Open Rooftop Terrace</option>
                    </optgroup>
                    <optgroup label="All Classrooms & Facilities">
                      {ALL_ROOMS.map(r => (
                        <option key={r.id} value={r.id}>
                          Floor {r.floor === 0 ? 'GF' : r.floor} • {r.code} - {r.name}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>

              <button 
                className="calculate-route-btn"
                onClick={handleCalculateRoute}
              >
                <Compass size={16} />
                <span>Calculate Indoor Route</span>
              </button>
            </div>

            {/* Active Route Details & Turn-by-Turn Card */}
            {activeRoute && (
              <div className="route-summary-panel">
                <div className="route-metrics-bar">
                  <div className="metric-box">
                    <Footprints size={15} />
                    <span>~{activeRoute.distanceEstimatedMeters} meters</span>
                  </div>
                  <div className="metric-box">
                    <Clock size={15} />
                    <span>~{Math.ceil(activeRoute.durationSeconds / 60)} min walk</span>
                  </div>
                  <div className="metric-box highlight">
                    <span>{activeRoute.isCrossFloor ? 'Elevator Transfer' : 'Direct Corridor'}</span>
                  </div>
                </div>

                {/* Multi-floor Elevator Transfer Alert */}
                {activeRoute.isCrossFloor && (
                  <div className="elevator-transfer-banner">
                    <div className="transfer-icon">🛗</div>
                    <div className="transfer-details">
                      <strong>Multi-Floor Route:</strong> Take Lift from{' '}
                      <b>Floor {activeRoute.startFloor === 0 ? 'GF' : activeRoute.startFloor}</b> to{' '}
                      <b>Floor {activeRoute.endFloor === 0 ? 'GF' : activeRoute.endFloor}</b>.
                      <button 
                        className="floor-jump-btn"
                        onClick={() => setActiveFloorId(activeRoute.endFloor)}
                      >
                        Switch to Floor {activeRoute.endFloor === 0 ? 'GF' : activeRoute.endFloor} View
                      </button>
                    </div>
                  </div>
                )}

                {/* Step-by-Step Directions List */}
                <div className="turn-instructions-list">
                  <h4 className="turn-list-title">Turn-by-Turn Hallway Guidance:</h4>
                  {activeRoute.instructions.map((step, idx) => (
                    <div key={idx} className="turn-step-item">
                      <span className="step-number">{idx + 1}</span>
                      <p className="step-text">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Room Search & Directory Filter */}
          <div className="room-directory-card">
            <h3 className="section-title">Directory & Search</h3>
            <div className="search-input-pill">
              <Search size={15} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search Room, Lab, Library, HOD..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="clear-btn" onClick={() => setSearchQuery('')}>×</button>
              )}
            </div>

            {/* Category Pills */}
            <div className="category-chips-row">
              {['All', 'lab', 'classroom', 'office', 'library', 'amenity'].map(cat => (
                <button
                  key={cat}
                  className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat === 'All' ? 'All' : cat === 'lab' ? 'Labs' : cat === 'classroom' ? 'Classes' : cat === 'office' ? 'Offices' : cat === 'library' ? 'Library' : 'Amenities'}
                </button>
              ))}
            </div>

            {/* Room List on Active Floor */}
            <div className="rooms-scroll-list">
              <span className="list-counter">
                Showing {filteredRooms.filter(r => r.floor === activeFloorId).length} locations on {currentFloor.shortLabel}:
              </span>
              {filteredRooms.filter(r => r.floor === activeFloorId).map(room => {
                const isSelected = selectedRoom?.id === room.id;
                return (
                  <div 
                    key={room.id}
                    className={`room-item-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectRoom(room)}
                  >
                    <div className="room-item-header">
                      <span className="room-code-tag">{room.code}</span>
                      <span className="room-block-tag">{room.block}</span>
                    </div>
                    <h5 className="room-item-name">{room.name}</h5>
                    <p className="room-item-dept">{room.dept}</p>
                    
                    <div className="room-quick-actions">
                      <button 
                        className="quick-route-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNavigateToRoom(room);
                        }}
                      >
                        <Compass size={12} />
                        <span>Route Here</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right Section: Interactive Floorplan Canvas & Detail Card */}
        <section className="indoor-canvas-section">
          <FloorPlanSvg 
            floor={currentFloor}
            rooms={roomsOnCurrentFloor}
            selectedRoom={selectedRoom}
            onSelectRoom={handleSelectRoom}
            route={activeRoute}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />

          {/* Selected Room Detail Floating Card */}
          {selectedRoom && (
            <div className="selected-room-drawer">
              <div className="drawer-header">
                <div>
                  <span className="drawer-badge">{selectedRoom.code} • Floor {selectedRoom.floor === 0 ? 'GF' : selectedRoom.floor}</span>
                  <h3 className="drawer-title">{selectedRoom.name}</h3>
                  <span className="drawer-dept">{selectedRoom.dept} • {selectedRoom.block}</span>
                </div>
                <button 
                  className="drawer-close-btn"
                  onClick={() => setSelectedRoom(null)}
                >
                  ×
                </button>
              </div>

              <p className="drawer-description">{selectedRoom.description}</p>

              <div className="drawer-actions">
                <button 
                  className="drawer-primary-btn"
                  onClick={() => handleNavigateToRoom(selectedRoom)}
                >
                  <Navigation size={16} />
                  <span>Navigate To This Room</span>
                </button>
                <button 
                  className="drawer-secondary-btn"
                  onClick={() => setStartRoomId(selectedRoom.id)}
                >
                  <MapPin size={16} />
                  <span>Set as Start Point</span>
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
