const Branch = require('../models/Branch');

exports.getBranches = async (req, res) => {
  try {
    const branches = await Branch.find();
    res.json({ success: true, count: branches.length, data: branches });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.createBranch = async (req, res) => {
  try {
    const branch = await Branch.create(req.body);
    res.status(201).json({ success: true, data: branch });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
