const Blog = require('../models/Blog');

// Get all published blogs with optional filtering
exports.getAllBlogs = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = { isPublished: true };

    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { tagline: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .select('title tagline category date slug thumbnail views createdAt');

    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch blogs' });
  }
};

// Get single blog by slug
exports.getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug, isPublished: true });

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    // Increment view count
    blog.views = (blog.views || 0) + 1;
    await blog.save();

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch blog' });
  }
};

// Create new blog (admin only)
exports.createBlog = async (req, res) => {
  try {
    const { title, tagline, category, date, thumbnail, content } = req.body;

    if (!title || !tagline || !category || !content) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const blog = new Blog({
      title,
      tagline,
      category,
      date: date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      thumbnail: thumbnail || '',
      content,
      isPublished: true
    });

    await blog.save();

    res.status(201).json({ success: true, data: blog, message: 'Blog created successfully' });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Blog title already exists' });
    }
    res.status(500).json({ success: false, message: 'Failed to create blog' });
  }
};

// Update blog (admin only)
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, tagline, category, date, thumbnail, content, isPublished } = req.body;

    const blog = await Blog.findByIdAndUpdate(
      id,
      { title, tagline, category, date, thumbnail, content, isPublished, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.status(200).json({ success: true, data: blog, message: 'Blog updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to update blog' });
  }
};

// Delete blog (admin only)
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to delete blog' });
  }
};

// Get all blogs for admin (including unpublished)
exports.getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .select('title tagline category date slug thumbnail isPublished views createdAt');

    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch blogs' });
  }
};

// Get all blogs (admin)
exports.getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch all blogs (admin)' });
  }
};
