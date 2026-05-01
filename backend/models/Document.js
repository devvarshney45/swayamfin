const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  lead_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
  doc_type: { 
    type: String, 
    enum: [
      'pan_card', 'aadhaar_front', 'aadhaar_back', 'voter_id', 
      'gst_certificate', 'bank_statement', 'itr', 'business_proof',
      'property_documents', 'passport_photo', 'others'
    ], 
    required: true 
  },
  file_url: { type: String, required: true },
  file_name: { type: String },
  uploaded_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  is_verified: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);
