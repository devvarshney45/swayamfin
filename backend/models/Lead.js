const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    trim: true,
    match: [/^\d{10}$/, 'Mobile number must be 10 digits'],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  loanType: {
    type: String,
    required: [true, 'Loan type is required'],
    enum: [
      'Home Loan', 
      'MSME Loan', 
      'LAP', 
      'Micro LAP', 
      'Hybrid Loan', 
      'Unsecured Loan', 
      'Machinery Loan', 
      'Supply Chain Finance'
    ],
  },
  amount: {
    type: Number,
    required: [true, 'Loan amount is required'],
    min: [10000, 'Minimum loan amount is 10,000'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
  },
  status: {
    type: String,
    enum: ['Fresh', 'Contacted', 'Qualified', 'Converted', 'Rejected'],
    default: 'Fresh',
  },
  assignedBranch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    default: null,
  },
  assignedAgent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  agentNotes: {
    type: String,
    default: '',
  },
  utm_source: {
    type: String,
    trim: true,
  },
  utm_medium: {
    type: String,
    trim: true,
  },
  utm_campaign: {
    type: String,
    trim: true,
  },
}, { 
  timestamps: true 
});

// Index for 24-hr deduplication logic
leadSchema.index({ mobile: 1, createdAt: -1 });

module.exports = mongoose.model('Lead', leadSchema);
