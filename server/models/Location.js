import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  category: { 
    type: String, 
    enum: ['Academic', 'Library', 'Dining', 'Sports', 'Hostel', 'Administrative', 'Services'], 
    default: 'Academic' 
  },
  description: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  openingHours: { type: String, default: '8:00 AM - 8:00 PM' },
  floorCount: { type: Number, default: 3 },
  image: { type: String },
  facilities: [{ type: String }]
}, { timestamps: true });

export default mongoose.model('Location', locationSchema);
