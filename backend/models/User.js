const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password_hash: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['sales_person', 'bsm', 'admin'], 
    required: true 
  },
  branch_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Branch',
    default: null // null for admin
  },
  employee_code: { type: String, unique: true, sparse: true },
  is_active: { type: Boolean, default: true },
  lastAssigned: { type: Date, default: Date.now }, // used for round-robin
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password_hash')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password_hash = await bcrypt.hash(this.password_hash, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password_hash);
};

module.exports = mongoose.model('User', userSchema);
