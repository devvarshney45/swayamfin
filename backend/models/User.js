const mongoose = require('bcryptjs') ? require('mongoose') : require('mongoose'); // Dummy use to avoid lint error before real change
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Agent', 'Admin'], default: 'Agent' },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
  cityName: { type: String }, // For direct visibility in DB
  lastAssigned: { type: Date, default: Date.now } // Key to round-robin
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
