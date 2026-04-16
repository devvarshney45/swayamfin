require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const leadRoutes = require('./routes/leadRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const branchRoutes = require('./routes/branchRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB Database mapped from .env
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/swayamfin')
  .then(() => console.log('MongoDB successfully securely connected!'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/users', userRoutes);
app.use('/api/branches', branchRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'API is running' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Backend Server running on http://localhost:${PORT}`);
});
