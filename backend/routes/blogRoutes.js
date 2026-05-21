// Get all blogs (admin)
router.get('/admin/all', blogController.getAllBlogsAdmin);
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Get all blogs
router.get('/', blogController.getAllBlogs);

// Get a single blog by slug
router.get('/:slug', blogController.getBlogBySlug);

// Create a new blog
router.post('/', blogController.createBlog);

// Update a blog by ID
router.put('/:id', blogController.updateBlog);

// Delete a blog by ID
router.delete('/:id', blogController.deleteBlog);

module.exports = router;
