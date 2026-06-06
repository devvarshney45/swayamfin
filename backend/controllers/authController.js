const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate('branch_id');
    if (!user) {
      console.log(`[AUTH] Login failed: User not found for ${email}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.is_active) {
      console.log(`[AUTH] Login failed: User ${email} is inactive`);
      return res.status(401).json({ message: 'User account is inactive' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log(`[AUTH] Login failed: Password mismatch for ${email}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    console.log(`[AUTH] Login successful for ${email}`);

    const token = jwt.sign(
      { 
        id: user._id, 
        role: user.role, 
        branch_id: user.branch_id ? user.branch_id._id : null 
      },
      process.env.JWT_SECRET || 'swayamfin_secret_key_123',
      { expiresIn: '8h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        branch: user.branch_id
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      message: 'System Integrity Error', 
      details: process.env.NODE_ENV === 'development' ? err.message : 'Database or Authentication Service unreachable'
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password_hash').populate('branch_id');
    res.json({
      id: user._id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
      branch: user.branch_id
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
