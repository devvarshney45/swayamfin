const express = require('express');
const router = express.Router();
const { createLead, getLeads, getLeadById, updateLead, updateStatus, reassignLead } = require('../controllers/leadController');
const { protect, bsmOnly } = require('../middleware/authMiddleware');

router.post('/', createLead); // Public for Landing Page & Private for Agents (Internal assignment handled in controller)
router.post('/website', createLead); // Webhook
router.get('/', protect, getLeads);
router.get('/:id', protect, getLeadById);
router.put('/:id', protect, updateLead);
router.patch('/:id/status', protect, updateStatus);
router.patch('/:id/assign', protect, bsmOnly, reassignLead);

module.exports = router;
