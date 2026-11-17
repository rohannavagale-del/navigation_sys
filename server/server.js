import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import locationRoutes from './routes/locationRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/campus_navigation';

app.use(cors());
app.use(express.json());

let isDbConnected = false;

// Connect to MongoDB with silent fallback to memory mode if DB service is unavailable
mongoose.connect(MONGO_URI)
  .then(() => {
    isDbConnected = true;
    console.log('✅ Connected to MongoDB at:', MONGO_URI);
  })
  .catch((err) => {
    isDbConnected = false;
    console.log('⚠️ MongoDB connection warning:', err.message);
    console.log('ℹ️ Server running with seamless in-memory database fallback!');
  });

// Attach database status to request object
app.use((req, res, next) => {
  req.dbConnected = isDbConnected && mongoose.connection.readyState === 1;
  next();
});

// API status endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    dbConnected: req.dbConnected,
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/locations', locationRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Express Campus Navigation Server running on http://127.0.0.1:${PORT}`);
});
