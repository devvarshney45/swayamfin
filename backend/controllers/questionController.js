const Question = require('../models/Question');

// POST /api/questions/submit
exports.submitQuestion = async (req, res) => {
  try {
    const { question, email } = req.body;
    if (!question || !email || !question.trim() || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Email and question are required.' });
    }
    const saved = await Question.create({ email: email.trim(), question: question.trim() });
    console.log(`[QUESTION] Saved: ${saved._id} | from: ${email}`);
    return res.status(200).json({ success: true, message: 'Question submitted successfully.' });
  } catch (error) {
    console.error('[QUESTION] Error saving question:', error.message);
    return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};

// GET /api/questions
exports.getQuestions = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status && status !== 'all' ? { status } : {};
    const questions = await Question.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: questions, total: questions.length });
  } catch (error) {
    console.error('[QUESTION] Error fetching questions:', error.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// PATCH /api/questions/:id/status
exports.updateQuestionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status.' });
    }
    const updated = await Question.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Not found.' });
    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error('[QUESTION] Error updating status:', error.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};
