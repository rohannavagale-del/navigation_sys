import React, { useState, useRef } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Layers, 
  Eye, 
  Navigation, 
  MapPin, 
  Compass, 
  Maximize2 
} from 'lucide-react';

export default function FloorPlanSvg({
  floor,
  rooms,
  selectedRoom,
  onSelectRoom,
  route,
  viewMode,
  setViewMode
}) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Category color mapper
  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'lab': return { bg: '#e0f2fe', border: '#0284c7', text: '#0369a1', badge: 'Lab' };
      case 'classroom': return { bg: '#ecfdf5', border: '#10b981', text: '#047857', badge: 'Class' };
      case 'office': return { bg: '#fef3c7', border: '#f59e0b', text: '#b45309', badge: 'Office' };
      case 'admin': return { bg: '#f3e8ff', border: '#a855f7', text: '#7e22ce', badge: 'Admin' };
      case 'library': return { bg: '#e0e7ff', border: '#6366f1', text: '#4338ca', badge: 'Library' };
      case 'auditorium': return { bg: '#fae8ff', border: '#d946ef', text: '#a21caf', badge: 'Auditorium' };
      case 'amenity': return { bg: '#fee2e2', border: '#ef4444', text: '#b91c1c', badge: 'Amenity' };
      default: return { bg: '#f1f5f9', border: '#64748b', text: '#334155', badge: 'Room' };
    }
  };

  // Build SVG path string from route waypoints
  const getRouteSvgPath = () => {
    if (!route || !route.waypoints || route.waypoints.length < 2) return '';
    // If cross floor, only show waypoints for this active floor
    let pts = route.waypoints;
    if (route.isCrossFloor) {
      if (route.startFloor === floor.id) {
        pts = route.stage1Waypoints || [];
      } else if (route.endFloor === floor.id) {
        pts = route.stage2Waypoints || [];
      } else {
        return '';
      }
    }
    if (pts.length < 2) return '';
    // SVG viewBox is 0 0 1000 600, scale x: 10, y: 6
    return pts.map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${pt.x * 10} ${pt.y * 6}`).join(' ');
  };

  return (
    <div className="floorplan-viewport-container">
      {/* Top Map Controls Bar */}
      <div className="floorplan-toolbar">
        <div className="floorplan-title-block">
          <span className="floorplan-badge">{floor.shortLabel}</span>
          <div>
            <h4 className="floorplan-name">{floor.name}</h4>
            <span className="floorplan-sub">{floor.subtitle}</span>
          </div>
        </div>

        <div className="floorplan-actions-group">
          {/* Mode Switcher */}
          <div className="view-mode-toggle">
            <button 
              className={`mode-btn ${viewMode === 'vector' ? 'active' : ''}`}
              onClick={() => setViewMode('vector')}
              title="Interactive Digital Blueprint"
            >
              <Layers size={15} />
              <span>Interactive Map</span>
            </button>
            <button 
              className={`mode-btn ${viewMode === 'blueprint' ? 'active' : ''}`}
              onClick={() => setViewMode('blueprint')}
              title="Official High-Resolution Floor Plan Photo"
            >
              <Eye size={15} />
              <span>Original Blueprint</span>
            </button>
          </div>

          {/* Zoom & Reset Controls */}
          <div className="zoom-controls">
            <button onClick={handleZoomIn} title="Zoom In" className="ctrl-btn"><ZoomIn size={16} /></button>
            <span className="zoom-indicator">{Math.round(zoomLevel * 100)}%</span>
            <button onClick={handleZoomOut} title="Zoom Out" className="ctrl-btn"><ZoomOut size={16} /></button>
            <button onClick={handleResetZoom} title="Reset View" className="ctrl-btn"><RotateCcw size={15} /></button>
          </div>
        </div>
      </div>

      {/* Interactive Map Canvas */}
      <div 
        ref={containerRef}
        className={`floorplan-canvas ${isDragging ? 'grabbing' : 'grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div 
          className="canvas-transform-wrapper"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomLevel})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.15s ease-out'
          }}
        >
          {viewMode === 'blueprint' ? (
            /* Mode 1: High-Res Original Photo Floorplan with Pins */
            <div className="blueprint-photo-wrapper">
              <img 
                src={floor.image} 
                alt={`${floor.label} Plan`} 
                className="blueprint-photo-img"
                draggable={false}
              />
              
              {/* Interactive Room Overlay Markers on Top of Photo */}
              <div className="blueprint-overlay-markers">
                {rooms.map(room => {
                  const isSelected = selectedRoom?.id === room.id;
                  const isStart = route?.startRoom?.id === room.id;
                  const isEnd = route?.endRoom?.id === room.id;
                  const style = getCategoryColor(room.category);

                  return (
                    <div 
                      key={room.id}
                      className={`blueprint-pin ${isSelected ? 'selected' : ''} ${isStart ? 'start-pin' : ''} ${isEnd ? 'end-pin' : ''}`}
                      style={{ 
                        left: `${room.x}%`, 
                        top: `${room.y}%`,
                        backgroundColor: isStart ? '#10b981' : isEnd ? '#ef4444' : isSelected ? '#2563eb' : style.border
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectRoom(room);
                      }}
                      title={`${room.code}: ${room.name}`}
                    >
                      <span className="pin-code">{room.code}</span>
                      {isSelected && (
                        <div className="pin-tooltip">
                          <strong>{room.code}</strong>: {room.name}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Mode 2: Interactive SVG Vector Architecture Floorplan */
            <div className="vector-blueprint-wrapper">
              <svg 
                viewBox="0 0 1000 600" 
                className="vector-blueprint-svg"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background Grid Pattern */}
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
                  </pattern>
                  <linearGradient id="corridorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f8fafc" />
                    <stop offset="100%" stopColor="#e2e8f0" />
                  </linearGradient>
                  <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1" />
                  </filter>
                </defs>

                <rect width="1000" height="600" fill="#f8fafc" />
                <rect width="1000" height="600" fill="url(#grid)" />

                {/* Building Outer Footprint Outline */}
                {/* South Wing, Central Atrium, and North Wing */}
                <path 
                  d="M 90 100 L 460 100 L 460 210 L 540 210 L 540 100 L 910 100 L 910 520 L 730 520 L 730 240 L 590 240 L 590 310 L 410 310 L 410 240 L 270 240 L 270 520 L 90 520 Z" 
                  fill="#ffffff" 
                  stroke="#94a3b8" 
                  strokeWidth="3" 
                  filter="url(#shadow)"
                />

                {/* Corridor Walkways (H-Layout) */}
                {/* Main Horizontal Central Corridor & Wing Corridors */}
                <path 
                  d="M 160 156 L 840 156 M 175 156 L 175 480 M 805 156 L 805 480 M 500 156 L 500 290" 
                  fill="none" 
                  stroke="#cbd5e1" 
                  strokeWidth="26" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                <path 
                  d="M 160 156 L 840 156 M 175 156 L 175 480 M 805 156 L 805 480 M 500 156 L 500 290" 
                  fill="none" 
                  stroke="#94a3b8" 
                  strokeWidth="1.5" 
                  strokeDasharray="4 4"
                />

                {/* Wing Labels */}
                <text x="140" y="300" fill="#94a3b8" fontSize="16" fontWeight="800" letterSpacing="4">SOUTH BLOCK</text>
                <text x="780" y="300" fill="#94a3b8" fontSize="16" fontWeight="800" letterSpacing="4">NORTH BLOCK</text>
                <text x="440" y="270" fill="#64748b" fontSize="13" fontWeight="700">CENTRAL ATRIUM</text>

                {/* Lifts & Stairs Core */}
                <g className="core-facilities">
                  {/* 1st Lift */}
                  <rect x="460" y="175" width="35" height="30" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
                  <text x="468" y="195" fill="#b91c1c" fontSize="11" fontWeight="700">🛗 L1</text>

                  {/* 2nd Lift */}
                  <rect x="545" y="175" width="35" height="30" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
                  <text x="553" y="195" fill="#b91c1c" fontSize="11" fontWeight="700">🛗 L2</text>

                  {/* Main Entrance Steps */}
                  <rect x="440" y="285" width="120" height="25" rx="3" fill="#f1f5f9" stroke="#64748b" strokeWidth="1" />
                  <text x="465" y="302" fill="#334155" fontSize="12" fontWeight="700">ENTRANCE</text>
                </g>

                {/* Interactive Rooms Rendered as Vector Tiles */}
                {rooms.map(room => {
                  const isSelected = selectedRoom?.id === room.id;
                  const isStart = route?.startRoom?.id === room.id;
                  const isEnd = route?.endRoom?.id === room.id;
                  const color = getCategoryColor(room.category);

                  // Scale room coordinates to 1000 x 600 svg space
                  const rw = 56;
                  const rh = 34;
                  const rx = room.x * 10 - rw / 2;
                  const ry = room.y * 6 - rh / 2;

                  return (
                    <g 
                      key={room.id}
                      className={`svg-room-node ${isSelected ? 'selected' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectRoom(room);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <rect 
                        x={rx} 
                        y={ry} 
                        width={rw} 
                        height={rh} 
                        rx="5"
                        fill={isSelected ? '#dbeafe' : isStart ? '#dcfce7' : isEnd ? '#fee2e2' : color.bg}
                        stroke={isSelected ? '#2563eb' : isStart ? '#10b981' : isEnd ? '#ef4444' : color.border}
                        strokeWidth={isSelected || isStart || isEnd ? '2.5' : '1.5'}
                        filter="url(#shadow)"
                      />
                      <text 
                        x={room.x * 10} 
                        y={ry + 15} 
                        textAnchor="middle" 
                        fill={color.text} 
                        fontSize="9.5" 
                        fontWeight="800"
                      >
                        {room.code}
                      </text>
                      <text 
                        x={room.x * 10} 
                        y={ry + 26} 
                        textAnchor="middle" 
                        fill="#334155" 
                        fontSize="6.8" 
                        fontWeight="600"
                      >
                        {room.name.length > 10 ? `${room.name.substring(0, 9)}..` : room.name}
                      </text>
                    </g>
                  );
                })}

                {/* Dynamic Animated Route Path */}
                {route && getRouteSvgPath() && (
                  <g className="route-layer">
                    {/* Shadow / Glow path */}
                    <path 
                      d={getRouteSvgPath()} 
                      fill="none" 
                      stroke="#3b82f6" 
                      strokeWidth="10" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      opacity="0.3"
                    />
                    {/* Pulsing main route line */}
                    <path 
                      d={getRouteSvgPath()} 
                      fill="none" 
                      stroke="#2563eb" 
                      strokeWidth="4.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="nav-animated-path"
                    />
                  </g>
                )}

                {/* Start & End Marker Pins on SVG */}
                {route?.startRoom && (
                  <g transform={`translate(${route.startRoom.x * 10}, ${route.startRoom.y * 6 - 8})`}>
                    <circle r="14" fill="#10b981" />
                    <circle r="6" fill="#ffffff" />
                    <text y="4" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900">A</text>
                  </g>
                )}

                {route?.endRoom && (
                  <g transform={`translate(${route.endRoom.x * 10}, ${route.endRoom.y * 6 - 8})`}>
                    <circle r="14" fill="#ef4444" />
                    <circle r="6" fill="#ffffff" />
                    <text y="4" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900">B</text>
                  </g>
                )}
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Category Legend */}
      <div className="floorplan-legend-bar">
        <div className="legend-item"><span className="legend-dot" style={{ background: '#0284c7' }}></span><span>Laboratories</span></div>
        <div className="legend-item"><span className="legend-dot" style={{ background: '#10b981' }}></span><span>Classrooms</span></div>
        <div className="legend-item"><span className="legend-dot" style={{ background: '#f59e0b' }}></span><span>Offices & Cabins</span></div>
        <div className="legend-item"><span className="legend-dot" style={{ background: '#a855f7' }}></span><span>Administration</span></div>
        <div className="legend-item"><span className="legend-dot" style={{ background: '#6366f1' }}></span><span>Library / Auditorium</span></div>
        <div className="legend-item"><span className="legend-dot" style={{ background: '#ef4444' }}></span><span>Lifts & Stairs</span></div>
      </div>
    </div>
  );
}
