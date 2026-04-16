const User = require('../models/User');

exports.getAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: 'Agent' }).populate('branch');
    res.json({ success: true, count: agents.length, data: agents });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.createAgent = async (req, res) => {
  try {
    const { name, email, password, branch, cityName, role } = req.body;
    const agent = await User.create({ name, email, password, branch, cityName, role: role || 'Agent' });
    res.status(201).json({ success: true, data: agent });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.updateAgent = async (req, res) => {
  try {
    const agent = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: agent });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.deleteAgent = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Agent removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
