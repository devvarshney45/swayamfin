const Document = require('../models/Document');
const Lead = require('../models/Lead');
const path = require('path');

exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { doc_type } = req.body;
    const lead_id = req.params.id;

    // Save relative path
    const file_url = `/uploads/${req.file.filename}`;

    const newDoc = await Document.create({
      lead_id,
      doc_type,
      file_url,
      file_name: req.file.originalname,
      uploaded_by: req.user.id
    });

    res.status(201).json({ success: true, data: newDoc });
  } catch (error) {
    console.error('Doc upload error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ lead_id: req.params.id }).populate('uploaded_by', 'full_name');
    res.json({ success: true, data: docs });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can delete' });
    }
    await Document.findByIdAndDelete(req.params.docId);
    res.json({ success: true });
  } catch(err) {
    res.status(500).json({ message: 'Server error' });
  }
};
