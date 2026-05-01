const Remark = require('../models/Remark');

exports.addRemark = async (req, res) => {
  try {
    const { remark_text, remark_type, follow_up_date } = req.body;
    const lead_id = req.params.id;

    const remark = await Remark.create({
      lead_id,
      user_id: req.user.id,
      remark_text,
      remark_type,
      follow_up_date
    });

    res.status(201).json({ success: true, data: remark });
  } catch(err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getRemarks = async (req, res) => {
  try {
    const remarks = await Remark.find({ lead_id: req.params.id })
      .populate('user_id', 'full_name role')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: remarks });
  } catch(err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
