const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'swayamfin_secret_key_123');

      req.user = await User.findById(decoded.id).select('-password_hash');
      if (!req.user || !req.user.is_active) {
        return res.status(401).json({ message: 'User not found or inactive' });
      }

      next();
    } catch (err) {
      console.error('Auth middleware error:', err);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

exports.adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

exports.bsmOnly = (req, res, next) => {
  if (req.user && (req.user.role === 'bsm' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as a BSM' });
  }
};
