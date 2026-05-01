require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const leadRoutes = require('./routes/leadRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const branchRoutes = require('./routes/branchRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

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
// The routes below act on leads
app.use('/api/leads', require('./routes/documentRoutes'));
app.use('/api/leads', require('./routes/remarkRoutes'));

app.use('/api/users', userRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/messages', require('./routes/messageRoutes'));

// Always serve files from backend/uploads irrespective of process cwd.
app.use('/uploads', express.static(uploadsDir));

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'API is running' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Backend Server running on http://localhost:${PORT}`);
});
