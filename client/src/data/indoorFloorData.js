// Comprehensive Indoor Navigation Data for MIT-ADT University Main Engineering / IT-Establishment Building
// Sourced directly from official building floor plans: Ground, 1st, 2nd, 3rd, 4th, 7th, 8th Floors

export const FLOORS = [
  {
    id: 0,
    floorNumber: 0,
    label: "Ground Floor",
    shortLabel: "GF",
    name: "Department of Applied Sciences & Humanities",
    subtitle: "Admission Centre, Welcome Lounge, First Year Engineering Labs",
    image: "/floorplans/floor_ground.jpg",
    blueprintSvgUrl: "/floorplans/floor_ground.jpg",
    primaryDepts: ["Applied Sciences & Humanities", "Central Admissions", "Mechanical Workshops"],
    keyLocations: ["Admission Centre", "Welcomes Lounge", "Concrete Tech Lab", "Thermodynamics Lab", "Language Lab"]
  },
  {
    id: 1,
    floorNumber: 1,
    label: "1st Floor",
    shortLabel: "1F",
    name: "IT-Establishment Building & Civil Engineering",
    subtitle: "Civil Dept, CSE & ECE Labs, Physics & Chemistry Labs",
    image: "/floorplans/floor_1.jpg",
    blueprintSvgUrl: "/floorplans/floor_1.jpg",
    primaryDepts: ["Civil Engineering", "Applied Sciences", "Computer Science", "Electronics & Comm."],
    keyLocations: ["Civil HOD Office", "Engineering Geology Lab", "Physics Lab 01 & 02", "Smart Wireless Digital Lab"]
  },
  {
    id: 2,
    floorNumber: 2,
    label: "2nd Floor",
    shortLabel: "2F",
    name: "Department of Mechanical Engineering",
    subtitle: "CAD/CAM, Robotics, Heat Transfer Labs, Open Atrium",
    image: "/floorplans/floor_2.jpg",
    blueprintSvgUrl: "/floorplans/floor_2.jpg",
    primaryDepts: ["Mechanical Engineering", "Computer Science"],
    keyLocations: ["CAD/CAM Lab", "Mechanical HOD Office", "Heat Transfer Lab", "Metrology & QC Lab", "Theory of Machines Lab"]
  },
  {
    id: 3,
    floorNumber: 3,
    label: "3rd Floor",
    shortLabel: "3F",
    name: "MIT School of Engineering - Admin, Library & Reading Hall",
    subtitle: "Central Engineering Library, Reading Hall, Board Room, CRIYA Labs",
    image: "/floorplans/floor_3.jpg",
    blueprintSvgUrl: "/floorplans/floor_3.jpg",
    primaryDepts: ["MIT School of Engineering (Admin)", "Central Library", "CRIYA Research"],
    keyLocations: ["Central Library (N-314)", "Large Reading Hall", "Board Meeting & Conference Hall", "CRIYA Laboratories", "Principal Office"]
  },
  {
    id: 4,
    floorNumber: 4,
    label: "4th Floor",
    shortLabel: "4F",
    name: "Department of Aerospace Engineering",
    subtitle: "Aircraft Propulsion, Avionics, CFD Lab, Robotics & CSE Labs",
    image: "/floorplans/floor_4.jpg",
    blueprintSvgUrl: "/floorplans/floor_4.jpg",
    primaryDepts: ["Aerospace Engineering", "Robotics & Automation", "Computer Science"],
    keyLocations: ["Aerospace HOD Office", "Aircraft Propulsion Lab", "Flight Dynamics & Avionics Lab", "Robotics Lab", "CFD Centre of Excellence"]
  },
  {
    id: 7,
    floorNumber: 7,
    label: "7th Floor",
    shortLabel: "7F",
    name: "MITCOM & Grand Campus Auditorium",
    subtitle: "Central Auditorium, MITCOM Classrooms, TPO & Director Office",
    image: "/floorplans/floor_7.jpg",
    blueprintSvgUrl: "/floorplans/floor_7.jpg",
    primaryDepts: ["MIT College of Management (MITCOM)", "Campus Auditorium", "Training & Placement"],
    keyLocations: ["Central Auditorium (N-719)", "MITCOM Director Office", "TPO Office", "MITCOM Computer Labs"]
  },
  {
    id: 8,
    floorNumber: 8,
    label: "8th Floor",
    shortLabel: "8F",
    name: "MITCOM & Open Terrace",
    subtitle: "Rooftop Open Terrace & Observation Deck, Senior Classrooms",
    image: "/floorplans/floor_8.jpg",
    blueprintSvgUrl: "/floorplans/floor_8.jpg",
    primaryDepts: ["MIT College of Management (MITCOM)", "Rooftop Complex"],
    keyLocations: ["Open Rooftop Terrace", "Faculty Block", "Senior Seminar Classrooms"]
  }
];

// Corridor Waypoints for hall navigation (coordinates normalized to 0-100%)
export const CORRIDOR_GRAPH = {
  // Common vertical and horizontal hallway waypoints across the H/U layout
  nodes: {
    ENTRANCE: { x: 50, y: 48, label: "Main Entrance Portico", floorAgnostic: false },
    LOUNGE: { x: 50, y: 26, label: "Central Lounge / Atrium", floorAgnostic: true },
    LIFT_1: { x: 48, y: 32, label: "1st Lift (South Corridor)", floorAgnostic: true, isLift: true },
    LIFT_2: { x: 59, y: 32, label: "2nd Lift (North Corridor)", floorAgnostic: true, isLift: true },
    
    // South Wing Corridors
    SOUTH_JUNCTION: { x: 26, y: 26, label: "South Wing Entrance", floorAgnostic: true },
    SOUTH_CORR_WEST: { x: 18, y: 26, label: "South Block Upper Hallway", floorAgnostic: true },
    SOUTH_VERT_TOP: { x: 18, y: 38, label: "South Wing Corridor (Upper)", floorAgnostic: true },
    SOUTH_VERT_MID: { x: 18, y: 55, label: "South Wing Corridor (Central)", floorAgnostic: true },
    SOUTH_VERT_BOT: { x: 18, y: 72, label: "South Wing Corridor (Lower)", floorAgnostic: true },
    SOUTH_STAIRS: { x: 14, y: 55, label: "South Wing Stairs / Exit", floorAgnostic: true, isStairs: true },
    
    // North Wing Corridors
    NORTH_JUNCTION: { x: 68, y: 26, label: "North Wing Entrance", floorAgnostic: true },
    NORTH_CORR_EAST: { x: 78, y: 26, label: "North Block Upper Hallway", floorAgnostic: true },
    NORTH_VERT_TOP: { x: 78, y: 38, label: "North Wing Corridor (Upper)", floorAgnostic: true },
    NORTH_VERT_MID: { x: 78, y: 55, label: "North Wing Corridor (Central)", floorAgnostic: true },
    NORTH_VERT_BOT: { x: 78, y: 72, label: "North Wing Corridor (Lower)", floorAgnostic: true },
    NORTH_STAIRS: { x: 84, y: 55, label: "North Wing Stairs / Entrance", floorAgnostic: true, isStairs: true }
  },
  edges: [
    ["ENTRANCE", "LOUNGE", 12],
    ["LOUNGE", "LIFT_1", 8],
    ["LOUNGE", "LIFT_2", 9],
    ["LOUNGE", "SOUTH_JUNCTION", 24],
    ["LOUNGE", "NORTH_JUNCTION", 18],
    ["LIFT_1", "SOUTH_JUNCTION", 20],
    ["LIFT_2", "NORTH_JUNCTION", 12],
    
    // South Corridor
    ["SOUTH_JUNCTION", "SOUTH_CORR_WEST", 8],
    ["SOUTH_CORR_WEST", "SOUTH_VERT_TOP", 12],
    ["SOUTH_VERT_TOP", "SOUTH_VERT_MID", 17],
    ["SOUTH_VERT_MID", "SOUTH_VERT_BOT", 17],
    ["SOUTH_VERT_MID", "SOUTH_STAIRS", 6],
    
    // North Corridor
    ["NORTH_JUNCTION", "NORTH_CORR_EAST", 10],
    ["NORTH_CORR_EAST", "NORTH_VERT_TOP", 12],
    ["NORTH_VERT_TOP", "NORTH_VERT_MID", 17],
    ["NORTH_VERT_MID", "NORTH_VERT_BOT", 17],
    ["NORTH_VERT_MID", "NORTH_STAIRS", 6]
  ]
};

// Complete Directory of Rooms, Labs, Offices, and Facilities across all 7 floors
export const ALL_ROOMS = [
  // ==========================================
  // GROUND FLOOR (Floor 0)
  // ==========================================
  // GROUND FLOOR (Floor 0) - All Classrooms, Labs & Facilities
  // ==========================================
  // South Block - Ground
  {
    id: "GF-S003",
    code: "S-003",
    name: "Admission Centre Desk 1",
    floor: 0,
    block: "South Block",
    category: "admin",
    dept: "Admissions",
    x: 37, y: 22,
    nearestNode: "SOUTH_JUNCTION",
    description: "Student admission counseling and registration center."
  },
  {
    id: "GF-S004",
    code: "S-004",
    name: "Central Admission Office",
    floor: 0,
    block: "South Block",
    category: "admin",
    dept: "Admissions",
    x: 37, y: 32,
    nearestNode: "SOUTH_JUNCTION",
    description: "Main inquiry counter for new enrollments and campus courses."
  },
  {
    id: "GF-S005",
    code: "S-005",
    name: "Admission Documentation Desk",
    floor: 0,
    block: "South Block",
    category: "admin",
    dept: "Admissions",
    x: 32, y: 22,
    nearestNode: "SOUTH_JUNCTION",
    description: "Document verification and eligibility processing."
  },
  {
    id: "GF-S006",
    code: "S-006",
    name: "Admission Counseling Bay",
    floor: 0,
    block: "South Block",
    category: "admin",
    dept: "Admissions",
    x: 32, y: 32,
    nearestNode: "SOUTH_JUNCTION",
    description: "Parent and candidate academic consultation rooms."
  },
  {
    id: "GF-S007",
    code: "S-007",
    name: "Admission Executive Bay",
    floor: 0,
    block: "South Block",
    category: "admin",
    dept: "Admissions",
    x: 27, y: 22,
    nearestNode: "SOUTH_CORR_WEST",
    description: "Admissions officers and academic program directors."
  },
  {
    id: "GF-S008",
    code: "S-008",
    name: "Fee & Verification Counter",
    floor: 0,
    block: "South Block",
    category: "admin",
    dept: "Admissions",
    x: 27, y: 32,
    nearestNode: "SOUTH_CORR_WEST",
    description: "Fee payments, receipts, and enrollment confirmation."
  },
  {
    id: "GF-S009",
    code: "S-009",
    name: "Classroom S-009",
    floor: 0,
    block: "South Block",
    category: "classroom",
    dept: "Applied Sciences",
    x: 19, y: 22,
    nearestNode: "SOUTH_CORR_WEST",
    description: "Smart classroom with multimedia projector and 70-student capacity."
  },
  {
    id: "GF-S010",
    code: "S-010",
    name: "Classroom S-010",
    floor: 0,
    block: "South Block",
    category: "classroom",
    dept: "Applied Sciences",
    x: 14, y: 22,
    nearestNode: "SOUTH_CORR_WEST",
    description: "First year engineering division classroom equipped for interactive digital teaching."
  },
  {
    id: "GF-S011",
    code: "S-011",
    name: "PG Classroom I (PG CR-I)",
    floor: 0,
    block: "South Block",
    category: "classroom",
    dept: "Applied Sciences",
    x: 13, y: 34,
    nearestNode: "SOUTH_VERT_TOP",
    description: "Postgraduate classroom I equipped with multimedia projection and conference seminar seating."
  },
  {
    id: "GF-S012",
    code: "S-012 & S-014",
    name: "Design Prototype Laboratory",
    floor: 0,
    block: "South Block",
    category: "lab",
    dept: "Mechanical & Design",
    x: 21, y: 46,
    nearestNode: "SOUTH_VERT_MID",
    description: "Hands-on prototype development, mockups, and early-stage modeling."
  },
  {
    id: "GF-S013",
    code: "S-013",
    name: "Faculty Block (FB)",
    floor: 0,
    block: "South Block",
    category: "office",
    dept: "Applied Sciences",
    x: 13, y: 46,
    nearestNode: "SOUTH_VERT_MID",
    description: "Faculty cabins and student mentorship chambers."
  },
  {
    id: "GF-S015",
    code: "S-015",
    name: "Classroom S-015",
    floor: 0,
    block: "South Block",
    category: "classroom",
    dept: "Applied Sciences",
    x: 13, y: 56,
    nearestNode: "SOUTH_VERT_MID",
    description: "Undergraduate division lecture room with 65-seat capacity and acoustic panels."
  },
  {
    id: "GF-S016",
    code: "S-016",
    name: "Classroom S-016",
    floor: 0,
    block: "South Block",
    category: "classroom",
    dept: "Applied Sciences",
    x: 21, y: 56,
    nearestNode: "SOUTH_VERT_MID",
    description: "Interactive division classroom for tutorial and recitation classes."
  },
  {
    id: "GF-S017",
    code: "S-017",
    name: "PG Classroom II (PG CR-II)",
    floor: 0,
    block: "South Block",
    category: "classroom",
    dept: "Applied Sciences",
    x: 13, y: 69,
    nearestNode: "SOUTH_VERT_BOT",
    description: "Postgraduate classroom II for Master's degree lectures, seminars, and coursework."
  },
  {
    id: "GF-S018",
    code: "S-018",
    name: "Language Laboratory",
    floor: 0,
    block: "South Block",
    category: "lab",
    dept: "Applied Sciences",
    x: 13, y: 77,
    nearestNode: "SOUTH_VERT_BOT",
    description: "Digital audio-visual language learning and phonetics workstation lab."
  },
  {
    id: "GF-S019",
    code: "S-019",
    name: "Classroom S-019",
    floor: 0,
    block: "South Block",
    category: "classroom",
    dept: "Applied Sciences",
    x: 21, y: 69,
    nearestNode: "SOUTH_VERT_BOT",
    description: "Standard engineering sciences lecture room S-019."
  },
  {
    id: "GF-S020",
    code: "S-020",
    name: "PG Computer Laboratory",
    floor: 0,
    block: "South Block",
    category: "lab",
    dept: "Computing",
    x: 21, y: 77,
    nearestNode: "SOUTH_VERT_BOT",
    description: "High-spec workstations dedicated to postgraduate research & programming."
  },
  {
    id: "GF-SOUTH-LOUNGE",
    code: "SB-WL",
    name: "South Block Welcome Lounge",
    floor: 0,
    block: "South Block",
    category: "amenity",
    dept: "Campus Core",
    x: 21, y: 63,
    nearestNode: "SOUTH_VERT_MID",
    description: "South Block visitor lounge, notice board, and waiting gallery."
  },

  // Central - Ground
  {
    id: "GF-MAIN-ENTRANCE",
    code: "MAIN-ENTRANCE",
    name: "Main Building Entrance & Porch",
    floor: 0,
    block: "Central",
    category: "amenity",
    dept: "Campus Core",
    x: 50, y: 48,
    nearestNode: "ENTRANCE",
    description: "Grand central entrance portico facing the lawns and fountain."
  },
  {
    id: "GF-WELCOME-LOUNGE",
    code: "WL-01",
    name: "Welcomes Lounge (Main Lobby)",
    floor: 0,
    block: "Central",
    category: "amenity",
    dept: "Campus Core",
    x: 49, y: 26,
    nearestNode: "LOUNGE",
    description: "Spacious reception lounge connecting North & South academic wings."
  },
  {
    id: "GF-LIFT-1",
    code: "LIFT-01",
    name: "1st Lift (South Corridor)",
    floor: 0,
    block: "Central",
    category: "amenity",
    dept: "Campus Core",
    x: 48, y: 32,
    nearestNode: "LIFT_1",
    description: "Main passenger elevator serving all floors (GF through 8th Floor)."
  },
  {
    id: "GF-LIFT-2",
    code: "LIFT-02",
    name: "2nd Lift (North Corridor)",
    floor: 0,
    block: "Central",
    category: "amenity",
    dept: "Campus Core",
    x: 59, y: 32,
    nearestNode: "LIFT_2",
    description: "Passenger elevator connecting ground level to Library, Labs & Auditorium."
  },

  // North Block - Ground
  {
    id: "GF-N001",
    code: "N-001",
    name: "Surveying Laboratory",
    floor: 0,
    block: "North Block",
    category: "lab",
    dept: "Civil",
    x: 56, y: 22,
    nearestNode: "NORTH_JUNCTION",
    description: "Total stations, electronic theodolites, auto levels, and leveling staff equipment."
  },
  {
    id: "GF-N002",
    code: "N-002",
    name: "Mechanics Laboratory",
    floor: 0,
    block: "North Block",
    category: "lab",
    dept: "Applied Sciences",
    x: 56, y: 32,
    nearestNode: "NORTH_JUNCTION",
    description: "Engineering mechanics force tables, compound pendulum, and pulley test rigs."
  },
  {
    id: "GF-N003",
    code: "N-003",
    name: "HOD Office - Applied Sciences",
    floor: 0,
    block: "North Block",
    category: "office",
    dept: "Applied Sciences",
    x: 60, y: 22,
    nearestNode: "NORTH_JUNCTION",
    description: "Office of the Head of Applied Sciences & Humanities Department."
  },
  {
    id: "GF-N004",
    code: "N-004",
    name: "Classroom N-004",
    floor: 0,
    block: "North Block",
    category: "classroom",
    dept: "Applied Sciences",
    x: 60, y: 32,
    nearestNode: "NORTH_JUNCTION",
    description: "Lecture room N-004 for physics, chemistry and basic engineering classes."
  },
  {
    id: "GF-N005",
    code: "N-005",
    name: "Faculty Cabins (North)",
    floor: 0,
    block: "North Block",
    category: "office",
    dept: "Applied Sciences",
    x: 65, y: 22,
    nearestNode: "NORTH_JUNCTION",
    description: "Faculty cabins for physics, chemistry, and mathematics professors."
  },
  {
    id: "GF-N006",
    code: "N-006",
    name: "Classroom N-006",
    floor: 0,
    block: "North Block",
    category: "classroom",
    dept: "Applied Sciences",
    x: 65, y: 32,
    nearestNode: "NORTH_JUNCTION",
    description: "First year engineering division classroom N-006 with interactive smart board."
  },
  {
    id: "GF-N007",
    code: "N-007",
    name: "Classroom N-007",
    floor: 0,
    block: "North Block",
    category: "classroom",
    dept: "Applied Sciences",
    x: 70, y: 22,
    nearestNode: "NORTH_CORR_EAST",
    description: "Multimedia division classroom N-007 with 70-student capacity."
  },
  {
    id: "GF-N008",
    code: "N-008",
    name: "Classroom N-008",
    floor: 0,
    block: "North Block",
    category: "classroom",
    dept: "Applied Sciences",
    x: 70, y: 32,
    nearestNode: "NORTH_CORR_EAST",
    description: "Undergraduate lecture classroom N-008."
  },
  {
    id: "GF-N009",
    code: "N-009",
    name: "Applied Thermodynamics Laboratory",
    floor: 0,
    block: "North Block",
    category: "lab",
    dept: "Mechanical",
    x: 78, y: 22,
    nearestNode: "NORTH_CORR_EAST",
    description: "Boiler, heat engine, refrigeration test benches and calorimeter setups."
  },
  {
    id: "GF-N010",
    code: "N-010",
    name: "Turbo Machines Laboratory",
    floor: 0,
    block: "North Block",
    category: "lab",
    dept: "Mechanical",
    x: 83, y: 22,
    nearestNode: "NORTH_CORR_EAST",
    description: "Pelton turbine, Francis turbine, centrifugal blower & pump test rigs."
  },
  {
    id: "GF-N011",
    code: "N-011",
    name: "Programming Laboratory (I)",
    floor: 0,
    block: "North Block",
    category: "lab",
    dept: "Computing",
    x: 84, y: 34,
    nearestNode: "NORTH_VERT_TOP",
    description: "General computing and introductory programming workstation lab."
  },
  {
    id: "GF-N012",
    code: "N-012",
    name: "Tutorial Room N-012",
    floor: 0,
    block: "North Block",
    category: "classroom",
    dept: "Applied Sciences",
    x: 76, y: 34,
    nearestNode: "NORTH_VERT_TOP",
    description: "Tutorial room N-012 for small-group academic mentoring and remedial math classes."
  },
  {
    id: "GF-N013",
    code: "N-013",
    name: "Fluid Mechanics Laboratory",
    floor: 0,
    block: "North Block",
    category: "lab",
    dept: "Mechanical & Civil",
    x: 84, y: 44,
    nearestNode: "NORTH_VERT_MID",
    description: "Flow measurement, Reynolds apparatus, Bernoulli theorem demonstration."
  },
  {
    id: "GF-N014",
    code: "N-014",
    name: "Faculty Cabins (North Wing)",
    floor: 0,
    block: "North Block",
    category: "office",
    dept: "Applied Sciences",
    x: 76, y: 44,
    nearestNode: "NORTH_VERT_MID",
    description: "Faculty cabins and student counseling rooms."
  },
  {
    id: "GF-N015",
    code: "N-015",
    name: "Engineering Graphics Laboratory",
    floor: 0,
    block: "North Block",
    category: "lab",
    dept: "Applied Sciences",
    x: 84, y: 55,
    nearestNode: "NORTH_VERT_MID",
    description: "Large drafting tables and CAD workstations for manual & computer drafting."
  },
  {
    id: "GF-N016",
    code: "N-016",
    name: "Classroom N-016",
    floor: 0,
    block: "North Block",
    category: "classroom",
    dept: "Applied Sciences",
    x: 76, y: 56,
    nearestNode: "NORTH_VERT_MID",
    description: "Lecture classroom N-016 for civil and mechanical engineering divisions."
  },
  {
    id: "GF-N017",
    code: "N-017",
    name: "Concrete Technology Laboratory",
    floor: 0,
    block: "North Block",
    category: "lab",
    dept: "Civil",
    x: 85, y: 68,
    nearestNode: "NORTH_VERT_BOT",
    description: "Compression testing machines, slump cones, curing tanks for civil materials."
  },
  {
    id: "GF-N018",
    code: "N-018",
    name: "Classroom N-018",
    floor: 0,
    block: "North Block",
    category: "classroom",
    dept: "Applied Sciences",
    x: 76, y: 70,
    nearestNode: "NORTH_VERT_BOT",
    description: "Division classroom N-018 with multimedia audio-visual facility."
  },
  {
    id: "GF-N019",
    code: "N-019",
    name: "Transportation Engineering Laboratory",
    floor: 0,
    block: "North Block",
    category: "lab",
    dept: "Civil",
    x: 85, y: 77,
    nearestNode: "NORTH_VERT_BOT",
    description: "Bitumen testing, Marshall stability, aggregate impact & abrasion test apparatus."
  },
  {
    id: "GF-N020",
    code: "N-020",
    name: "Geotechnical Engineering Laboratory",
    floor: 0,
    block: "North Block",
    category: "lab",
    dept: "Civil",
    x: 77, y: 77,
    nearestNode: "NORTH_VERT_BOT",
    description: "Direct shear, triaxial, soil compaction, and permeability test equipment."
  },
  {
    id: "GF-NORTH-LOUNGE",
    code: "NB-WL",
    name: "North Block Welcome Lounge",
    floor: 0,
    block: "North Block",
    category: "amenity",
    dept: "Campus Core",
    x: 76, y: 63,
    nearestNode: "NORTH_VERT_MID",
    description: "North Block reception lobby and guest lounge."
  },

  // ==========================================
  // FIRST FLOOR (Floor 1) - IT-Establishment Building
  // ==========================================
  // North Block - Civil Engineering & ASH
  {
    id: "1F-N101",
    code: "N-101",
    name: "Classroom N-101 (Civil)",
    floor: 1,
    block: "North Block",
    category: "classroom",
    dept: "Civil",
    x: 56, y: 22,
    nearestNode: "NORTH_JUNCTION",
    description: "Civil Engineering lecture classroom."
  },
  {
    id: "1F-N102",
    code: "N-102",
    name: "Classroom N-102 (Civil)",
    floor: 1,
    block: "North Block",
    category: "classroom",
    dept: "Civil",
    x: 58, y: 32,
    nearestNode: "NORTH_JUNCTION",
    description: "Civil Engineering lecture classroom."
  },
  {
    id: "1F-N103",
    code: "N-103",
    name: "HOD Office - Civil Engineering",
    floor: 1,
    block: "North Block",
    category: "office",
    dept: "Civil",
    x: 50, y: 22,
    nearestNode: "NORTH_JUNCTION",
    description: "Office of the Head of Civil Engineering Department."
  },
  {
    id: "1F-N104",
    code: "N-104",
    name: "Classroom N-104 (Civil)",
    floor: 1,
    block: "North Block",
    category: "classroom",
    dept: "Civil",
    x: 55, y: 32,
    nearestNode: "NORTH_JUNCTION",
    description: "Civil Engineering lecture classroom."
  },
  {
    id: "1F-N105",
    code: "N-105",
    name: "Classroom N-105 (ASH)",
    floor: 1,
    block: "North Block",
    category: "classroom",
    dept: "Applied Sciences",
    x: 68, y: 22,
    nearestNode: "NORTH_CORR_EAST",
    description: "Applied Sciences & Humanities classroom."
  },
  {
    id: "1F-N106",
    code: "N-106",
    name: "Classroom N-106 (Civil)",
    floor: 1,
    block: "North Block",
    category: "classroom",
    dept: "Civil",
    x: 64, y: 32,
    nearestNode: "NORTH_CORR_EAST",
    description: "Civil Engineering classroom."
  },
  {
    id: "1F-N107",
    code: "N-107",
    name: "Classroom N-107 (Civil)",
    floor: 1,
    block: "North Block",
    category: "classroom",
    dept: "Civil",
    x: 73, y: 22,
    nearestNode: "NORTH_CORR_EAST",
    description: "Civil Engineering classroom."
  },
  {
    id: "1F-N108",
    code: "N-108",
    name: "Open Atrium (1st Floor)",
    floor: 1,
    block: "North Block",
    category: "amenity",
    dept: "Campus Core",
    x: 50, y: 28,
    nearestNode: "NORTH_JUNCTION",
    description: "Open central atrium area on the 1st floor."
  },
  {
    id: "1F-N109",
    code: "N-109",
    name: "Engineering Chemistry Lab 01",
    floor: 1,
    block: "North Block",
    category: "lab",
    dept: "Applied Sciences",
    x: 62, y: 22,
    nearestNode: "NORTH_CORR_EAST",
    description: "Spectrophotometers, pH meters, water quality testing bench."
  },
  {
    id: "1F-N110",
    code: "N-110",
    name: "Classroom N-110 (ASH)",
    floor: 1,
    block: "North Block",
    category: "classroom",
    dept: "Applied Sciences",
    x: 79, y: 22,
    nearestNode: "NORTH_CORR_EAST",
    description: "Applied Sciences & Humanities classroom."
  },
  {
    id: "1F-N111",
    code: "N-111",
    name: "Classroom N-111",
    floor: 1,
    block: "North Block",
    category: "classroom",
    dept: "Applied Sciences",
    x: 85, y: 30,
    nearestNode: "NORTH_VERT_TOP",
    description: "1st floor North Block classroom."
  },
  {
    id: "1F-N112",
    code: "N-112",
    name: "Language Lab (ASH)",
    floor: 1,
    block: "North Block",
    category: "lab",
    dept: "Applied Sciences",
    x: 76, y: 32,
    nearestNode: "NORTH_CORR_EAST",
    description: "English and communication language laboratory with audio consoles."
  },
  {
    id: "1F-N113",
    code: "N-113",
    name: "Engineering Geology Laboratory",
    floor: 1,
    block: "North Block",
    category: "lab",
    dept: "Civil",
    x: 66, y: 46,
    nearestNode: "NORTH_VERT_MID",
    description: "Mineral & rock specimens, stereoscopes, geological map analysis tables."
  },
  {
    id: "1F-N114",
    code: "N-114",
    name: "Language Lab 02 (ASH)",
    floor: 1,
    block: "North Block",
    category: "lab",
    dept: "Applied Sciences",
    x: 76, y: 40,
    nearestNode: "NORTH_VERT_MID",
    description: "Advanced language lab with listening stations and multimedia."
  },
  {
    id: "1F-N115",
    code: "N-115",
    name: "Classroom N-115 (ASH)",
    floor: 1,
    block: "North Block",
    category: "classroom",
    dept: "Applied Sciences",
    x: 85, y: 40,
    nearestNode: "NORTH_VERT_MID",
    description: "Applied Sciences classroom N-115."
  },
  {
    id: "1F-N116",
    code: "N-116",
    name: "Classroom N-116 (Civil)",
    floor: 1,
    block: "North Block",
    category: "classroom",
    dept: "Civil",
    x: 73, y: 48,
    nearestNode: "NORTH_VERT_MID",
    description: "Civil Engineering classroom N-116."
  },
  {
    id: "1F-N117",
    code: "N-117",
    name: "Classroom N-117",
    floor: 1,
    block: "North Block",
    category: "classroom",
    dept: "Applied Sciences",
    x: 85, y: 56,
    nearestNode: "NORTH_VERT_MID",
    description: "1st floor classroom N-117."
  },
  {
    id: "1F-N118",
    code: "N-118",
    name: "Engineering Physics Lab 01",
    floor: 1,
    block: "North Block",
    category: "lab",
    dept: "Applied Sciences",
    x: 61, y: 65,
    nearestNode: "NORTH_VERT_BOT",
    description: "Laser optics, spectrometer, Hall effect, and bandgap measurement rigs."
  },
  {
    id: "1F-N119",
    code: "N-119",
    name: "Classroom N-119 (ASH)",
    floor: 1,
    block: "North Block",
    category: "classroom",
    dept: "Applied Sciences",
    x: 85, y: 65,
    nearestNode: "NORTH_VERT_BOT",
    description: "Applied Sciences lecture classroom N-119."
  },
  {
    id: "1F-N120",
    code: "N-120",
    name: "Engineering Physics Lab 02",
    floor: 1,
    block: "North Block",
    category: "lab",
    dept: "Applied Sciences",
    x: 61, y: 73,
    nearestNode: "NORTH_VERT_BOT",
    description: "Advanced darkroom laser experiments, fiber optics, ultrasonic interferometer."
  },
  // South Block - CSE, ECE, Electrical
  {
    id: "1F-S101",
    code: "S-101",
    name: "Classroom S-101",
    floor: 1,
    block: "South Block",
    category: "classroom",
    dept: "Computer Science",
    x: 42, y: 22,
    nearestNode: "SOUTH_JUNCTION",
    description: "1st floor South Block CSE classroom."
  },
  {
    id: "1F-S102",
    code: "S-102",
    name: "Classroom S-102",
    floor: 1,
    block: "South Block",
    category: "classroom",
    dept: "Computer Science",
    x: 42, y: 32,
    nearestNode: "SOUTH_JUNCTION",
    description: "1st floor South Block classroom."
  },
  {
    id: "1F-S103",
    code: "S-103",
    name: "Classroom S-103 (CSE)",
    floor: 1,
    block: "South Block",
    category: "classroom",
    dept: "Computer Science",
    x: 36, y: 22,
    nearestNode: "SOUTH_JUNCTION",
    description: "CSE lecture classroom S-103."
  },
  {
    id: "1F-S104",
    code: "S-104",
    name: "Classroom S-104",
    floor: 1,
    block: "South Block",
    category: "classroom",
    dept: "Computer Science",
    x: 36, y: 32,
    nearestNode: "SOUTH_JUNCTION",
    description: "1st floor CSE classroom S-104."
  },
  {
    id: "1F-S105",
    code: "S-105",
    name: "PG / Research Laboratory (ECE)",
    floor: 1,
    block: "South Block",
    category: "lab",
    dept: "Electronics & Comm.",
    x: 30, y: 22,
    nearestNode: "SOUTH_JUNCTION",
    description: "FPGA boards, DSP kits, spectrum analyzers, high-speed DSO."
  },
  {
    id: "1F-S106",
    code: "S-106",
    name: "Smart Wireless & Digital Lab",
    floor: 1,
    block: "South Block",
    category: "lab",
    dept: "Electronics & Comm.",
    x: 30, y: 32,
    nearestNode: "SOUTH_JUNCTION",
    description: "Software-defined radio, antenna arrays, IoT gateways."
  },
  {
    id: "1F-S107",
    code: "S-107",
    name: "Basic Electrical Engineering (BEE) Lab",
    floor: 1,
    block: "South Block",
    category: "lab",
    dept: "Electrical & Electronics",
    x: 26, y: 22,
    nearestNode: "SOUTH_CORR_WEST",
    description: "Three-phase transformers, AC/DC motors, circuit network analyzers."
  },
  {
    id: "1F-S108",
    code: "S-108",
    name: "Th. Lab / Theory Lab",
    floor: 1,
    block: "South Block",
    category: "lab",
    dept: "Electronics & Comm.",
    x: 24, y: 32,
    nearestNode: "SOUTH_CORR_WEST",
    description: "Theory and tutorial lab for ECE/EE students."
  },
  {
    id: "1F-S109",
    code: "S-109",
    name: "Classroom S-109",
    floor: 1,
    block: "South Block",
    category: "classroom",
    dept: "Computer Science",
    x: 22, y: 22,
    nearestNode: "SOUTH_CORR_WEST",
    description: "1st floor South Block classroom."
  },
  {
    id: "1F-S110",
    code: "S-110",
    name: "Classroom S-110 (CSE)",
    floor: 1,
    block: "South Block",
    category: "classroom",
    dept: "Computer Science",
    x: 16, y: 22,
    nearestNode: "SOUTH_VERT_TOP",
    description: "CSE classroom S-110."
  },
  {
    id: "1F-S111",
    code: "S-111",
    name: "Classroom S-111",
    floor: 1,
    block: "South Block",
    category: "classroom",
    dept: "Computer Science",
    x: 22, y: 32,
    nearestNode: "SOUTH_CORR_WEST",
    description: "1st floor South Block classroom."
  },
  {
    id: "1F-S112",
    code: "S-112",
    name: "Computer Lab CSE",
    floor: 1,
    block: "South Block",
    category: "lab",
    dept: "Computer Science",
    x: 22, y: 40,
    nearestNode: "SOUTH_VERT_TOP",
    description: "Programming lab with 40 workstations for CSE students."
  },
  {
    id: "1F-S113",
    code: "S-113",
    name: "Classroom S-113 (CSE)",
    floor: 1,
    block: "South Block",
    category: "classroom",
    dept: "Computer Science",
    x: 16, y: 40,
    nearestNode: "SOUTH_VERT_TOP",
    description: "CSE lecture classroom S-113."
  },
  {
    id: "1F-S114",
    code: "S-114",
    name: "Computer Lab CSE-2",
    floor: 1,
    block: "South Block",
    category: "lab",
    dept: "Computer Science",
    x: 22, y: 48,
    nearestNode: "SOUTH_VERT_MID",
    description: "Advanced CSE programming lab."
  },
  {
    id: "1F-S115",
    code: "S-115",
    name: "HOD Office - Computer Science",
    floor: 1,
    block: "South Block",
    category: "office",
    dept: "Computer Science",
    x: 16, y: 48,
    nearestNode: "SOUTH_VERT_MID",
    description: "Department Head Office for Computer Science and Engineering."
  },
  {
    id: "1F-S116",
    code: "S-116",
    name: "FB-CSE (Faculty Block)",
    floor: 1,
    block: "South Block",
    category: "office",
    dept: "Computer Science",
    x: 22, y: 56,
    nearestNode: "SOUTH_VERT_MID",
    description: "CSE faculty cabins and staff workstations."
  },
  {
    id: "1F-S117",
    code: "S-117",
    name: "Programming Lab (ASH)",
    floor: 1,
    block: "South Block",
    category: "lab",
    dept: "Applied Sciences",
    x: 16, y: 56,
    nearestNode: "SOUTH_VERT_MID",
    description: "Programming and computing lab for first-year students."
  },
  {
    id: "1F-S118",
    code: "S-118",
    name: "Classroom S-118 (ASH)",
    floor: 1,
    block: "South Block",
    category: "classroom",
    dept: "Applied Sciences",
    x: 22, y: 65,
    nearestNode: "SOUTH_VERT_BOT",
    description: "Applied Sciences classroom S-118."
  },
  {
    id: "1F-S119",
    code: "S-119",
    name: "Programming Laboratory (ASH)",
    floor: 1,
    block: "South Block",
    category: "lab",
    dept: "Applied Sciences",
    x: 16, y: 65,
    nearestNode: "SOUTH_VERT_BOT",
    description: "First-year programming lab with C/C++ workstations."
  },
  {
    id: "1F-S120",
    code: "S-120",
    name: "Classroom S-120 (ASH)",
    floor: 1,
    block: "South Block",
    category: "classroom",
    dept: "Applied Sciences",
    x: 22, y: 73,
    nearestNode: "SOUTH_VERT_BOT",
    description: "Applied Sciences lecture classroom S-120."
  },

  // ==========================================
  // SECOND FLOOR (Floor 2) - Mechanical Engineering
  // ==========================================
  {
    id: "2F-S201",
    code: "S-201",
    name: "HOD Office - Mechanical Engineering (South)",
    floor: 2,
    block: "South Block",
    category: "office",
    dept: "Mechanical",
    x: 42, y: 22,
    nearestNode: "SOUTH_JUNCTION",
    description: "HOD Office for Mechanical Engineering South Block."
  },
  {
    id: "2F-S203",
    code: "S-203",
    name: "Project Lab (Mech)",
    floor: 2,
    block: "South Block",
    category: "lab",
    dept: "Mechanical",
    x: 36, y: 22,
    nearestNode: "SOUTH_JUNCTION",
    description: "Project and prototype development lab for Mechanical Engineering."
  },
  {
    id: "2F-S205",
    code: "S-205",
    name: "Communication Lab",
    floor: 2,
    block: "South Block",
    category: "lab",
    dept: "Electronics",
    x: 30, y: 22,
    nearestNode: "SOUTH_JUNCTION",
    description: "Communication systems lab."
  },
  {
    id: "2F-S207",
    code: "S-207",
    name: "Communication Laboratory",
    floor: 2,
    block: "South Block",
    category: "lab",
    dept: "Electronics",
    x: 28, y: 22,
    nearestNode: "SOUTH_JUNCTION",
    description: "Analog and digital communication kits, RF signal generators."
  },
  {
    id: "2F-S208",
    code: "S-208",
    name: "Admission Centre (2F)",
    floor: 2,
    block: "South Block",
    category: "admin",
    dept: "Admissions",
    x: 36, y: 32,
    nearestNode: "SOUTH_JUNCTION",
    description: "Admission assistance centre on 2nd floor."
  },
  {
    id: "2F-S209",
    code: "S-209",
    name: "Classroom S-209",
    floor: 2,
    block: "South Block",
    category: "classroom",
    dept: "Computer Science",
    x: 22, y: 22,
    nearestNode: "SOUTH_CORR_WEST",
    description: "CSE/Mech classroom S-209."
  },
  {
    id: "2F-S210",
    code: "S-210",
    name: "Classroom S-210",
    floor: 2,
    block: "South Block",
    category: "classroom",
    dept: "Computer Science",
    x: 16, y: 22,
    nearestNode: "SOUTH_VERT_TOP",
    description: "2nd floor South Block classroom S-210."
  },
  {
    id: "2F-S211",
    code: "S-211",
    name: "FB-CSE (Faculty Block)",
    floor: 2,
    block: "South Block",
    category: "office",
    dept: "Computer Science",
    x: 22, y: 32,
    nearestNode: "SOUTH_CORR_WEST",
    description: "CSE Faculty cabin block on 2nd floor."
  },
  {
    id: "2F-S212",
    code: "S-212",
    name: "TR CSE (Tutorial Room)",
    floor: 2,
    block: "South Block",
    category: "classroom",
    dept: "Computer Science",
    x: 16, y: 32,
    nearestNode: "SOUTH_VERT_TOP",
    description: "Tutorial/seminar room for CSE."
  },
  {
    id: "2F-S215",
    code: "S-215",
    name: "FB-CSE (Faculty Block 2)",
    floor: 2,
    block: "South Block",
    category: "office",
    dept: "Computer Science",
    x: 16, y: 48,
    nearestNode: "SOUTH_VERT_MID",
    description: "Additional CSE faculty block area."
  },
  {
    id: "2F-S216",
    code: "S-216",
    name: "Computer Lab CSE-3",
    floor: 2,
    block: "South Block",
    category: "lab",
    dept: "Computer Science",
    x: 22, y: 56,
    nearestNode: "SOUTH_VERT_MID",
    description: "Advanced programming and networking lab."
  },
  {
    id: "2F-S217",
    code: "S-217",
    name: "Computer Lab CSE-4",
    floor: 2,
    block: "South Block",
    category: "lab",
    dept: "Computer Science",
    x: 16, y: 56,
    nearestNode: "SOUTH_VERT_MID",
    description: "Full-stack development and cloud computing lab."
  },
  {
    id: "2F-S218",
    code: "S-218",
    name: "CR CSE (Computer Room)",
    floor: 2,
    block: "South Block",
    category: "lab",
    dept: "Computer Science",
    x: 22, y: 65,
    nearestNode: "SOUTH_VERT_BOT",
    description: "Computer room for CSE coursework."
  },
  {
    id: "2F-S219",
    code: "S-219",
    name: "Computer Lab CSE-5",
    floor: 2,
    block: "South Block",
    category: "lab",
    dept: "Computer Science",
    x: 16, y: 65,
    nearestNode: "SOUTH_VERT_BOT",
    description: "CSE lab with high-performance workstations."
  },
  {
    id: "2F-S220",
    code: "S-220",
    name: "CR CSE (Computer Room 2)",
    floor: 2,
    block: "South Block",
    category: "lab",
    dept: "Computer Science",
    x: 22, y: 73,
    nearestNode: "SOUTH_VERT_BOT",
    description: "Second computer room CSE."
  },
  {
    id: "2F-S221",
    code: "S-221",
    name: "Computer Lab CSE-6",
    floor: 2,
    block: "South Block",
    category: "lab",
    dept: "Computer Science",
    x: 16, y: 73,
    nearestNode: "SOUTH_VERT_BOT",
    description: "CSE computational lab for final year projects."
  },
  {
    id: "2F-N203",
    code: "N-203",
    name: "HOD Office - Mechanical Engineering",
    floor: 2,
    block: "North Block",
    category: "office",
    dept: "Mechanical",
    x: 57, y: 22,
    nearestNode: "NORTH_JUNCTION",
    description: "Head of Mechanical Engineering Department Cabin & Meeting Room."
  },
  {
    id: "2F-N204",
    code: "N-204",
    name: "Theory of Machines Laboratory",
    floor: 2,
    block: "North Block",
    category: "lab",
    dept: "Mechanical",
    x: 57, y: 32,
    nearestNode: "NORTH_JUNCTION",
    description: "Gyroscopes, governor test rigs, cam analysis, balancing machines."
  },
  {
    id: "2F-N206",
    code: "N-206",
    name: "Mechanical Vibrations Laboratory",
    floor: 2,
    block: "North Block",
    category: "lab",
    dept: "Mechanical",
    x: 61, y: 32,
    nearestNode: "NORTH_CORR_EAST",
    description: "Vibration exciter, FFT analyzers, damping measurement setups."
  },
  {
    id: "2F-N213",
    code: "N-213",
    name: "Heat Transfer Laboratory",
    floor: 2,
    block: "North Block",
    category: "lab",
    dept: "Mechanical",
    x: 76, y: 42,
    nearestNode: "NORTH_VERT_MID",
    description: "Conduction, convection, radiation heat exchangers, thermal conductivity rigs."
  },
  {
    id: "2F-N214",
    code: "N-214",
    name: "CAD / CAM Laboratory",
    floor: 2,
    block: "North Block",
    category: "lab",
    dept: "Mechanical",
    x: 70, y: 42,
    nearestNode: "NORTH_VERT_MID",
    description: "SolidWorks, CATIA, ANSYS, and CNC code simulation workstations."
  },
  {
    id: "2F-N215",
    code: "N-215",
    name: "Solar Energy Laboratory",
    floor: 2,
    block: "North Block",
    category: "lab",
    dept: "Mechanical",
    x: 76, y: 49,
    nearestNode: "NORTH_VERT_MID",
    description: "Solar PV simulator, solar thermal collector, pyranometer equipment."
  },
  {
    id: "2F-N217",
    code: "N-217",
    name: "Metrology & Quality Control Lab",
    floor: 2,
    block: "North Block",
    category: "lab",
    dept: "Mechanical",
    x: 70, y: 58,
    nearestNode: "NORTH_VERT_BOT",
    description: "Optical comparators, coordinate measuring machines, surface roughness testers."
  },
  {
    id: "2F-S207",
    code: "S-207",
    name: "Communication Laboratory",
    floor: 2,
    block: "South Block",
    category: "lab",
    dept: "Electronics",
    x: 28, y: 22,
    nearestNode: "SOUTH_JUNCTION",
    description: "Analog and digital communication kits, RF signal generators."
  },
  {
    id: "2F-S213",
    code: "S-213",
    name: "Computer Programming Lab CSE-1",
    floor: 2,
    block: "South Block",
    category: "lab",
    dept: "Computer Science",
    x: 16, y: 40,
    nearestNode: "SOUTH_VERT_TOP",
    description: "Advanced Python, Java and C++ programming workstations."
  },
  {
    id: "2F-S214",
    code: "S-214",
    name: "Computer Programming Lab CSE-2",
    floor: 2,
    block: "South Block",
    category: "lab",
    dept: "Computer Science",
    x: 23, y: 40,
    nearestNode: "SOUTH_VERT_TOP",
    description: "Data structures, algorithms and database development lab."
  },

  // North Block additional rooms
  {
    id: "2F-N205",
    code: "N-205",
    name: "Faculty Cabin (Mech)",
    floor: 2,
    block: "North Block",
    category: "office",
    dept: "Mechanical",
    x: 65, y: 22,
    nearestNode: "NORTH_CORR_EAST",
    description: "Faculty cabin block for Mechanical Engineering staff."
  },
  {
    id: "2F-N207",
    code: "N-207",
    name: "Classroom N-207 (Mech)",
    floor: 2,
    block: "North Block",
    category: "classroom",
    dept: "Mechanical",
    x: 70, y: 22,
    nearestNode: "NORTH_CORR_EAST",
    description: "Mechanical Engineering lecture classroom."
  },
  {
    id: "2F-N209",
    code: "N-209",
    name: "Refrigeration & AC Lab",
    floor: 2,
    block: "North Block",
    category: "lab",
    dept: "Mechanical",
    x: 85, y: 22,
    nearestNode: "NORTH_VERT_TOP",
    description: "Vapour compression refrigeration cycle, air conditioning demonstrators."
  },
  {
    id: "2F-N210",
    code: "N-210",
    name: "Refrigeration Lab",
    floor: 2,
    block: "North Block",
    category: "lab",
    dept: "Mechanical",
    x: 85, y: 30,
    nearestNode: "NORTH_VERT_TOP",
    description: "Refrigeration cycle testing and thermal analysis equipment."
  },
  {
    id: "2F-N211",
    code: "N-211",
    name: "Engineering Thermodynamics Lab",
    floor: 2,
    block: "North Block",
    category: "lab",
    dept: "Mechanical",
    x: 85, y: 38,
    nearestNode: "NORTH_VERT_TOP",
    description: "Steam turbine models, IC engine test rigs, thermocouple calibration."
  },
  {
    id: "2F-N212",
    code: "N-212",
    name: "PG Lab (Mech)",
    floor: 2,
    block: "North Block",
    category: "lab",
    dept: "Mechanical",
    x: 76, y: 22,
    nearestNode: "NORTH_CORR_EAST",
    description: "Post-graduate research lab for M.Tech Mechanical students."
  },
  {
    id: "2F-N216",
    code: "N-216",
    name: "Geometric Modeling Lab",
    floor: 2,
    block: "North Block",
    category: "lab",
    dept: "Mechanical",
    x: 76, y: 56,
    nearestNode: "NORTH_VERT_MID",
    description: "Advanced CAD geometric modeling and CNC simulation lab."
  },
  {
    id: "2F-N218",
    code: "N-218",
    name: "Classroom N-218",
    floor: 2,
    block: "North Block",
    category: "classroom",
    dept: "Mechanical",
    x: 85, y: 65,
    nearestNode: "NORTH_VERT_BOT",
    description: "2nd floor North Block classroom."
  },
  {
    id: "2F-N219",
    code: "N-219",
    name: "Classroom N-219",
    floor: 2,
    block: "North Block",
    category: "classroom",
    dept: "Mechanical",
    x: 76, y: 65,
    nearestNode: "NORTH_VERT_BOT",
    description: "Mechanical Engineering classroom N-219."
  },
  {
    id: "2F-N220",
    code: "N-220",
    name: "Classroom N-220",
    floor: 2,
    block: "North Block",
    category: "classroom",
    dept: "Mechanical",
    x: 85, y: 73,
    nearestNode: "NORTH_VERT_BOT",
    description: "2nd floor Mechanical Engineering classroom."
  },
  {
    id: "2F-N221",
    code: "N-221",
    name: "Classroom N-221",
    floor: 2,
    block: "North Block",
    category: "classroom",
    dept: "Mechanical",
    x: 76, y: 73,
    nearestNode: "NORTH_VERT_BOT",
    description: "2nd floor Mechanical Engineering classroom N-221."
  },

  // ==========================================
  // THIRD FLOOR (Floor 3) - Core Admin & Library
  // ==========================================
  {
    id: "3F-BOARD-ROOM",
    code: "BOARD-ROOM",
    name: "Board Meeting & Conference Hall",
    floor: 3,
    block: "Central",
    category: "admin",
    dept: "Executive Office",
    x: 55, y: 24,
    nearestNode: "LOUNGE",
    description: "Prestigious executive meeting hall for academic senate and university dignitaries."
  },
  {
    id: "3F-VP-OFFICE",
    code: "VP-01",
    name: "Vice-Principal Office",
    floor: 3,
    block: "Central",
    category: "office",
    dept: "Executive Office",
    x: 63, y: 23,
    nearestNode: "NORTH_JUNCTION",
    description: "Office of the Vice-Principal, MIT School of Engineering."
  },
  {
    id: "3F-N303",
    code: "N-303",
    name: "Engineering Principal Office",
    floor: 3,
    block: "North Block",
    category: "office",
    dept: "Executive Office",
    x: 67, y: 23,
    nearestNode: "NORTH_JUNCTION",
    description: "Principal Cabin, MIT School of Engineering (SOE)."
  },
  {
    id: "3F-N304",
    code: "N-304",
    name: "Administration Office (Main)",
    floor: 3,
    block: "North Block",
    category: "admin",
    dept: "Administration",
    x: 66, y: 34,
    nearestNode: "NORTH_JUNCTION",
    description: "Central administrative office for student affairs, transcripts, and verifications."
  },
  {
    id: "3F-N306",
    code: "N-306",
    name: "Administration Accounts Office",
    floor: 3,
    block: "North Block",
    category: "admin",
    dept: "Administration",
    x: 71, y: 34,
    nearestNode: "NORTH_CORR_EAST",
    description: "Student scholarships, exam fees, and billing assistance."
  },
  {
    id: "3F-N307",
    code: "N-307",
    name: "Research Classroom",
    floor: 3,
    block: "North Block",
    category: "classroom",
    dept: "Research",
    x: 77, y: 23,
    nearestNode: "NORTH_CORR_EAST",
    description: "PhD scholar symposium room and sponsored research meeting space."
  },
  {
    id: "3F-N308",
    code: "N-308",
    name: "Admission Counseling Room",
    floor: 3,
    block: "North Block",
    category: "admin",
    dept: "Admissions",
    x: 76, y: 34,
    nearestNode: "NORTH_CORR_EAST",
    description: "Higher semester counseling and branch transfer cell."
  },
  {
    id: "3F-N314",
    code: "N-314",
    name: "Central Engineering Library",
    floor: 3,
    block: "North Block",
    category: "library",
    dept: "University Library",
    x: 84, y: 44,
    nearestNode: "NORTH_VERT_MID",
    description: "World-class library housing 100,000+ technical volumes, digital journals & IEEE access."
  },
  {
    id: "3F-N319",
    code: "N-319",
    name: "Large Study & Reading Hall",
    floor: 3,
    block: "North Block",
    category: "library",
    dept: "University Library",
    x: 83, y: 64,
    nearestNode: "NORTH_VERT_BOT",
    description: "Silent study zone with 400 seating capacity, power sockets, and natural lighting."
  },
  {
    id: "3F-S303",
    code: "S-303",
    name: "CRIYA Laboratory 01",
    floor: 3,
    block: "South Block",
    category: "lab",
    dept: "CRIYA Research",
    x: 43, y: 22,
    nearestNode: "SOUTH_JUNCTION",
    description: "Center for Research, Innovation, Youth and Architecture innovation bay."
  },
  {
    id: "3F-S305",
    code: "S-305",
    name: "CRIYA Laboratory 02",
    floor: 3,
    block: "South Block",
    category: "lab",
    dept: "CRIYA Research",
    x: 37, y: 22,
    nearestNode: "SOUTH_JUNCTION",
    description: "Hardware incubation, maker space, and student patent development."
  },
  {
    id: "3F-S307",
    code: "S-307",
    name: "CRIYA Laboratory 03",
    floor: 3,
    block: "South Block",
    category: "lab",
    dept: "CRIYA Research",
    x: 31, y: 22,
    nearestNode: "SOUTH_CORR_WEST",
    description: "Robotics and smart systems multidisciplinary workshop."
  },
  {
    id: "3F-S304",
    code: "S-304",
    name: "CRIYA Research Bay A",
    floor: 3,
    block: "South Block",
    category: "lab",
    dept: "CRIYA Research",
    x: 43, y: 32,
    nearestNode: "SOUTH_JUNCTION",
    description: "Advanced simulation, sensor integration, and embedded test stations."
  },
  {
    id: "3F-S306",
    code: "S-306",
    name: "CRIYA Research Bay B",
    floor: 3,
    block: "South Block",
    category: "lab",
    dept: "CRIYA Research",
    x: 37, y: 32,
    nearestNode: "SOUTH_JUNCTION",
    description: "Rapid prototyping, 3D printing cluster, and product design space."
  },
  // Additional 3rd floor rooms from floor plan
  {
    id: "3F-S308",
    code: "S-308",
    name: "CRIYA Laboratory 04",
    floor: 3,
    block: "South Block",
    category: "lab",
    dept: "CRIYA Research",
    x: 31, y: 32,
    nearestNode: "SOUTH_CORR_WEST",
    description: "CRIYA Lab 04 - Innovation and product testing space."
  },
  {
    id: "3F-S309",
    code: "S-309",
    name: "Research Room S-309 (R)",
    floor: 3,
    block: "South Block",
    category: "classroom",
    dept: "Research",
    x: 24, y: 22,
    nearestNode: "SOUTH_CORR_WEST",
    description: "Research room S-309."
  },
  {
    id: "3F-S310",
    code: "S-310",
    name: "Research Room S-310 (R)",
    floor: 3,
    block: "South Block",
    category: "classroom",
    dept: "Research",
    x: 16, y: 22,
    nearestNode: "SOUTH_VERT_TOP",
    description: "Research room S-310."
  },
  {
    id: "3F-S311",
    code: "S-311",
    name: "Research Room S-311 (R)",
    floor: 3,
    block: "South Block",
    category: "classroom",
    dept: "Research",
    x: 16, y: 32,
    nearestNode: "SOUTH_VERT_TOP",
    description: "Research room S-311."
  },
  {
    id: "3F-S313",
    code: "S-313",
    name: "Research Room S-313 (R)",
    floor: 3,
    block: "South Block",
    category: "classroom",
    dept: "Research",
    x: 16, y: 40,
    nearestNode: "SOUTH_VERT_TOP",
    description: "Research room S-313."
  },
  {
    id: "3F-S314",
    code: "S-314",
    name: "Research Room S-314 (R)",
    floor: 3,
    block: "South Block",
    category: "classroom",
    dept: "Research",
    x: 22, y: 40,
    nearestNode: "SOUTH_VERT_TOP",
    description: "Research room S-314."
  },
  {
    id: "3F-S315",
    code: "S-315",
    name: "Research Room S-315 (R)",
    floor: 3,
    block: "South Block",
    category: "classroom",
    dept: "Research",
    x: 16, y: 48,
    nearestNode: "SOUTH_VERT_MID",
    description: "Research room S-315."
  },
  {
    id: "3F-S316",
    code: "S-316",
    name: "Research Room S-316 (R)",
    floor: 3,
    block: "South Block",
    category: "classroom",
    dept: "Research",
    x: 22, y: 48,
    nearestNode: "SOUTH_VERT_MID",
    description: "Research room S-316."
  },
  {
    id: "3F-S317",
    code: "S-317",
    name: "Research Room S-317 (R)",
    floor: 3,
    block: "South Block",
    category: "classroom",
    dept: "Research",
    x: 16, y: 56,
    nearestNode: "SOUTH_VERT_MID",
    description: "Research room S-317."
  },
  {
    id: "3F-S318",
    code: "S-318",
    name: "Research Room S-318 (R)",
    floor: 3,
    block: "South Block",
    category: "classroom",
    dept: "Research",
    x: 22, y: 65,
    nearestNode: "SOUTH_VERT_BOT",
    description: "Research room S-318."
  },
  {
    id: "3F-S319",
    code: "S-319",
    name: "Research Room S-319 (R)",
    floor: 3,
    block: "South Block",
    category: "classroom",
    dept: "Research",
    x: 16, y: 65,
    nearestNode: "SOUTH_VERT_BOT",
    description: "Research room S-319."
  },
  {
    id: "3F-S320",
    code: "S-320",
    name: "Research Room S-320 (R)",
    floor: 3,
    block: "South Block",
    category: "classroom",
    dept: "Research",
    x: 22, y: 73,
    nearestNode: "SOUTH_VERT_BOT",
    description: "Research room S-320."
  },
  {
    id: "3F-S321",
    code: "S-321",
    name: "Research Room S-321 (R)",
    floor: 3,
    block: "South Block",
    category: "classroom",
    dept: "Research",
    x: 16, y: 73,
    nearestNode: "SOUTH_VERT_BOT",
    description: "Research room S-321."
  },
  // North Block 3rd floor missing rooms
  {
    id: "3F-N305",
    code: "N-305",
    name: "Research Classroom N-305",
    floor: 3,
    block: "North Block",
    category: "classroom",
    dept: "Research",
    x: 72, y: 23,
    nearestNode: "NORTH_CORR_EAST",
    description: "PhD scholar and research classroom."
  },
  {
    id: "3F-N309",
    code: "N-309",
    name: "Faculty Cabins-2",
    floor: 3,
    block: "North Block",
    category: "office",
    dept: "Administration",
    x: 85, y: 22,
    nearestNode: "NORTH_VERT_TOP",
    description: "Second set of faculty cabins on 3rd floor North Block."
  },
  {
    id: "3F-N310",
    code: "N-310",
    name: "Faculty Cabins-1",
    floor: 3,
    block: "North Block",
    category: "office",
    dept: "Administration",
    x: 79, y: 22,
    nearestNode: "NORTH_CORR_EAST",
    description: "First set of faculty cabins on 3rd floor North Block."
  },
  {
    id: "3F-N311",
    code: "N-311",
    name: "Office/Room N-311",
    floor: 3,
    block: "North Block",
    category: "office",
    dept: "Administration",
    x: 85, y: 30,
    nearestNode: "NORTH_VERT_TOP",
    description: "Administrative or faculty room N-311."
  },
  {
    id: "3F-N312",
    code: "N-312",
    name: "Room N-312",
    floor: 3,
    block: "North Block",
    category: "office",
    dept: "Administration",
    x: 85, y: 38,
    nearestNode: "NORTH_VERT_TOP",
    description: "Room N-312, North Block 3rd floor."
  },
  {
    id: "3F-N313",
    code: "N-313",
    name: "Room N-313",
    floor: 3,
    block: "North Block",
    category: "office",
    dept: "Administration",
    x: 76, y: 38,
    nearestNode: "NORTH_VERT_MID",
    description: "Room N-313, North Block 3rd floor."
  },
  {
    id: "3F-N315",
    code: "N-315",
    name: "Library Section N-315",
    floor: 3,
    block: "North Block",
    category: "library",
    dept: "University Library",
    x: 76, y: 50,
    nearestNode: "NORTH_VERT_MID",
    description: "Library section N-315 for reference books."
  },
  {
    id: "3F-N316",
    code: "N-316",
    name: "Library Section N-316",
    floor: 3,
    block: "North Block",
    category: "library",
    dept: "University Library",
    x: 85, y: 50,
    nearestNode: "NORTH_VERT_MID",
    description: "Library section N-316."
  },
  {
    id: "3F-N317",
    code: "N-317",
    name: "Library/Room N-317",
    floor: 3,
    block: "North Block",
    category: "library",
    dept: "University Library",
    x: 76, y: 58,
    nearestNode: "NORTH_VERT_MID",
    description: "Library/reading room N-317."
  },
  {
    id: "3F-N318",
    code: "N-318",
    name: "Reading Hall Annex N-318",
    floor: 3,
    block: "North Block",
    category: "library",
    dept: "University Library",
    x: 85, y: 65,
    nearestNode: "NORTH_VERT_BOT",
    description: "Reading hall annex N-318."
  },
  {
    id: "3F-N320",
    code: "N-320",
    name: "Reading Hall Section N-320",
    floor: 3,
    block: "North Block",
    category: "library",
    dept: "University Library",
    x: 85, y: 73,
    nearestNode: "NORTH_VERT_BOT",
    description: "Main Reading Hall extended section N-320."
  },
  {
    id: "3F-N321",
    code: "N-321",
    name: "Reading Hall Section N-321",
    floor: 3,
    block: "North Block",
    category: "library",
    dept: "University Library",
    x: 76, y: 73,
    nearestNode: "NORTH_VERT_BOT",
    description: "Reading Hall extension N-321 with study tables."
  },

  // ==========================================
  // FOURTH FLOOR (Floor 4) - Aerospace Engineering
  // ==========================================
  {
    id: "4F-N401",
    code: "N-401",
    name: "HOD Office - Aerospace Engineering",
    floor: 4,
    block: "North Block",
    category: "office",
    dept: "Aerospace",
    x: 55, y: 22,
    nearestNode: "NORTH_JUNCTION",
    description: "Head of Aerospace Engineering Department Office."
  },
  {
    id: "4F-N402",
    code: "N-402",
    name: "Classroom N-402 (Aerospace)",
    floor: 4,
    block: "North Block",
    category: "classroom",
    dept: "Aerospace",
    x: 56, y: 32,
    nearestNode: "NORTH_JUNCTION",
    description: "Aerospace Engineering lecture classroom."
  },
  {
    id: "4F-N403",
    code: "N-403",
    name: "HOD Office - Aerospace Engineering",
    floor: 4,
    block: "North Block",
    category: "office",
    dept: "Aerospace",
    x: 61, y: 25,
    nearestNode: "NORTH_JUNCTION",
    description: "Head of Aerospace Engineering Department Office."
  },
  {
    id: "4F-N404",
    code: "N-404",
    name: "Aircraft Propulsion Laboratory",
    floor: 4,
    block: "North Block",
    category: "lab",
    dept: "Aerospace",
    x: 61, y: 35,
    nearestNode: "NORTH_JUNCTION",
    description: "Gas turbine mockups, ramjet demonstrator, nozzle flow test rigs."
  },
  {
    id: "4F-N406",
    code: "N-406",
    name: "Flight Dynamics & Avionics Lab",
    floor: 4,
    block: "North Block",
    category: "lab",
    dept: "Aerospace",
    x: 66, y: 35,
    nearestNode: "NORTH_CORR_EAST",
    description: "Flight simulator cockpit, autopilot systems, gyroscopic instruments."
  },
  {
    id: "4F-N408",
    code: "N-408",
    name: "Aircraft Design Laboratory",
    floor: 4,
    block: "North Block",
    category: "lab",
    dept: "Aerospace",
    x: 71, y: 35,
    nearestNode: "NORTH_CORR_EAST",
    description: "Airfoil design, aerodynamic modeling, structural sizing suites."
  },
  {
    id: "4F-N415",
    code: "N-415",
    name: "Aircraft Structures Laboratory",
    floor: 4,
    block: "North Block",
    category: "lab",
    dept: "Aerospace",
    x: 84, y: 49,
    nearestNode: "NORTH_VERT_MID",
    description: "Wing vibration tester, fuselage stress rigs, composite testing equipment."
  },
  {
    id: "4F-N417",
    code: "N-417",
    name: "Center of Excellence for CFD",
    floor: 4,
    block: "North Block",
    category: "lab",
    dept: "Aerospace",
    x: 77, y: 56,
    nearestNode: "NORTH_VERT_MID",
    description: "High-performance computing cluster for Computational Fluid Dynamics."
  },
  {
    id: "4F-N418",
    code: "N-418",
    name: "Hydraulics & Pneumatics Lab",
    floor: 4,
    block: "North Block",
    category: "lab",
    dept: "Aerospace & Mech",
    x: 85, y: 63,
    nearestNode: "NORTH_VERT_BOT",
    description: "Electro-hydraulic servo training benches, pneumatic logic controllers."
  },
  {
    id: "4F-N419",
    code: "N-419",
    name: "Robotics Laboratory",
    floor: 4,
    block: "North Block",
    category: "lab",
    dept: "Robotics",
    x: 77, y: 63,
    nearestNode: "NORTH_VERT_BOT",
    description: "6-DOF articulated robotic arms, AGVs, ROS-based mobile robots."
  },
  {
    id: "4F-N421",
    code: "N-421",
    name: "Industrial Automation Laboratory",
    floor: 4,
    block: "North Block",
    category: "lab",
    dept: "Automation",
    x: 77, y: 70,
    nearestNode: "NORTH_VERT_BOT",
    description: "PLC programming stations, SCADA systems, industrial sensor networks."
  },
  {
    id: "4F-S414",
    code: "S-414",
    name: "Computer Science Laboratory (AI/ML)",
    floor: 4,
    block: "South Block",
    category: "lab",
    dept: "Computer Science",
    x: 22, y: 41,
    nearestNode: "SOUTH_VERT_TOP",
    description: "GPU-accelerated workstation cluster for deep learning and vision."
  },
  {
    id: "4F-S416",
    code: "S-416",
    name: "Computer Science Lab (Cloud/DevOps)",
    floor: 4,
    block: "South Block",
    category: "lab",
    dept: "Computer Science",
    x: 22, y: 48,
    nearestNode: "SOUTH_VERT_MID",
    description: "Virtualization servers, Kubernetes sandbox, full-stack web lab."
  },
  // Additional 4th floor rooms from floor plan
  {
    id: "4F-N405",
    code: "N-405",
    name: "Classroom N-405 (Aerospace)",
    floor: 4,
    block: "North Block",
    category: "classroom",
    dept: "Aerospace",
    x: 65, y: 25,
    nearestNode: "NORTH_CORR_EAST",
    description: "Aerospace Engineering lecture classroom."
  },
  {
    id: "4F-N407",
    code: "N-407",
    name: "Classroom N-407 (Aerospace)",
    floor: 4,
    block: "North Block",
    category: "classroom",
    dept: "Aerospace",
    x: 71, y: 25,
    nearestNode: "NORTH_CORR_EAST",
    description: "Aerospace Engineering classroom N-407."
  },
  {
    id: "4F-N409",
    code: "N-409",
    name: "Faculty Cabin N-409",
    floor: 4,
    block: "North Block",
    category: "office",
    dept: "Aerospace",
    x: 85, y: 22,
    nearestNode: "NORTH_VERT_TOP",
    description: "Faculty cabin for Aerospace Engineering staff."
  },
  {
    id: "4F-N410",
    code: "N-410",
    name: "Faculty Cabin N-410",
    floor: 4,
    block: "North Block",
    category: "office",
    dept: "Aerospace",
    x: 79, y: 22,
    nearestNode: "NORTH_CORR_EAST",
    description: "Faculty cabin for Aerospace Engineering."
  },
  {
    id: "4F-N411",
    code: "N-411",
    name: "Computer Laboratory II",
    floor: 4,
    block: "North Block",
    category: "lab",
    dept: "Aerospace",
    x: 85, y: 30,
    nearestNode: "NORTH_VERT_TOP",
    description: "Computer Lab II for Aerospace simulation and design software."
  },
  {
    id: "4F-N412",
    code: "N-412",
    name: "Tutorial Room N-412",
    floor: 4,
    block: "North Block",
    category: "classroom",
    dept: "Aerospace",
    x: 85, y: 38,
    nearestNode: "NORTH_VERT_MID",
    description: "Tutorial and seminar room for Aerospace students."
  },
  {
    id: "4F-N413",
    code: "N-413",
    name: "Computer Laboratory I",
    floor: 4,
    block: "North Block",
    category: "lab",
    dept: "Aerospace",
    x: 76, y: 38,
    nearestNode: "NORTH_VERT_MID",
    description: "Computer Lab I for CATIA, ANSYS, and CFD simulations."
  },
  {
    id: "4F-N414",
    code: "N-414",
    name: "Faculty Cabin N-414",
    floor: 4,
    block: "North Block",
    category: "office",
    dept: "Aerospace",
    x: 76, y: 44,
    nearestNode: "NORTH_VERT_MID",
    description: "Faculty cabin for Aerospace Engineering N-414."
  },
  {
    id: "4F-N416",
    code: "N-416",
    name: "Geometric Modeling Laboratory",
    floor: 4,
    block: "North Block",
    category: "lab",
    dept: "Aerospace",
    x: 85, y: 56,
    nearestNode: "NORTH_VERT_MID",
    description: "Advanced geometric modeling and CAD software for aerospace design."
  },
  {
    id: "4F-N420",
    code: "N-420",
    name: "Control Engineering Laboratory",
    floor: 4,
    block: "North Block",
    category: "lab",
    dept: "Aerospace",
    x: 85, y: 73,
    nearestNode: "NORTH_VERT_BOT",
    description: "Control systems, PID controllers, and feedback system test benches."
  },
  // South Block 4th floor CSE rooms
  {
    id: "4F-S403",
    code: "S-403",
    name: "Classroom S-403 (CSE)",
    floor: 4,
    block: "South Block",
    category: "classroom",
    dept: "Computer Science",
    x: 42, y: 22,
    nearestNode: "SOUTH_JUNCTION",
    description: "CSE classroom S-403."
  },
  {
    id: "4F-S404",
    code: "S-404",
    name: "Classroom S-404 (CSE)",
    floor: 4,
    block: "South Block",
    category: "classroom",
    dept: "Computer Science",
    x: 42, y: 32,
    nearestNode: "SOUTH_JUNCTION",
    description: "CSE classroom S-404."
  },
  {
    id: "4F-S405",
    code: "S-405",
    name: "Class CSE S-405",
    floor: 4,
    block: "South Block",
    category: "classroom",
    dept: "Computer Science",
    x: 36, y: 22,
    nearestNode: "SOUTH_JUNCTION",
    description: "CSE lecture classroom S-405."
  },
  {
    id: "4F-S407",
    code: "S-407",
    name: "Class Room CSE S-407",
    floor: 4,
    block: "South Block",
    category: "classroom",
    dept: "Computer Science",
    x: 30, y: 22,
    nearestNode: "SOUTH_JUNCTION",
    description: "CSE classroom S-407."
  },
  {
    id: "4F-S408",
    code: "S-408",
    name: "Class Room CSE S-408",
    floor: 4,
    block: "South Block",
    category: "classroom",
    dept: "Computer Science",
    x: 36, y: 32,
    nearestNode: "SOUTH_JUNCTION",
    description: "CSE classroom S-408."
  },
  {
    id: "4F-S409",
    code: "S-409",
    name: "CR-CSE S-409",
    floor: 4,
    block: "South Block",
    category: "classroom",
    dept: "Computer Science",
    x: 22, y: 22,
    nearestNode: "SOUTH_CORR_WEST",
    description: "CSE classroom/computer room S-409."
  },
  {
    id: "4F-S410",
    code: "S-410",
    name: "CR-CSE S-410",
    floor: 4,
    block: "South Block",
    category: "classroom",
    dept: "Computer Science",
    x: 16, y: 22,
    nearestNode: "SOUTH_VERT_TOP",
    description: "CSE classroom/computer room S-410."
  },
  {
    id: "4F-S411",
    code: "S-411",
    name: "FB-CSE (Faculty Block)",
    floor: 4,
    block: "South Block",
    category: "office",
    dept: "Computer Science",
    x: 16, y: 32,
    nearestNode: "SOUTH_VERT_TOP",
    description: "CSE Faculty Block S-411."
  },
  {
    id: "4F-S412",
    code: "S-412",
    name: "Computer Laboratory S-412",
    floor: 4,
    block: "South Block",
    category: "lab",
    dept: "Computer Science",
    x: 22, y: 32,
    nearestNode: "SOUTH_VERT_TOP",
    description: "CSE Computer Laboratory S-412."
  },
  {
    id: "4F-S413",
    code: "S-413",
    name: "FB-CSE S-413",
    floor: 4,
    block: "South Block",
    category: "office",
    dept: "Computer Science",
    x: 16, y: 40,
    nearestNode: "SOUTH_VERT_TOP",
    description: "CSE Faculty Block S-413."
  },
  {
    id: "4F-S415",
    code: "S-415",
    name: "HOD Office - CSE (South Block)",
    floor: 4,
    block: "South Block",
    category: "office",
    dept: "Computer Science",
    x: 22, y: 56,
    nearestNode: "SOUTH_VERT_MID",
    description: "HOD Office for Computer Science, South Block 4th floor."
  },
  {
    id: "4F-S417",
    code: "S-417",
    name: "Room S-417",
    floor: 4,
    block: "South Block",
    category: "classroom",
    dept: "Computer Science",
    x: 16, y: 56,
    nearestNode: "SOUTH_VERT_MID",
    description: "4th floor South Block room S-417."
  },
  {
    id: "4F-S418",
    code: "S-418",
    name: "CR-CSE Laboratory S-418",
    floor: 4,
    block: "South Block",
    category: "lab",
    dept: "Computer Science",
    x: 22, y: 65,
    nearestNode: "SOUTH_VERT_BOT",
    description: "Computer room and CSE lab S-418."
  },
  {
    id: "4F-S419",
    code: "S-419",
    name: "Computer Laboratory S-419",
    floor: 4,
    block: "South Block",
    category: "lab",
    dept: "Computer Science",
    x: 16, y: 65,
    nearestNode: "SOUTH_VERT_BOT",
    description: "CSE Computer Laboratory S-419."
  },
  {
    id: "4F-S420",
    code: "S-420",
    name: "CR-CSE Laboratory S-420",
    floor: 4,
    block: "South Block",
    category: "lab",
    dept: "Computer Science",
    x: 22, y: 73,
    nearestNode: "SOUTH_VERT_BOT",
    description: "Computer room/CSE lab S-420."
  },
  {
    id: "4F-S421",
    code: "S-421",
    name: "Computer Laboratory S-421",
    floor: 4,
    block: "South Block",
    category: "lab",
    dept: "Computer Science",
    x: 16, y: 73,
    nearestNode: "SOUTH_VERT_BOT",
    description: "CSE Computer Laboratory S-421."
  },

  // ==========================================
  // SEVENTH FLOOR (Floor 7) - MITCOM & Auditorium
  // ==========================================
  {
    id: "7F-AUDITORIUM",
    code: "AUD-01",
    name: "Grand Campus Auditorium",
    floor: 7,
    block: "North Block",
    category: "auditorium",
    dept: "University Events",
    x: 82, y: 72,
    nearestNode: "NORTH_VERT_BOT",
    description: "Premier 600-seater air-conditioned auditorium with acoustic walls & stage lighting."
  },
  {
    id: "7F-N701",
    code: "N-701",
    name: "Director Office (MITCOM)",
    floor: 7,
    block: "North Block",
    category: "office",
    dept: "MITCOM",
    x: 58, y: 26,
    nearestNode: "NORTH_JUNCTION",
    description: "Director Office, MIT College of Management."
  },
  {
    id: "7F-N702",
    code: "N-702",
    name: "Training & Placement (TPO) Office",
    floor: 7,
    block: "North Block",
    category: "office",
    dept: "Placement",
    x: 56, y: 37,
    nearestNode: "NORTH_JUNCTION",
    description: "Campus interview center, corporate liaison, and placement cell."
  },
  {
    id: "7F-N703",
    code: "N-703",
    name: "Classroom N-703 (MITCOM)",
    floor: 7,
    block: "North Block",
    category: "classroom",
    dept: "MITCOM",
    x: 62, y: 26,
    nearestNode: "NORTH_JUNCTION",
    description: "MITCOM classroom N-703."
  },
  {
    id: "7F-N704",
    code: "N-704",
    name: "Conference Hall (MITCOM)",
    floor: 7,
    block: "North Block",
    category: "admin",
    dept: "MITCOM",
    x: 60, y: 37,
    nearestNode: "NORTH_JUNCTION",
    description: "Management board conference room and executive seminars."
  },
  {
    id: "7F-N705",
    code: "N-705",
    name: "Classroom N-705 (MITCOM)",
    floor: 7,
    block: "North Block",
    category: "classroom",
    dept: "MITCOM",
    x: 68, y: 26,
    nearestNode: "NORTH_CORR_EAST",
    description: "MBA classroom N-705."
  },
  {
    id: "7F-N706",
    code: "N-706",
    name: "Admin Office (MITCOM)",
    floor: 7,
    block: "North Block",
    category: "office",
    dept: "MITCOM",
    x: 66, y: 37,
    nearestNode: "NORTH_CORR_EAST",
    description: "MITCOM Administrative Office, 7th floor."
  },
  {
    id: "7F-N707",
    code: "N-707",
    name: "Classroom N-707 (MITCOM)",
    floor: 7,
    block: "North Block",
    category: "classroom",
    dept: "MITCOM",
    x: 74, y: 26,
    nearestNode: "NORTH_CORR_EAST",
    description: "MBA/MITCOM classroom N-707."
  },
  {
    id: "7F-N708",
    code: "N-708",
    name: "Faculty Block D1 (MITCOM)",
    floor: 7,
    block: "North Block",
    category: "office",
    dept: "MITCOM",
    x: 72, y: 37,
    nearestNode: "NORTH_CORR_EAST",
    description: "MITCOM Faculty Block D1 with individual faculty cabins."
  },
  {
    id: "7F-N709",
    code: "N-709",
    name: "Classroom N-709 (MITCOM)",
    floor: 7,
    block: "North Block",
    category: "classroom",
    dept: "MITCOM",
    x: 80, y: 26,
    nearestNode: "NORTH_VERT_TOP",
    description: "MITCOM classroom N-709."
  },
  {
    id: "7F-N710",
    code: "N-710",
    name: "Classroom N-710 (MITCOM)",
    floor: 7,
    block: "North Block",
    category: "classroom",
    dept: "MITCOM",
    x: 86, y: 26,
    nearestNode: "NORTH_VERT_TOP",
    description: "MITCOM classroom N-710."
  },
  {
    id: "7F-N711",
    code: "N-711",
    name: "Computer Lab (MITCOM)",
    floor: 7,
    block: "North Block",
    category: "lab",
    dept: "MITCOM",
    x: 87, y: 39,
    nearestNode: "NORTH_VERT_TOP",
    description: "Business analytics, financial modeling, and ERP laboratory."
  },
  {
    id: "7F-N712",
    code: "N-712",
    name: "Room N-712 (MITCOM)",
    floor: 7,
    block: "North Block",
    category: "classroom",
    dept: "MITCOM",
    x: 80, y: 37,
    nearestNode: "NORTH_VERT_TOP",
    description: "MITCOM room N-712."
  },
  {
    id: "7F-N713",
    code: "N-713",
    name: "Room N-713 (MITCOM)",
    floor: 7,
    block: "North Block",
    category: "classroom",
    dept: "MITCOM",
    x: 87, y: 44,
    nearestNode: "NORTH_VERT_MID",
    description: "MITCOM room N-713."
  },
  {
    id: "7F-N714",
    code: "N-714",
    name: "MBA Classroom 01",
    floor: 7,
    block: "North Block",
    category: "classroom",
    dept: "MITCOM",
    x: 78, y: 44,
    nearestNode: "NORTH_VERT_MID",
    description: "Tiered executive MBA lecture hall with interactive smart display."
  },
  {
    id: "7F-N715",
    code: "N-715",
    name: "Classroom N-715 (MITCOM)",
    floor: 7,
    block: "North Block",
    category: "classroom",
    dept: "MITCOM",
    x: 87, y: 52,
    nearestNode: "NORTH_VERT_MID",
    description: "MITCOM classroom N-715."
  },
  {
    id: "7F-N716",
    code: "N-716",
    name: "MBA Classroom 02",
    floor: 7,
    block: "North Block",
    category: "classroom",
    dept: "MITCOM",
    x: 78, y: 52,
    nearestNode: "NORTH_VERT_MID",
    description: "Case-study seminar room with circular seating and presentation pods."
  },
  {
    id: "7F-N717",
    code: "N-717",
    name: "Classroom N-717 (MITCOM)",
    floor: 7,
    block: "North Block",
    category: "classroom",
    dept: "MITCOM",
    x: 78, y: 60,
    nearestNode: "NORTH_VERT_MID",
    description: "MITCOM classroom N-717."
  },
  {
    id: "7F-N718",
    code: "N-718",
    name: "Auditorium Wing N-718",
    floor: 7,
    block: "North Block",
    category: "auditorium",
    dept: "University Events",
    x: 85, y: 65,
    nearestNode: "NORTH_VERT_BOT",
    description: "Auditorium wing entrance and backstage area N-718."
  },
  {
    id: "7F-N719",
    code: "N-719",
    name: "Grand Auditorium N-719",
    floor: 7,
    block: "North Block",
    category: "auditorium",
    dept: "University Events",
    x: 78, y: 65,
    nearestNode: "NORTH_VERT_BOT",
    description: "Grand campus auditorium main hall N-719."
  },
  {
    id: "7F-N720",
    code: "N-720",
    name: "Auditorium Section N-720",
    floor: 7,
    block: "North Block",
    category: "auditorium",
    dept: "University Events",
    x: 85, y: 73,
    nearestNode: "NORTH_VERT_BOT",
    description: "Auditorium section N-720."
  },
  {
    id: "7F-N721",
    code: "N-721",
    name: "Auditorium Section N-721",
    floor: 7,
    block: "North Block",
    category: "auditorium",
    dept: "University Events",
    x: 78, y: 73,
    nearestNode: "NORTH_VERT_BOT",
    description: "Auditorium section N-721."
  },
  // 7th Floor South Block - MITCOM
  {
    id: "7F-S701",
    code: "S-701",
    name: "MITCOM Classroom S-701",
    floor: 7,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 42, y: 22,
    nearestNode: "SOUTH_JUNCTION",
    description: "MITCOM classroom S-701."
  },
  {
    id: "7F-S703",
    code: "S-703",
    name: "MITCOM Classroom S-703",
    floor: 7,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 36, y: 22,
    nearestNode: "SOUTH_JUNCTION",
    description: "MITCOM classroom S-703."
  },
  {
    id: "7F-S704",
    code: "S-704",
    name: "MITCOM Room S-704",
    floor: 7,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 42, y: 32,
    nearestNode: "SOUTH_JUNCTION",
    description: "MITCOM room S-704."
  },
  {
    id: "7F-S705",
    code: "S-705",
    name: "MITCOM Classroom S-705",
    floor: 7,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 30, y: 22,
    nearestNode: "SOUTH_JUNCTION",
    description: "MITCOM classroom S-705."
  },
  {
    id: "7F-S706",
    code: "S-706",
    name: "MITCOM Room S-706",
    floor: 7,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 36, y: 32,
    nearestNode: "SOUTH_JUNCTION",
    description: "MITCOM room S-706."
  },
  {
    id: "7F-S707",
    code: "S-707",
    name: "MITCOM Classroom S-707",
    floor: 7,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 24, y: 22,
    nearestNode: "SOUTH_CORR_WEST",
    description: "MITCOM classroom S-707."
  },
  {
    id: "7F-S708",
    code: "S-708",
    name: "MITCOM Room S-708",
    floor: 7,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 30, y: 32,
    nearestNode: "SOUTH_JUNCTION",
    description: "MITCOM room S-708."
  },
  {
    id: "7F-S709",
    code: "S-709",
    name: "MITCOM Classroom S-709",
    floor: 7,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 16, y: 22,
    nearestNode: "SOUTH_VERT_TOP",
    description: "MITCOM classroom S-709."
  },
  {
    id: "7F-S710",
    code: "S-710",
    name: "MITCOM Room S-710",
    floor: 7,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 22, y: 32,
    nearestNode: "SOUTH_CORR_WEST",
    description: "MITCOM room S-710."
  },
  {
    id: "7F-S711",
    code: "S-711",
    name: "MITCOM Classroom S-711",
    floor: 7,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 16, y: 32,
    nearestNode: "SOUTH_VERT_TOP",
    description: "MITCOM classroom S-711."
  },
  {
    id: "7F-S712",
    code: "S-712",
    name: "MITCOM Room S-712",
    floor: 7,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 22, y: 40,
    nearestNode: "SOUTH_VERT_TOP",
    description: "MITCOM room S-712."
  },
  {
    id: "7F-S713",
    code: "S-713",
    name: "MITCOM Classroom S-713",
    floor: 7,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 16, y: 40,
    nearestNode: "SOUTH_VERT_TOP",
    description: "MITCOM classroom S-713."
  },
  {
    id: "7F-S714",
    code: "S-714",
    name: "MITCOM Room S-714",
    floor: 7,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 22, y: 48,
    nearestNode: "SOUTH_VERT_MID",
    description: "MITCOM room S-714."
  },
  {
    id: "7F-S715",
    code: "S-715",
    name: "MITCOM Classroom S-715",
    floor: 7,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 16, y: 48,
    nearestNode: "SOUTH_VERT_MID",
    description: "MITCOM classroom S-715."
  },
  {
    id: "7F-S716",
    code: "S-716",
    name: "MITCOM Room S-716",
    floor: 7,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 22, y: 56,
    nearestNode: "SOUTH_VERT_MID",
    description: "MITCOM room S-716."
  },
  {
    id: "7F-S717",
    code: "S-717",
    name: "MITCOM Classroom S-717",
    floor: 7,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 16, y: 56,
    nearestNode: "SOUTH_VERT_MID",
    description: "MITCOM classroom S-717."
  },
  {
    id: "7F-S718",
    code: "S-718",
    name: "MITCOM Room S-718",
    floor: 7,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 22, y: 65,
    nearestNode: "SOUTH_VERT_BOT",
    description: "MITCOM room S-718."
  },
  {
    id: "7F-S719",
    code: "S-719",
    name: "MITCOM Classroom S-719",
    floor: 7,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 16, y: 65,
    nearestNode: "SOUTH_VERT_BOT",
    description: "MITCOM classroom S-719."
  },
  {
    id: "7F-S720",
    code: "S-720",
    name: "MITCOM Room S-720",
    floor: 7,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 22, y: 73,
    nearestNode: "SOUTH_VERT_BOT",
    description: "MITCOM room S-720."
  },
  {
    id: "7F-S721",
    code: "S-721",
    name: "MITCOM Classroom S-721",
    floor: 7,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 16, y: 73,
    nearestNode: "SOUTH_VERT_BOT",
    description: "MITCOM classroom S-721."
  },

  // ==========================================
  // EIGHTH FLOOR (Floor 8) - Terrace & Rooftop
  // ==========================================
  {
    id: "8F-OPEN-TERRACE",
    code: "TERRACE",
    name: "Open Rooftop Terrace & Observation Deck",
    floor: 8,
    block: "North Block",
    category: "amenity",
    dept: "Campus Core",
    x: 80, y: 64,
    nearestNode: "NORTH_VERT_BOT",
    description: "Panoramic open terrace viewing the Mula-Mutha river and Sahyadri hills."
  },
  {
    id: "8F-N801",
    code: "N-801",
    name: "MITCOM Room N-801",
    floor: 8,
    block: "North Block",
    category: "classroom",
    dept: "MITCOM",
    x: 56, y: 26,
    nearestNode: "NORTH_JUNCTION",
    description: "MITCOM classroom/room on 8th floor N-801."
  },
  {
    id: "8F-N802",
    code: "N-802",
    name: "FB MITCOM (Faculty Block)",
    floor: 8,
    block: "North Block",
    category: "office",
    dept: "MITCOM",
    x: 56, y: 37,
    nearestNode: "NORTH_JUNCTION",
    description: "MITCOM Faculty Block N-802, 8th floor."
  },
  {
    id: "8F-N803",
    code: "N-803",
    name: "Classroom N-803 (MITCOM)",
    floor: 8,
    block: "North Block",
    category: "classroom",
    dept: "MITCOM",
    x: 62, y: 26,
    nearestNode: "NORTH_JUNCTION",
    description: "MITCOM classroom N-803."
  },
  {
    id: "8F-N804",
    code: "N-804",
    name: "Faculty Block 01 (MITCOM)",
    floor: 8,
    block: "North Block",
    category: "office",
    dept: "MITCOM",
    x: 61, y: 34,
    nearestNode: "NORTH_JUNCTION",
    description: "Senior management faculty workstations and research cabins."
  },
  {
    id: "8F-N805",
    code: "N-805",
    name: "Classroom N-805 (MITCOM)",
    floor: 8,
    block: "North Block",
    category: "classroom",
    dept: "MITCOM",
    x: 68, y: 26,
    nearestNode: "NORTH_CORR_EAST",
    description: "MITCOM classroom N-805."
  },
  {
    id: "8F-N806",
    code: "N-806",
    name: "Classroom N-806 (MITCOM)",
    floor: 8,
    block: "North Block",
    category: "classroom",
    dept: "MITCOM",
    x: 66, y: 37,
    nearestNode: "NORTH_CORR_EAST",
    description: "MITCOM classroom N-806."
  },
  {
    id: "8F-N807",
    code: "N-807",
    name: "Classroom N-807 (MITCOM)",
    floor: 8,
    block: "North Block",
    category: "classroom",
    dept: "MITCOM",
    x: 74, y: 26,
    nearestNode: "NORTH_CORR_EAST",
    description: "MITCOM classroom N-807."
  },
  {
    id: "8F-N808",
    code: "N-808",
    name: "Senior Seminar Hall",
    floor: 8,
    block: "North Block",
    category: "classroom",
    dept: "MITCOM",
    x: 71, y: 34,
    nearestNode: "NORTH_CORR_EAST",
    description: "Executive presentation and doctoral defense classroom."
  },
  {
    id: "8F-N809",
    code: "N-809",
    name: "Classroom N-809 (MITCOM)",
    floor: 8,
    block: "North Block",
    category: "classroom",
    dept: "MITCOM",
    x: 80, y: 26,
    nearestNode: "NORTH_VERT_TOP",
    description: "MITCOM classroom N-809."
  },
  {
    id: "8F-N810",
    code: "N-810",
    name: "Classroom N-810 (MITCOM)",
    floor: 8,
    block: "North Block",
    category: "classroom",
    dept: "MITCOM",
    x: 86, y: 26,
    nearestNode: "NORTH_VERT_TOP",
    description: "MITCOM classroom N-810."
  },
  {
    id: "8F-N811",
    code: "N-811",
    name: "Classroom N-811 (MITCOM)",
    floor: 8,
    block: "North Block",
    category: "classroom",
    dept: "MITCOM",
    x: 86, y: 37,
    nearestNode: "NORTH_VERT_TOP",
    description: "MITCOM classroom N-811."
  },
  {
    id: "8F-N812",
    code: "N-812",
    name: "Room N-812 (MITCOM)",
    floor: 8,
    block: "North Block",
    category: "classroom",
    dept: "MITCOM",
    x: 80, y: 37,
    nearestNode: "NORTH_VERT_TOP",
    description: "MITCOM room N-812."
  },
  {
    id: "8F-N813",
    code: "N-813",
    name: "Classroom N-813 (MITCOM)",
    floor: 8,
    block: "North Block",
    category: "classroom",
    dept: "MITCOM",
    x: 86, y: 50,
    nearestNode: "NORTH_VERT_MID",
    description: "MITCOM classroom N-813."
  },
  {
    id: "8F-N815",
    code: "N-815",
    name: "Classroom N-815 (MITCOM)",
    floor: 8,
    block: "North Block",
    category: "classroom",
    dept: "MITCOM",
    x: 86, y: 58,
    nearestNode: "NORTH_VERT_MID",
    description: "MITCOM classroom N-815."
  },
  // 8th floor South Block rooms
  {
    id: "8F-S801",
    code: "S-801",
    name: "MITCOM Room S-801",
    floor: 8,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 42, y: 22,
    nearestNode: "SOUTH_JUNCTION",
    description: "MITCOM room S-801 on 8th floor."
  },
  {
    id: "8F-S803",
    code: "S-803",
    name: "MITCOM Classroom S-803",
    floor: 8,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 36, y: 22,
    nearestNode: "SOUTH_JUNCTION",
    description: "MITCOM classroom S-803."
  },
  {
    id: "8F-S804",
    code: "S-804",
    name: "MITCOM Room S-804",
    floor: 8,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 42, y: 32,
    nearestNode: "SOUTH_JUNCTION",
    description: "MITCOM room S-804."
  },
  {
    id: "8F-S805",
    code: "S-805",
    name: "MITCOM Classroom S-805",
    floor: 8,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 30, y: 22,
    nearestNode: "SOUTH_JUNCTION",
    description: "MITCOM classroom S-805."
  },
  {
    id: "8F-S806",
    code: "S-806",
    name: "MITCOM Room S-806",
    floor: 8,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 36, y: 32,
    nearestNode: "SOUTH_JUNCTION",
    description: "MITCOM room S-806."
  },
  {
    id: "8F-S807",
    code: "S-807",
    name: "MITCOM Classroom S-807",
    floor: 8,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 24, y: 22,
    nearestNode: "SOUTH_CORR_WEST",
    description: "MITCOM classroom S-807."
  },
  {
    id: "8F-S808",
    code: "S-808",
    name: "MITCOM Room S-808",
    floor: 8,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 30, y: 32,
    nearestNode: "SOUTH_JUNCTION",
    description: "MITCOM room S-808."
  },
  {
    id: "8F-S809",
    code: "S-809",
    name: "MITCOM Classroom S-809",
    floor: 8,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 16, y: 22,
    nearestNode: "SOUTH_VERT_TOP",
    description: "MITCOM classroom S-809."
  },
  {
    id: "8F-S810",
    code: "S-810",
    name: "MITCOM Room S-810",
    floor: 8,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 22, y: 32,
    nearestNode: "SOUTH_CORR_WEST",
    description: "MITCOM room S-810."
  },
  {
    id: "8F-S811",
    code: "S-811",
    name: "Room S-811",
    floor: 8,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 16, y: 32,
    nearestNode: "SOUTH_VERT_TOP",
    description: "8th floor South Block room S-811."
  },
  {
    id: "8F-S812",
    code: "S-812",
    name: "Room S-812",
    floor: 8,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 22, y: 40,
    nearestNode: "SOUTH_VERT_TOP",
    description: "8th floor South Block room S-812."
  },
  {
    id: "8F-S813",
    code: "S-813",
    name: "Room S-813",
    floor: 8,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 16, y: 40,
    nearestNode: "SOUTH_VERT_TOP",
    description: "8th floor South Block room S-813."
  },
  {
    id: "8F-S814",
    code: "S-814",
    name: "Room S-814",
    floor: 8,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 22, y: 48,
    nearestNode: "SOUTH_VERT_MID",
    description: "8th floor South Block room S-814."
  },
  {
    id: "8F-S815",
    code: "S-815",
    name: "Room S-815",
    floor: 8,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 16, y: 48,
    nearestNode: "SOUTH_VERT_MID",
    description: "8th floor South Block room S-815."
  },
  {
    id: "8F-S816",
    code: "S-816",
    name: "Room S-816",
    floor: 8,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 22, y: 56,
    nearestNode: "SOUTH_VERT_MID",
    description: "8th floor South Block room S-816."
  },
  {
    id: "8F-S817",
    code: "S-817",
    name: "Room S-817",
    floor: 8,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 16, y: 56,
    nearestNode: "SOUTH_VERT_MID",
    description: "8th floor South Block room S-817."
  },
  {
    id: "8F-S818",
    code: "S-818",
    name: "Room S-818",
    floor: 8,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 22, y: 65,
    nearestNode: "SOUTH_VERT_BOT",
    description: "8th floor South Block room S-818."
  },
  {
    id: "8F-S819",
    code: "S-819",
    name: "Room S-819",
    floor: 8,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 16, y: 65,
    nearestNode: "SOUTH_VERT_BOT",
    description: "8th floor South Block room S-819."
  },
  {
    id: "8F-S820",
    code: "S-820",
    name: "Room S-820",
    floor: 8,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 22, y: 73,
    nearestNode: "SOUTH_VERT_BOT",
    description: "8th floor South Block room S-820."
  },
  {
    id: "8F-S821",
    code: "S-821",
    name: "Room S-821",
    floor: 8,
    block: "South Block",
    category: "classroom",
    dept: "MITCOM",
    x: 16, y: 73,
    nearestNode: "SOUTH_VERT_BOT",
    description: "8th floor South Block room S-821."
  },
];

// Helper: Shortest Path Calculation on the Corridor Graph
export function calculateIndoorPath(startRoomId, endRoomId) {
  const startRoom = ALL_ROOMS.find(r => r.id === startRoomId);
  const endRoom = ALL_ROOMS.find(r => r.id === endRoomId);

  if (!startRoom || !endRoom) return null;

  const isCrossFloor = startRoom.floor !== endRoom.floor;

  // Build adjacency list from CORRIDOR_GRAPH
  const adj = {};
  for (const nodeKey of Object.keys(CORRIDOR_GRAPH.nodes)) {
    adj[nodeKey] = [];
  }
  for (const [u, v, weight] of CORRIDOR_GRAPH.edges) {
    if (adj[u] && adj[v]) {
      adj[u].push({ to: v, weight });
      adj[v].push({ to: u, weight });
    }
  }

  // Dijkstra algorithm for single floor
  const dijkstra = (startNodeKey, targetNodeKey) => {
    const dist = {};
    const prev = {};
    const unvisited = new Set(Object.keys(CORRIDOR_GRAPH.nodes));

    for (const key of Object.keys(CORRIDOR_GRAPH.nodes)) {
      dist[key] = Infinity;
    }
    dist[startNodeKey] = 0;

    while (unvisited.size > 0) {
      let minNode = null;
      let minDistance = Infinity;
      for (const node of unvisited) {
        if (dist[node] < minDistance) {
          minDistance = dist[node];
          minNode = node;
        }
      }

      if (!minNode || minNode === targetNodeKey || minDistance === Infinity) break;
      unvisited.delete(minNode);

      for (const edge of adj[minNode]) {
        if (unvisited.has(edge.to)) {
          const alt = dist[minNode] + edge.weight;
          if (alt < dist[edge.to]) {
            dist[edge.to] = alt;
            prev[edge.to] = minNode;
          }
        }
      }
    }

    const path = [];
    let curr = targetNodeKey;
    while (curr) {
      path.unshift(curr);
      curr = prev[curr];
    }
    return { path, distance: dist[targetNodeKey] };
  };

  if (!isCrossFloor) {
    const { path, distance } = dijkstra(startRoom.nearestNode, endRoom.nearestNode);
    const waypoints = [
      { x: startRoom.x, y: startRoom.y, label: startRoom.name },
      ...path.map(nodeKey => ({
        ...CORRIDOR_GRAPH.nodes[nodeKey],
        id: nodeKey
      })),
      { x: endRoom.x, y: endRoom.y, label: endRoom.name }
    ];

    const instructions = [];
    instructions.push(`Depart from ${startRoom.code} - ${startRoom.name} on Floor ${startRoom.floor === 0 ? "Ground" : startRoom.floor}.`);
    if (startRoom.block !== endRoom.block) {
      instructions.push(`Walk along the corridor towards the Central Atrium / Lounge.`);
      instructions.push(`Transition across the corridor into ${endRoom.block}.`);
    } else {
      instructions.push(`Walk straight along the ${startRoom.block} corridor.`);
    }
    instructions.push(`Arrive at ${endRoom.code} - ${endRoom.name}.`);

    return {
      isCrossFloor: false,
      floor: startRoom.floor,
      waypoints,
      distanceEstimatedMeters: Math.round(distance * 1.5 + 10),
      durationSeconds: Math.round((distance * 1.5 + 10) / 1.1),
      instructions,
      startRoom,
      endRoom
    };
  } else {
    // Cross-floor: Route via nearest Lift (LIFT_1 or LIFT_2)
    const liftNode = startRoom.x < 55 ? "LIFT_1" : "LIFT_2";
    const pathStage1 = dijkstra(startRoom.nearestNode, liftNode);
    const pathStage2 = dijkstra(liftNode, endRoom.nearestNode);

    const waypointsFloorStart = [
      { x: startRoom.x, y: startRoom.y, label: startRoom.name },
      ...pathStage1.path.map(nodeKey => ({
        ...CORRIDOR_GRAPH.nodes[nodeKey],
        id: nodeKey
      }))
    ];

    const waypointsFloorEnd = [
      ...pathStage2.path.map(nodeKey => ({
        ...CORRIDOR_GRAPH.nodes[nodeKey],
        id: nodeKey
      })),
      { x: endRoom.x, y: endRoom.y, label: endRoom.name }
    ];

    const instructions = [
      `Start at ${startRoom.code} on Floor ${startRoom.floor === 0 ? "Ground" : startRoom.floor}.`,
      `Follow the hallway towards ${liftNode === "LIFT_1" ? "1st Lift" : "2nd Lift"} in the central lobby.`,
      `Take the elevator from Floor ${startRoom.floor === 0 ? "Ground" : startRoom.floor} up to Floor ${endRoom.floor === 0 ? "Ground" : endRoom.floor}.`,
      `Exit the elevator into the Floor ${endRoom.floor} lobby and proceed into ${endRoom.block}.`,
      `Arrive at ${endRoom.code} - ${endRoom.name}.`
    ];

    return {
      isCrossFloor: true,
      startFloor: startRoom.floor,
      endFloor: endRoom.floor,
      activeFloorWaypoints: waypointsFloorStart,
      stage1Waypoints: waypointsFloorStart,
      stage2Waypoints: waypointsFloorEnd,
      distanceEstimatedMeters: Math.round((pathStage1.distance + pathStage2.distance) * 1.5 + 25),
      durationSeconds: Math.round(((pathStage1.distance + pathStage2.distance) * 1.5 + 25) / 1.1) + 40,
      instructions,
      startRoom,
      endRoom
    };
  }
}
