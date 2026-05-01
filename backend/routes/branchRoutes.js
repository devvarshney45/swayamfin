const express = require('express');
const router = express.Router();
const { getBranches, createBranch } = require('../controllers/branchController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', protect, getBranches); // Agents might need it for dropdowns
router.post('/', protect, adminOnly, createBranch);

module.exports = router;
