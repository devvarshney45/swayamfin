const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  lead_number: { type: String, unique: true },
  source: { 
    type: String, 
    enum: ['website', 'manual', 'referral', 'walk-in', 'phone_inquiry', 'employee_portal', 'other'], 
    required: true 
  },
  applicant_name: { type: String, required: true },
  mobile: { type: String, required: true },
  alternate_mobile: { type: String },
  email: { type: String },
  location_city: { type: String, required: true },
  pincode: { type: String },
  loan_type: { 
    type: String, 
    enum: [
      'home_loan', 'micro_lap', 'supply_chain', 
      'msme_structured', 'lap', 'hybrid',
      'microfinance', 'structured', 'secured', 'unsecured', 'machinery_loan'
    ], 
    required: true 
  },
  loan_amount_required: { type: Number, required: true },
  branch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
  assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { 
    type: String, 
    enum: [
      'New', 'Contacted', 'In Progress', 'Document Submitted', 
      'Sanctioned', 'Disbursed', 'Closed - Won', 'Dead Lead', 'On Hold'
    ], 
    default: 'New' 
  },
  stage: { 
    type: String, 
    enum: [
      'new', 'contacted', 'in_progress', 'docs_submitted', 
      'sanctioned', 'disbursed', 'closed', 'dead', 'on_hold'
    ], 
    default: 'new' 
  },
  closing_date: { type: Date },
  dead_reason: { type: String },
  submitted_by: { type: String }, // Employee name who submitted via employee portal

  // Personal Form Details (Tab 1)
  father_or_spouse_name: { type: String },
  date_of_birth: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  marital_status: { type: String, enum: ['Single', 'Married', 'Divorced', 'Widowed'] },
  current_address: { type: String },
  permanent_address: { type: String },
  occupation_type: { type: String, enum: ['Salaried', 'Self-Employed', 'Business Owner', 'Farmer', 'Other'] },
  monthly_income: { type: Number },
  annual_turnover: { type: Number },
  business_name: { type: String },
  business_vintage_years: { type: Number },
  gst_registered: { type: Boolean, default: false },
  cibil_score: { type: Number },
}, { 
  timestamps: true 
});

// Performance Indexes for Scaling
leadSchema.index({ mobile: 1, createdAt: -1 }); // Fast deduplication
leadSchema.index({ branch_id: 1, createdAt: -1 }); // Fast dashboard fetching
leadSchema.index({ assigned_to: 1, status: 1 }); // Fast agent views
leadSchema.index({ location_city: 1 }); // Fast branch mapping

module.exports = mongoose.model('Lead', leadSchema);
