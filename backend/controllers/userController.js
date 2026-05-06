const mongoose = require('mongoose');
const User = require('../models/User');
const Branch = require('../models/Branch');

const resolveBranchId = async (branchIdOrName) => {
  if (!branchIdOrName || branchIdOrName === '') return null;
  if (mongoose.Types.ObjectId.isValid(branchIdOrName)) {
    return branchIdOrName;
  }

  const branch = await Branch.findOne({
    name: new RegExp(`^${branchIdOrName.trim()}$`, 'i')
  });
  return branch ? branch._id : null;
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('branch_id');
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getBranchUsers = async (req, res) => {
  try {
    const branch_id = req.user.branch_id;
    const users = await User.find({ branch_id }).populate('branch_id');
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('branch_id').select('-password_hash');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // BSM can only view users in their own branch
    if (req.user.role === 'bsm' && user.branch_id?._id.toString() !== req.user.branch_id?.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to view personnel from other nodes' });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.createUser = async (req, res) => {
  try {
    let { full_name, email, password_hash, branch_id, phone, employee_code, role } = req.body;

    const allowedRoles = ['sales_person', 'bsm', 'admin', 'hr'];
    if (!role || !allowedRoles.includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid or missing role' });
    }

    branch_id = await resolveBranchId(branch_id);

    if (!employee_code || String(employee_code).trim() === '') {
      employee_code = undefined;
    }

    if (!password_hash || !String(password_hash).trim()) {
      return res.status(400).json({ success: false, message: 'Password is required' });
    }

    const user = await User.create({
      full_name,
      email,
      password_hash,
      branch_id,
      phone,
      employee_code,
      role,
    });
    const safe = user.toObject();
    delete safe.password_hash;
    res.status(201).json({ success: true, data: safe });
  } catch (error) {
    console.error('createUser', error);
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email or employee code already exists' });
    }
    res.status(500).json({ success: false, message: error.message || 'Server Error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const {
      full_name,
      email,
      phone,
      employee_code,
      role,
      branch_id,
      password_hash,
      is_active,
    } = req.body;

    if (full_name !== undefined) user.full_name = full_name;
    if (email !== undefined) user.email = email;
    if (phone !== undefined) user.phone = phone;
    if (is_active !== undefined) user.is_active = is_active;

    if (role !== undefined) {
      const allowedRoles = ['sales_person', 'bsm', 'admin', 'hr'];
      if (!allowedRoles.includes(role)) {
        return res.status(400).json({ success: false, message: 'Invalid role' });
      }
      user.role = role;
    }

    let nextBranch = await resolveBranchId(branch_id);
    if (nextBranch !== undefined) {
      user.branch_id = nextBranch;
    }

    if (employee_code !== undefined) {
      user.employee_code = String(employee_code).trim() === '' ? undefined : employee_code;
    }

    if (password_hash && String(password_hash).trim()) {
      user.password_hash = password_hash;
    }

    await user.save();
    const safe = user.toObject();
    delete safe.password_hash;
    res.json({ success: true, data: safe });
  } catch (error) {
    console.error('updateUser', error);
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email or employee code already exists' });
    }
    res.status(500).json({ success: false, message: error.message || 'Server Error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'User removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
