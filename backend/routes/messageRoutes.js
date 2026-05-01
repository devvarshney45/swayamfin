const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { sendMessage, getMessages, markAsRead } = require('../controllers/messageController');

router.post('/', protect, sendMessage);
router.get('/', protect, getMessages);
router.patch('/:id/read', protect, markAsRead);

module.exports = router;
