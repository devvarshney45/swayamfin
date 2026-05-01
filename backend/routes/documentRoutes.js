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

const upload = multer({ storage: storage });

router.post('/:id/documents', protect, upload.single('file'), uploadDocument);
router.get('/:id/documents', protect, getDocuments);
router.delete('/:id/documents/:docId', protect, deleteDocument);

module.exports = router;
