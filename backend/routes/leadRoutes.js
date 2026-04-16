const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

// Define API routes
router.post('/', leadController.createLead);
router.get('/today', leadController.getTodaysLeads);
router.put('/:id/status', leadController.updateLeadStatus);

module.exports = router;
