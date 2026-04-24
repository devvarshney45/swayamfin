const User = require('../models/User');

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
    const { full_name, email, password_hash, branch_id, phone, employee_code, role } = req.body;
    const user = await User.create({ 
      full_name, email, password_hash, branch_id, phone, employee_code, role 
    });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
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
