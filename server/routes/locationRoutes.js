import express from 'express';
import Location from '../models/Location.js';

const router = express.Router();

// Initial seed data for MIT ADT University Pune (Loni Kalbhor, Pune)
const initialLocations = [
  {
    name: "MIT ADT Campus Main Entrance Gate",
    code: "GATE-MAIN",
    category: "Administrative",
    description: "Grand ornamental main entrance gate and security checkpoint of MIT ADT University Rajbaug Campus, Solapur Road.",
    lat: 18.4945,
    lng: 74.0292,
    openingHours: "Open 24/7 (Security Booth)",
    floorCount: 1,
    facilities: ["Security Post", "Visitor Registration", "Vehicle Tag Verification", "Campus Information Kiosk"],
    image: "/buildings/mit_campus_gate.jpg"
  },
  // 19 Academic Buildings
  {
    name: "MANET Institute Building",
    code: "MANET-01",
    category: "Academic",
    description: "Premier marine engineering college building with ship engine simulator, parade grounds, and naval training labs.",
    lat: 18.4932,
    lng: 74.0282,
    openingHours: "6:00 AM - 7:00 PM",
    floorCount: 4,
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
    facilities: ["Acoustic Stage", "Green Rooms", "Balcony Seating", "Dolby Sound"],
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80"
  },
  // Additional Campus Landmark Buildings
  {
    name: "World Peace Dome (Vishwashanti Dome)",
    code: "MIT-DOME",
    category: "Administrative",
    description: "The world's largest dome & iconic landmark at MIT ADT Rajbaug Campus, overlooking the Mula-Mutha river.",
    lat: 18.4912,
    lng: 74.0260,
    openingHours: "7:00 AM - 9:00 PM",
    floorCount: 5,
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
    facilities: ["Student Mess", "Laundry Service", "Common TV Room", "24/7 Security"],
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80"
  }
];

// Memory fallback store if MongoDB is not active
let inMemoryLocations = [...initialLocations];

// GET all locations
router.get('/', async (req, res) => {
  try {
    if (req.dbConnected) {
      let count = await Location.countDocuments();
      if (count === 0) {
        await Location.insertMany(initialLocations);
      }
      const locations = await Location.find({});
      return res.json(locations);
    }
  } catch (err) {
    console.warn('MongoDB query fallback to in-memory store:', err.message);
  }
  return res.json(inMemoryLocations);
});

// GET search locations
router.get('/search', async (req, res) => {
  const query = (req.query.q || '').trim().toLowerCase();
  const category = (req.query.category || '').trim();

  try {
    if (req.dbConnected) {
      const filter = {};
      if (query) {
        filter.$or = [
          { name: { $regex: query, $options: 'i' } },
          { code: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ];
      }
      if (category && category !== 'All') {
        filter.category = category;
      }
      const locations = await Location.find(filter);
      return res.json(locations);
    }
  } catch (err) {
    console.warn('MongoDB search fallback:', err.message);
  }

  // Fallback search logic
  let filtered = inMemoryLocations.filter(loc => {
    const matchesQuery = !query || 
      loc.name.toLowerCase().includes(query) ||
      loc.code.toLowerCase().includes(query) ||
      loc.description.toLowerCase().includes(query);

    const matchesCategory = !category || category === 'All' || loc.category === category;
    return matchesQuery && matchesCategory;
  });

  return res.json(filtered);
});

// POST seed database manually
router.post('/seed', async (req, res) => {
  try {
    if (req.dbConnected) {
      await Location.deleteMany({});
      const seeded = await Location.insertMany(initialLocations);
      return res.json({ message: 'Database seeded successfully', data: seeded });
    }
  } catch (err) {
    console.error('Seed error:', err);
  }
  inMemoryLocations = [...initialLocations];
  return res.json({ message: 'In-memory store reset successfully', data: inMemoryLocations });
});

export default router;
