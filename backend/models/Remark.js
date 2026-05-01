const mongoose = require('mongoose');

const remarkSchema = new mongoose.Schema({
  lead_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  remark_text: { type: String, required: true },
  remark_type: { 
    type: String, 
    enum: ['note', 'call_log', 'follow_up', 'status_change', 'system'], 
    required: true 
  },
  follow_up_date: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Remark', remarkSchema);
