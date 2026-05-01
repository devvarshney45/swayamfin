const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message_text: { type: String, required: true },
  is_read: { type: Boolean, default: false },
  lead_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', default: null } // Optional link
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
