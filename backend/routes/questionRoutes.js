const express = require('express');
const router = express.Router();
const { submitQuestion, getQuestions, updateQuestionStatus } = require('../controllers/questionController');

router.post('/submit', submitQuestion);
router.get('/', getQuestions);
router.patch('/:id/status', updateQuestionStatus);

module.exports = router;
