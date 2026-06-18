const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  lead_number: { type: String, unique: true },
  source: { 
    type: String, 
    enum: ['website', 'manual', 'referral', 'walk-in', 'phone_inquiry', 'employee_portal', 'agent_portal', 'other'], 
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
      'microfinance', 'structured', 'secured', 'unsecured', 
      'machinery_loan', 'unsecured_export_finance'
    ], 
    required: true 
  },
  loan_amount_required: { type: Number, required: true },
  branch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
  assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { 
    type: String, 
    enum: [
      'Under login stage', 'Under PD', 'Under Technical', 'Under Legal', 
      'Under Credit', 'Under Sanction', 'Under Disbursement', 'Disbursed'
    ], 
    default: 'Under login stage' 
  },
  stage: { 
    type: String, 
    enum: [
      'login', 'pd', 'technical', 'legal', 
      'credit', 'sanction', 'under_disb', 'disbursed'
    ], 
    default: 'login' 
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

  // Operational & Reporting Details (Excel Sync)
  rm_name: { type: String },
  login_date: { type: String },
  tat: { type: String },
  partner_login: { type: String },
  external_loan_id: { type: String },
  case_under_company: { type: String },
  
  // Operational & Reporting Details (Excel Sync - Checkbox Nodes)
  pd_report: { type: Boolean, default: false },
  technical_report: { type: Boolean, default: false },
  legal_report: { type: Boolean, default: false },
  cpv_report: { type: Boolean, default: false },
  sanction: { type: Boolean, default: false },
  disbursement: { type: Boolean, default: false },
  
  fees: { type: Number },
  sanction_amount: { type: Number },
  disbursed_amount: { type: Number },
  disbursement_date: { type: String },
  sanction_date: { type: String },
  remarks: { type: String },
}, { 
  timestamps: true 
});

// Performance Indexes for Scaling
leadSchema.index({ mobile: 1, createdAt: -1 }); // Fast deduplication
leadSchema.index({ branch_id: 1, createdAt: -1 }); // Fast dashboard fetching
leadSchema.index({ assigned_to: 1, status: 1 }); // Fast agent views
leadSchema.index({ location_city: 1 }); // Fast branch mapping

module.exports = mongoose.model('Lead', leadSchema);
