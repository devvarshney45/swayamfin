const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  email:    { type: String, required: true, trim: true },
  question: { type: String, required: true, trim: true },
  status:   { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
