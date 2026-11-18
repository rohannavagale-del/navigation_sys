import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import { 
  Search, MapPin, Layers, Info, Navigation, Clock, Video, Compass, 
  Crosshair, Share2, Heart, Phone, ArrowRight, X, Footprints, Bike, 
  Car, Check, Star, RotateCcw, ExternalLink, Building2
} from 'lucide-react';
import MetroHero from '../components/ui/scroll-locked-video-hero';

// Map view switcher helper
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { duration: 1.2 });
    }
  }, [center, zoom, map]);
  return null;
}

// Custom Leaflet Pin Icon
const createCustomIcon = (category, isSelected = false) => {
  let color = '#1e1452'; // Navy Primary
  if (category === 'Academic') color = '#2563eb'; // Vibrant Royal Blue
  if (category === 'Library') color = '#0284c7'; // Sky Slate Blue
  if (category === 'Dining') color = '#ea580c'; // Warm Orange
  if (category === 'Sports') color = '#16a34a'; // Emerald Green
  if (category === 'Hostel') color = '#9333ea'; // Purple
  if (category === 'Administrative') color = '#dc2626'; // Red Accent

  const size = isSelected ? 40 : 32;

  return L.divIcon({
    className: 'custom-pin-google',
    html: `<div style="
      background: ${color};
      width: ${size}px;
      height: ${size}px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 6px 18px rgba(0,0,0,0.35);
      border: ${isSelected ? '3px solid #ffffff' : '2px solid #ffffff'};
      transition: all 0.25s ease;
    ">
      <div style="
        width: ${size / 3}px;
        height: ${size / 3}px;
        background: white;
        border-radius: 50%;
      "></div>
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size]
  });
};

const DEFAULT_LOCATIONS = [
  {
    name: "MIT ADT Campus Main Entrance Gate",
    code: "GATE-MAIN",
    category: "Administrative",
    description: "Grand ornamental main entrance gate and security checkpoint of MIT ADT University Rajbaug Campus, Solapur Road.",
    lat: 18.4945,
    lng: 74.0292,
    openingHours: "Open 24/7 (Security Booth)",
    floorCount: 1,
    phone: "+91 20 2691 2900",
    facilities: ["Security Post", "Visitor Registration", "Vehicle Tag Verification", "Campus Information Kiosk"],
    image: "/buildings/mit_campus_gate.jpg"
  },
  {
    name: "MANET Institute Building",
    code: "MANET-01",
    category: "Academic",
    description: "Premier marine engineering college building with ship engine simulator, parade grounds, and naval training labs.",
    lat: 18.4932,
    lng: 74.0282,
    openingHours: "6:00 AM - 7:00 PM",
    floorCount: 4,
    phone: "+91 20 2691 2901",
    facilities: ["Ship Engine Simulator", "Naval Labs", "Parade Grounds", "Mess"],
    image: "/buildings/manet_building.jpg"
  },
  {
    name: "Workshop – 1",
    code: "WS-01",
    category: "Academic",
    description: "Central Mechanical & Manufacturing Engineering Workshop 1 housing heavy machinery, lathes, and CNC tools.",
    lat: 18.4915,
    lng: 74.0275,
    openingHours: "8:00 AM - 6:00 PM",
    floorCount: 2,
    phone: "+91 20 2691 2902",
    facilities: ["Lathe Machines", "Fitting Shop", "CNC Milling", "Safety Bay"],
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Workshop – 2",
    code: "WS-02",
    category: "Academic",
    description: "Carpentry, Pattern Making, and Foundry Engineering Workshop 2 for hands-on fabrication.",
    lat: 18.4917,
    lng: 74.0278,
    openingHours: "8:00 AM - 6:00 PM",
    floorCount: 2,
    phone: "+91 20 2691 2903",
    facilities: ["Carpentry Bay", "Foundry", "Pattern Shop", "Material Testing"],
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Workshop – 3",
    code: "WS-03",
    category: "Academic",
    description: "Welding, Sheet Metal, and Smithy Workshop 3 equipped for advanced metal forming research.",
    lat: 18.4919,
    lng: 74.0280,
    openingHours: "8:00 AM - 6:00 PM",
    floorCount: 2,
    phone: "+91 20 2691 2904",
    facilities: ["Arc & TIG Welding", "Sheet Metal Tools", "Forging Hearth", "Exhaust Systems"],
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Workshop – 4",
    code: "WS-04",
    category: "Academic",
    description: "Electrical, Electronics & Automobile Maintenance Workshop 4 for automotive assembly & wiring labs.",
    lat: 18.4921,
    lng: 74.0283,
    openingHours: "8:00 AM - 6:00 PM",
    floorCount: 2,
    phone: "+91 20 2691 2905",
    facilities: ["Automobile Racks", "Engine Test Rigs", "EV Battery Station", "Diagnostics"],
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Workshop – 5",
    code: "WS-05",
    category: "Academic",
    description: "Advanced Robotics, Mechatronics & Rapid Prototyping Workshop 5 featuring 3D printers and laser cutters.",
    lat: 18.4923,
    lng: 74.0285,
    openingHours: "8:00 AM - 7:00 PM",
    floorCount: 2,
    phone: "+91 20 2691 2906",
    facilities: ["Industrial 3D Printers", "Laser Cutters", "Robotic Arms", "PCB Milling"],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Ship in Campus",
    code: "MANET-SHIP",
    category: "Academic",
    description: "Life-size landlocked training ship mock-up and maritime seamanship waterfront training facility for realistic navigation & marine drills.",
    lat: 18.4938,
    lng: 74.0286,
    openingHours: "6:30 AM - 6:30 PM",
    floorCount: 3,
    phone: "+91 20 2691 2907",
    facilities: ["Navigation Bridge", "Engine Room Mockup", "Lifeboat Davits", "Radar Suite", "Waterfront Training"],
    image: "/buildings/ship_in_campus.jpg"
  },
  {
    name: "MIT School of Engineering & Film and Television Institute Building",
    code: "SOE-FTII",
    category: "Academic",
    description: "Joint academic complex housing School of Engineering laboratories and Film & Television media studios.",
    lat: 18.4902,
    lng: 74.0268,
    openingHours: "8:00 AM - 8:00 PM",
    floorCount: 5,
    phone: "+91 20 2691 2908",
    facilities: ["Sound Recording Studio", "Chroma Key Floor", "VFX Editing Suites", "Computer Labs"],
    image: "/buildings/soe_ftii_building.jpg"
  },
  {
    name: "Vishwashanti Sangeet Kala Academy",
    code: "MUS-ACAD",
    category: "Academic",
    description: "Vishwashanti Sangeet Kala Academy building dedicated to classical music, vocal training, and instrumental performance.",
    lat: 18.4914,
    lng: 74.0255,
    openingHours: "7:00 AM - 8:00 PM",
    floorCount: 3,
    phone: "+91 20 2691 2909",
    facilities: ["Acoustic Practice Rooms", "Riyaz Halls", "Instruments Store", "Recital Chamber"],
    image: "/buildings/sangeet_kala_building.jpg"
  },
  {
    name: "Art Gallery (AG)",
    code: "ART-GAL",
    category: "Academic",
    description: "Exhibition gallery showcasing student fine art, paintings, sculptures, and architectural design prototypes.",
    lat: 18.4898,
    lng: 74.0248,
    openingHours: "9:00 AM - 6:00 PM",
    floorCount: 2,
    phone: "+91 20 2691 2910",
    facilities: ["Exhibition Halls", "Lighting Track System", "Sculpture Courtyard", "Curator Office"],
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Engineering and Information Technology Block – I",
    code: "EITB-01",
    category: "Academic",
    description: "Engineering & IT Block I housing School of Computing classrooms, Cloud Computing labs, and AI centers.",
    lat: 18.4905,
    lng: 74.0272,
    openingHours: "8:00 AM - 7:00 PM",
    floorCount: 5,
    phone: "+91 20 2691 2911",
    facilities: ["AI & DS Lab", "School of Computing Offices", "Server Room", "Smart Classrooms"],
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Engineering and Information Technology Block – II",
    code: "EITB-02",
    category: "Academic",
    description: "Engineering & IT Block II housing Cyber Security, IoT research labs, and Software Engineering lecture halls.",
    lat: 18.4908,
    lng: 74.0274,
    openingHours: "8:00 AM - 7:00 PM",
    floorCount: 5,
    phone: "+91 20 2691 2912",
    facilities: ["Cyber Security Lab", "IoT Hardware Bay", "Seminar Hall", "Project Workspaces"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "MIT School of Food Technology",
    code: "FOOD-TECH",
    category: "Academic",
    description: "Premier institute building for Food Processing, Food Engineering & Technology, Sensory Evaluation labs, and Food Quality Analysis.",
    lat: 18.4890,
    lng: 74.0258,
    openingHours: "8:00 AM - 6:30 PM",
    floorCount: 5,
    phone: "+91 20 2691 2925",
    facilities: ["Food Processing Pilot Plant", "Sensory Analysis Lab", "Microbiology Bay", "Food Chemistry Lab"],
    image: "/buildings/food_technology_building.jpg"
  },
  {
    name: "Academic Building – II",
    code: "AB-02",
    category: "Academic",
    description: "Academic Building AB-II housing postgraduate studies, Applied Sciences, and Mathematics departments.",
    lat: 18.4893,
    lng: 74.0261,
    openingHours: "8:00 AM - 6:30 PM",
    floorCount: 4,
    phone: "+91 20 2691 2914",
    facilities: ["Physics Lab", "Chemistry Lab", "Research Cabins", "Audio-Visual Hall"],
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Academic Building – III & Auditorium",
    code: "AB-03",
    category: "Academic",
    description: "Academic Building AB-III integrated with a 500-seater high-tech convention auditorium for academic events.",
    lat: 18.4896,
    lng: 74.0264,
    openingHours: "8:00 AM - 8:00 PM",
    floorCount: 5,
    phone: "+91 20 2691 2915",
    facilities: ["500-seat Auditorium", "Conference Suites", "Dean Offices", "Exhibition Foyer"],
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "School of Bioengineering Sciences & Research",
    code: "BIO-ENG",
    category: "Academic",
    description: "MIT ADTU School of Bioengineering Sciences & Research housing biotechnology labs, biomedical research, bioinformatics and genomic incubation centers.",
    lat: 18.4910,
    lng: 74.0279,
    openingHours: "8:00 AM - 8:00 PM",
    floorCount: 5,
    phone: "+91 20 2691 2916",
    facilities: ["Biomedical Labs", "Bioinformatics Suite", "Tissue Culture Facility", "Genomics Incubation"],
    image: "/buildings/bioengineering_building.jpg"
  },
  {
    name: "School of Education Building",
    code: "SOE-EDU",
    category: "Academic",
    description: "Academic center for teacher training, pedagogy research, educational psychology, and counseling labs.",
    lat: 18.4886,
    lng: 74.0252,
    openingHours: "8:30 AM - 5:30 PM",
    floorCount: 3,
    phone: "+91 20 2691 2917",
    facilities: ["Psychology Lab", "Micro-teaching Room", "Resource Center", "Counseling Wing"],
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "School of Vedic Science Building",
    code: "SVS-BLDG",
    category: "Academic",
    description: "Institute building dedicated to Vedic Sciences, Indian Knowledge Systems (IKS), Sanskrit, and Vedic literature.",
    lat: 18.4916,
    lng: 74.0258,
    openingHours: "8:00 AM - 6:00 PM",
    floorCount: 3,
    phone: "+91 20 2691 2918",
    facilities: ["Manuscript Archive", "Yajna Shala", "IKS Research Library", "Yoga Hall"],
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Raj Auditorium",
    code: "RAJ-AUD",
    category: "Academic",
    description: "Grand campus hall for university convocations, cultural festivals, guest lectures, and academic symposiums.",
    lat: 18.4925,
    lng: 74.0262,
    openingHours: "8:00 AM - 9:00 PM",
    floorCount: 3,
    phone: "+91 20 2691 2919",
    facilities: ["Acoustic Stage", "Green Rooms", "Balcony Seating", "Dolby Sound"],
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "World Peace Dome (Vishwashanti Dome)",
    code: "MIT-DOME",
    category: "Administrative",
    description: "The world's largest dome & iconic landmark at MIT ADT Rajbaug Campus, overlooking the Mula-Mutha river.",
    lat: 18.4912,
    lng: 74.0260,
    openingHours: "7:00 AM - 9:00 PM",
    floorCount: 5,
    phone: "+91 20 2691 2900",
    facilities: ["World Peace Library", "Auditorium", "Vipassana Center", "River View Deck"],
    image: "/buildings/world_peace_dome.jpg"
  },
  {
    name: "MIT Institute of Design (Design Building)",
    code: "MIT-ID",
    category: "Academic",
    description: "Premier design institute campus housing Industrial Design, Communication, UX/UI, and Animation studios.",
    lat: 18.4895,
    lng: 74.0245,
    openingHours: "8:00 AM - 8:00 PM",
    floorCount: 4,
    phone: "+91 20 2691 2920",
    facilities: ["Prototype Workshop", "Mac Labs", "Design Exhibition Gallery", "Student Lounge"],
    image: "/buildings/design_building.jpg"
  },
  {
    name: "MIT ADT Central Knowledge Resource Center (Library)",
    code: "LIB-CENTRAL",
    category: "Library",
    description: "Comprehensive central university library with digital research journals, quiet reading floors, and e-learning pods.",
    lat: 18.4908,
    lng: 74.0265,
    openingHours: "8:00 AM - 11:00 PM",
    floorCount: 4,
    phone: "+91 20 2691 2921",
    facilities: ["IEEE Digital Access", "Silent Discussion Rooms", "Book Bank", "Printing Kiosks"],
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Rajbaug Central Food Court & Cafeteria",
    code: "DINING-FC",
    category: "Dining",
    description: "Multi-cuisine food court serving South Indian, North Indian, snacks, juice bars, and coffee spots.",
    lat: 18.4903,
    lng: 74.0250,
    openingHours: "7:30 AM - 10:30 PM",
    floorCount: 2,
    phone: "+91 20 2691 2922",
    facilities: ["Multi-cuisine Dining", "Coffee Shop", "Ice Cream Parlor", "Shaded Patio"],
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "MIT ADT Sports Complex & Cricket Ground",
    code: "SPORTS-COMPLEX",
    category: "Sports",
    description: "Sprawling sports complex featuring full-size floodlit cricket stadium, football turf, basketball courts, and indoor gym.",
    lat: 18.4920,
    lng: 74.0235,
    openingHours: "6:00 AM - 9:00 PM",
    floorCount: 2,
    phone: "+91 20 2691 2923",
    facilities: ["Cricket Stadium", "Football Ground", "Basketball Court", "Indoor Gym"],
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Rajbaug Student Residence Hostels",
    code: "HOSTEL-RB",
    category: "Hostel",
    description: "Modern secure residential hostel complex for boys and girls with in-house mess, laundry, and sports courts.",
    lat: 18.4880,
    lng: 74.0230,
    openingHours: "24/7 Security Access",
    floorCount: 8,
    phone: "+91 20 2691 2924",
    facilities: ["Student Mess", "Laundry Service", "Common TV Room", "24/7 Security"],
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80"
  }
];

// Calculate Haversine Distance in meters
function getDistanceInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const rad1 = lat1 * Math.PI / 180;
  const rad2 = lat2 * Math.PI / 180;
  const deltaLat = (lat2 - lat1) * Math.PI / 180;
  const deltaLon = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(rad1) * Math.cos(rad2) *
            Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Generate Realistic Curved Campus Waypoints Route
function generateCampusRoutePoints(start, end) {
  if (!start || !end) return [];
  const p1 = [start.lat, start.lng];
  const p2 = [end.lat, end.lng];

  // Mid-way bend point for campus pathway look
  const midLat = (start.lat + end.lat) / 2 + (start.lat < end.lat ? 0.0003 : -0.0003);
  const midLng = (start.lng + end.lng) / 2 + (start.lng < end.lng ? -0.0004 : 0.0004);

  return [p1, [midLat, midLng], p2];
}

export default function MapPage({ initialSearch = '', initialCategory = 'All', onOpenIndoor }) {
  const [showGate, setShowGate] = useState(true);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([18.4907, 74.0256]); // MIT ADT Campus Center
  const [zoomLevel, setZoomLevel] = useState(16);

  // Google Maps Feature States
  const [activeTileLayer, setActiveTileLayer] = useState('street'); // 'street' | 'satellite' | 'light'
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const [showDirections, setShowDirections] = useState(false);
  const [originLocation, setOriginLocation] = useState(DEFAULT_LOCATIONS[0]); // MANET default
  const [destinationLocation, setDestinationLocation] = useState(DEFAULT_LOCATIONS[10]); // EITB-01 default
  const [travelMode, setTravelMode] = useState('walk'); // 'walk' | 'cycle' | 'shuttle'
  const [savedCodes, setSavedCodes] = useState(() => {
    try {
      const saved = localStorage.getItem('mit_saved_locations');
      return saved ? JSON.parse(saved) : ['MIT-DOME', 'EITB-01'];
    } catch {
      return ['MIT-DOME', 'EITB-01'];
    }
  });
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const categories = ['All', 'Academic', 'Library', 'Dining', 'Sports', 'Hostel', 'Administrative'];

  const tileLayerUrls = {
    street: {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    },
    satellite: {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP'
    },
    light: {
      url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>'
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleSaveLocation = (code) => {
    setSavedCodes(prev => {
      const exists = prev.includes(code);
      const updated = exists ? prev.filter(c => c !== code) : [...prev, code];
      try {
        localStorage.setItem('mit_saved_locations', JSON.stringify(updated));
      } catch (e) {
        console.warn('Storage save failed:', e);
      }
      showToast(exists ? `Removed ${code} from Saved Places` : `Saved ${code} to Bookmarks! 💙`);
      return updated;
    });
  };

  const getFilteredDefaults = (q, cat, savedOnly) => {
    const query = q.trim().toLowerCase();
    return DEFAULT_LOCATIONS.filter(loc => {
      const matchesQuery = !query || 
        loc.name.toLowerCase().includes(query) ||
        loc.code.toLowerCase().includes(query) ||
        loc.description.toLowerCase().includes(query);
      const matchesCategory = !cat || cat === 'All' || loc.category === cat;
      const matchesSaved = !savedOnly || savedCodes.includes(loc.code);
      return matchesQuery && matchesCategory && matchesSaved;
    });
  };

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/locations/search', {
        params: { q: search, category: selectedCategory }
      });
      if (res.data && res.data.length > 0) {
        let list = res.data;
        if (showSavedOnly) list = list.filter(l => savedCodes.includes(l.code));
        setLocations(list);
      } else {
        const filtered = getFilteredDefaults(search, selectedCategory, showSavedOnly);
        setLocations(filtered);
      }
    } catch {
      const filtered = getFilteredDefaults(search, selectedCategory, showSavedOnly);
      setLocations(filtered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, [search, selectedCategory, showSavedOnly, savedCodes]);

  const handleSelectLocation = (loc) => {
    setSelectedLocation(loc);
    setMapCenter([loc.lat, loc.lng]);
    setZoomLevel(17);
  };

  const handleStartDirectionsTo = (loc) => {
    setDestinationLocation(loc);
    setShowDirections(true);
    if (!originLocation || originLocation.code === loc.code) {
      const defaultStart = DEFAULT_LOCATIONS.find(l => l.code !== loc.code) || DEFAULT_LOCATIONS[0];
      setOriginLocation(defaultStart);
    }
    setMapCenter([(loc.lat + (originLocation?.lat || loc.lat)) / 2, (loc.lng + (originLocation?.lng || loc.lng)) / 2]);
    setZoomLevel(16);
  };

  const handleShareLocation = (loc) => {
    const shareText = `Explore ${loc.name} (${loc.code}) at MIT ADT University Campus Map!`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/#map?code=${loc.code}`);
      showToast(`Link for ${loc.code} copied to clipboard! 🔗`);
    } else {
      showToast(shareText);
    }
  };

  const handleRecenterGps = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setMapCenter([pos.coords.latitude, pos.coords.longitude]);
          setZoomLevel(17);
          showToast("Centered to your GPS Location 📍");
        },
        () => {
          setMapCenter([18.4907, 74.0256]);
          setZoomLevel(16);
          showToast("Centered to MIT ADT Campus Center 📍");
        }
      );
    } else {
      setMapCenter([18.4907, 74.0256]);
      setZoomLevel(16);
    }
  };

  // Distance & ETA Calculations
  const calculatedDistanceMeters = originLocation && destinationLocation 
    ? getDistanceInMeters(originLocation.lat, originLocation.lng, destinationLocation.lat, destinationLocation.lng)
    : 0;

  const speedMetersPerMin = travelMode === 'walk' ? 75 : (travelMode === 'cycle' ? 230 : 400);
  const calculatedEtaMinutes = Math.max(1, Math.ceil(calculatedDistanceMeters / speedMetersPerMin));

  const routePolylinePoints = showDirections && originLocation && destinationLocation
    ? generateCampusRoutePoints(originLocation, destinationLocation)
    : [];

  return (
    <div className="map-page-layout">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="google-toast-notification">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Scroll-locked video hero gate intro */}
      {showGate && (
        <MetroHero 
          title="MIT ADT CAMPUS GATE"
          tagline="The Gate is Open. Explore all 19 Academic Buildings & Google Maps Navigation."
          scrollHint="SCROLL TO OPEN GATE"
          onComplete={() => setShowGate(false)}
        />
      )}

      {/* Left Sidebar Controls & Results */}
      <div className="map-sidebar">
        {showDirections ? (
          /* GOOGLE MAPS DIRECTIONS PANEL */
          <div className="directions-drawer-panel">
            <div className="directions-header">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#1e1452', fontSize: '1.1rem' }}>
                  <Navigation size={18} color="#2563eb" /> Campus Directions
                </h3>
                <button 
                  className="close-panel-btn" 
                  onClick={() => setShowDirections(false)}
                  title="Exit Directions"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="travel-mode-tabs">
                <button 
                  className={`mode-tab ${travelMode === 'walk' ? 'active' : ''}`}
                  onClick={() => setTravelMode('walk')}
                >
                  <Footprints size={15} />
                  <span>Walk</span>
                </button>
                <button 
                  className={`mode-tab ${travelMode === 'cycle' ? 'active' : ''}`}
                  onClick={() => setTravelMode('cycle')}
                >
                  <Bike size={15} />
                  <span>Cycle</span>
                </button>
                <button 
                  className={`mode-tab ${travelMode === 'shuttle' ? 'active' : ''}`}
                  onClick={() => setTravelMode('shuttle')}
                >
                  <Car size={15} />
                  <span>Shuttle</span>
                </button>
              </div>

              {/* Origin & Destination Selectors */}
              <div className="route-inputs-group">
                <div className="route-input-row">
                  <span className="route-dot origin-dot"></span>
                  <select 
                    className="route-select"
                    value={originLocation?.code || ''}
                    onChange={(e) => {
                      const found = DEFAULT_LOCATIONS.find(l => l.code === e.target.value);
                      if (found) setOriginLocation(found);
                    }}
                  >
                    {DEFAULT_LOCATIONS.map(loc => (
                      <option key={loc.code} value={loc.code}>Start: {loc.name} ({loc.code})</option>
                    ))}
                  </select>
                </div>

                <div className="route-input-row">
                  <span className="route-dot dest-dot"></span>
                  <select 
                    className="route-select"
                    value={destinationLocation?.code || ''}
                    onChange={(e) => {
                      const found = DEFAULT_LOCATIONS.find(l => l.code === e.target.value);
                      if (found) setDestinationLocation(found);
                    }}
                  >
                    {DEFAULT_LOCATIONS.map(loc => (
                      <option key={loc.code} value={loc.code}>End: {loc.name} ({loc.code})</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Route Stats Summary */}
            <div className="route-stats-card">
              <div className="stat-main">
                <span className="eta-big">{calculatedEtaMinutes} min</span>
                <span className="distance-sub">({calculatedDistanceMeters > 1000 ? `${(calculatedDistanceMeters/1000).toFixed(1)} km` : `${calculatedDistanceMeters} m`})</span>
              </div>
              <p className="route-desc-sub">
                Fastest campus route via Central Promenade & Avenue
              </p>
            </div>

            {/* Step-by-Step Directions */}
            <div className="turn-instructions-list">
              <h4 style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                Turn-by-Turn Navigation
              </h4>
              <div className="instruction-step">
                <div className="step-num">1</div>
                <div className="step-text">
                  Start at <strong>{originLocation?.name}</strong> ({originLocation?.code})
                </div>
              </div>
              <div className="instruction-step">
                <div className="step-num">2</div>
                <div className="step-text">
                  Head along main walkway towards <strong>{originLocation?.category} Quadrangle</strong>
                </div>
              </div>
              <div className="instruction-step">
                <div className="step-num">3</div>
                <div className="step-text">
                  Continue straight for approx. <strong>{Math.round(calculatedDistanceMeters * 0.6)} meters</strong>
                </div>
              </div>
              <div className="instruction-step">
                <div className="step-num">4</div>
                <div className="step-text">
                  Arrive at <strong>{destinationLocation?.name}</strong> on your right.
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* STANDARD DIRECTORY SIDEBAR */
          <>
            <div className="sidebar-header">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h2 style={{ margin: 0 }}>Campus Directory</h2>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button
                    onClick={() => setShowDirections(true)}
                    title="Open Directions Route Finder"
                    className="icon-action-pill"
                    style={{ background: '#e0e7ff', color: '#1e1452', borderColor: '#c7d2fe' }}
                  >
                    <Navigation size={13} /> Routes
                  </button>
                  <button
                    onClick={() => setShowGate(true)}
                    title="Replay Campus Gate Intro"
                    className="icon-action-pill"
                  >
                    <Video size={13} /> Intro
                  </button>
                </div>
              </div>
              
              {/* Search bar */}
              <div className="search-input-group" style={{ marginBottom: '0.75rem', padding: '0.4rem 0.8rem' }}>
                <Search size={16} color="#94a3b8" />
                <input 
                  type="text"
                  placeholder="Search building, code, or department..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ fontSize: '0.9rem', marginLeft: '0.5rem' }}
                />
              </div>

              {/* Category Chips & Saved Filter */}
              <div className="filter-tags">
                <button
                  className={`filter-tag ${showSavedOnly ? 'active-saved' : ''}`}
                  onClick={() => setShowSavedOnly(!showSavedOnly)}
                >
                  💙 Saved ({savedCodes.length})
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`filter-tag ${selectedCategory === cat && !showSavedOnly ? 'active' : ''}`}
                    onClick={() => {
                      setShowSavedOnly(false);
                      setSelectedCategory(cat);
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Location List */}
            <div className="location-list">
              {loading ? (
                <p style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.9rem' }}>Loading campus locations...</p>
              ) : locations.length === 0 ? (
                <p style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.9rem' }}>No locations found.</p>
              ) : (
                locations.map((loc) => {
                  const isSaved = savedCodes.includes(loc.code);
                  return (
                    <div 
                      key={loc.code || loc._id} 
                      className={`location-item ${selectedLocation?.code === loc.code ? 'selected' : ''}`}
                      onClick={() => handleSelectLocation(loc)}
                    >
                      {loc.image && (
                        <div className="location-thumb-wrapper">
                          <img src={loc.image} alt={loc.name} className="location-thumb" />
                          <span className="location-cat-tag">{loc.category}</span>
                        </div>
                      )}
                      <div className="location-item-content">
                        <div className="location-item-header">
                          <span className="location-name">{loc.name}</span>
                          <span className="location-badge">{loc.code}</span>
                        </div>
                        <p className="location-desc">{loc.description}</p>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem' }}>
                          <div className="facility-chips">
                            {loc.facilities?.slice(0, 2).map((f, i) => (
                              <span key={i} className="chip">{f}</span>
                            ))}
                          </div>
                          <button
                            className={`save-bookmark-btn ${isSaved ? 'saved' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSaveLocation(loc.code);
                            }}
                            title={isSaved ? "Remove from bookmarks" : "Save to bookmarks"}
                          >
                            <Heart size={14} fill={isSaved ? "#2563eb" : "none"} color={isSaved ? "#2563eb" : "#94a3b8"} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}
      </div>

      {/* Main Map Container */}
      <div className="map-canvas-container">
        {/* Floating Google Maps Top/Right Controls */}
        <div className="floating-map-controls-group">
          {/* Layer Switcher Toggle */}
          <div className="layer-switcher-wrapper">
            <button 
              className="map-control-btn layer-btn" 
              onClick={() => setShowLayerMenu(!showLayerMenu)}
              title="Change Map View (Street, Satellite, Light)"
            >
              <Layers size={18} />
              <span>Layers</span>
            </button>

            {showLayerMenu && (
              <div className="layer-menu-dropdown">
                <div 
                  className={`layer-option ${activeTileLayer === 'street' ? 'active' : ''}`}
                  onClick={() => { setActiveTileLayer('street'); setShowLayerMenu(false); }}
                >
                  <div className="layer-preview street-preview"></div>
                  <span>Default Street Map</span>
                </div>
                <div 
                  className={`layer-option ${activeTileLayer === 'satellite' ? 'active' : ''}`}
                  onClick={() => { setActiveTileLayer('satellite'); setShowLayerMenu(false); }}
                >
                  <div className="layer-preview satellite-preview"></div>
                  <span>Satellite View</span>
                </div>
                <div 
                  className={`layer-option ${activeTileLayer === 'light' ? 'active' : ''}`}
                  onClick={() => { setActiveTileLayer('light'); setShowLayerMenu(false); }}
                >
                  <div className="layer-preview light-preview"></div>
                  <span>Clean Light</span>
                </div>
              </div>
            )}
          </div>

          {/* GPS Locate Me Button */}
          <button 
            className="map-control-btn" 
            onClick={handleRecenterGps}
            title="Recenter Map / Locate Me"
          >
            <Crosshair size={18} />
          </button>

          {/* Reset North Button */}
          <button 
            className="map-control-btn" 
            onClick={() => { setMapCenter([18.4907, 74.0256]); setZoomLevel(16); }}
            title="Reset Campus Center"
          >
            <Compass size={18} />
          </button>
        </div>

        {/* Selected Place Detail Drawer Overlay */}
        {selectedLocation && !showDirections && (
          <div className="place-detail-drawer">
            <button className="drawer-close-btn" onClick={() => setSelectedLocation(null)}>
              <X size={16} />
            </button>
            <div className="drawer-photo-wrapper">
              <img src={selectedLocation.image} alt={selectedLocation.name} />
              <span className="drawer-category-badge">{selectedLocation.category} • {selectedLocation.code}</span>
            </div>
            <div className="drawer-body">
              <h3 className="drawer-title">{selectedLocation.name}</h3>
              <div className="drawer-rating-row">
                <span className="rating-badge"><Star size={13} fill="#f59e0b" color="#f59e0b" /> 4.8</span>
                <span className="status-open">🟢 Open Now</span>
                <span className="hours-text">• {selectedLocation.openingHours}</span>
              </div>
              <p className="drawer-desc">{selectedLocation.description}</p>
              
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>FACILITIES & LABS</span>
                <div className="facility-chips" style={{ marginTop: '0.3rem' }}>
                  {selectedLocation.facilities?.map((f, i) => (
                    <span key={i} className="chip">{f}</span>
                  ))}
                </div>
              </div>

              {/* Action Buttons Toolbar */}
              <div className="drawer-action-toolbar">
                <button 
                  className="drawer-action-btn primary"
                  onClick={() => handleStartDirectionsTo(selectedLocation)}
                >
                  <Navigation size={15} /> Directions
                </button>
                {(selectedLocation.code?.includes('EITB') || selectedLocation.code?.includes('SOE')) && (
                  <button 
                    className="drawer-action-btn"
                    style={{ background: '#eff6ff', color: '#1d4ed8', borderColor: '#bfdbfe', fontWeight: 700 }}
                    onClick={() => onOpenIndoor && onOpenIndoor(0)}
                    title="Open Indoor Floor Plans"
                  >
                    <Building2 size={15} /> Indoor Floor Plans
                  </button>
                )}
                <button 
                  className="drawer-action-btn"
                  onClick={() => toggleSaveLocation(selectedLocation.code)}
                >
                  <Heart 
                    size={15} 
                    fill={savedCodes.includes(selectedLocation.code) ? "#2563eb" : "none"}
                    color={savedCodes.includes(selectedLocation.code) ? "#2563eb" : "#1e1452"}
                  />
                  {savedCodes.includes(selectedLocation.code) ? 'Saved' : 'Save'}
                </button>
                <button 
                  className="drawer-action-btn"
                  onClick={() => handleShareLocation(selectedLocation)}
                >
                  <Share2 size={15} /> Share
                </button>
                <button 
                  className="drawer-action-btn"
                  onClick={() => showToast(`Calling ${selectedLocation.code} Desk: ${selectedLocation.phone}`)}
                >
                  <Phone size={15} /> Call
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Leaflet Map Canvas */}
        <MapContainer 
          center={mapCenter} 
          zoom={zoomLevel} 
          zoomControl={true}
          style={{ width: '100%', height: '100%' }}
        >
          <ChangeView center={mapCenter} zoom={zoomLevel} />
          <TileLayer
            attribution={tileLayerUrls[activeTileLayer].attribution}
            url={tileLayerUrls[activeTileLayer].url}
          />

          {/* Polyline Navigation Route */}
          {routePolylinePoints.length > 0 && (
            <Polyline 
              positions={routePolylinePoints} 
              color="#2563eb" 
              weight={6} 
              opacity={0.9}
              dashArray="10, 8" 
            />
          )}

          {/* Map Location Markers */}
          {locations.map((loc) => {
            const isSelected = selectedLocation?.code === loc.code;
            return (
              <Marker 
                key={loc.code || loc._id} 
                position={[loc.lat, loc.lng]}
                icon={createCustomIcon(loc.category, isSelected)}
                eventHandlers={{
                  click: () => handleSelectLocation(loc)
                }}
              >
                <Popup className="custom-popup">
                  <div className="popup-content">
                    {loc.image && <img src={loc.image} alt={loc.name} />}
                    <h4>{loc.name}</h4>
                    <p style={{ color: '#06b6d4', fontWeight: 600, marginBottom: '0.3rem' }}>{loc.category} • {loc.code}</p>
                    <p>{loc.description}</p>
                    <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        <Clock size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                        {loc.openingHours}
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartDirectionsTo(loc);
                        }}
                        style={{
                          background: '#2563eb',
                          color: 'white',
                          border: 'none',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '0.3rem',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.2rem'
                        }}
                      >
                        <Navigation size={11} /> Route
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
