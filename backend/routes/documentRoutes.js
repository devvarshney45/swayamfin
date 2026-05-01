const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect } = require('../middleware/authMiddleware');
const { uploadDocument, getDocuments, deleteDocument } = require('../controllers/documentController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

const allowedMimeTypes = new Set([
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png'
]);

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      return cb(new Error('Only PDF/JPG/PNG files are allowed'));
    }
    cb(null, true);
  }
});

router.post('/:id/documents', protect, (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message || 'Invalid file upload' });
    }
    next();
  });
}, uploadDocument);
router.get('/:id/documents', protect, getDocuments);
router.delete('/:id/documents/:docId', protect, deleteDocument);

module.exports = router;
