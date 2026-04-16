const express = require('express');
const router = express.Router();
const { createLead, getTodaysLeads, updateLeadStatus, getAllLeads, getLeadStats } = require('../controllers/leadController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Define API routes
router.post('/', createLead);
router.get('/today', protect, getTodaysLeads);
router.get('/all', protect, adminOnly, getAllLeads);
router.get('/stats', protect, adminOnly, getLeadStats);
router.put('/:id/status', protect, updateLeadStatus);

module.exports = router;
