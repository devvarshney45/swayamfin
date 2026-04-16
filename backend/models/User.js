const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['Agent', 'Admin'], default: 'Agent' },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
  lastAssigned: { type: Date, default: Date.now } // Key to round-robin
});

module.exports = mongoose.model('User', userSchema);
