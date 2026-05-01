const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { addRemark, getRemarks } = require('../controllers/remarkController');

router.post('/:id/remarks', protect, addRemark);
router.get('/:id/remarks', protect, getRemarks);

module.exports = router;
