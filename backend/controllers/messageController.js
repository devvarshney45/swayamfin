const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  try {
    const { recipient_id, message_text, lead_id } = req.body;
    const msg = await Message.create({
      sender_id: req.user.id,
      recipient_id,
      message_text,
      lead_id: lead_id || null
    });
    res.status(201).json({ success: true, data: msg });
  } catch(err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ sender_id: req.user.id }, { recipient_id: req.user.id }]
    })
    .populate('sender_id', 'full_name role')
    .populate('recipient_id', 'full_name role')
    .sort({ createdAt: -1 });

    res.json({ success: true, data: messages });
  } catch(err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const msg = await Message.findById(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Not found' });
    
    if (msg.recipient_id.toString() !== req.user.id) {
       return res.status(403).json({ message: 'Not authorized' });
    }

    msg.is_read = true;
    await msg.save();
    res.json({ success: true, data: msg });
  } catch(err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
