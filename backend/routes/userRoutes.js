const express = require('express');
const router = express.Router();
const { getUsers, getBranchUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { protect, adminOnly, bsmOnly } = require('../middleware/authMiddleware');

router.get('/', protect, adminOnly, getUsers);
router.get('/branch', protect, bsmOnly, getBranchUsers);
router.post('/', protect, adminOnly, createUser);
router.put('/:id', protect, adminOnly, updateUser);
router.delete('/:id', protect, adminOnly, deleteUser);

module.exports = router;
