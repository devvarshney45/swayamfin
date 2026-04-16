const express = require('express');
const router = express.Router();
const { getAgents, createAgent, updateAgent, deleteAgent } = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', protect, adminOnly, getAgents);
router.post('/', protect, adminOnly, createAgent);
router.put('/:id', protect, adminOnly, updateAgent);
router.delete('/:id', protect, adminOnly, deleteAgent);

module.exports = router;
