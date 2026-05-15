const express = require('express');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { createLead, getLeads, getLeadById, updateLead, updateStatus, reassignLead, deleteLead, sendOtp, verifyOtpAndCreateLead } = require('../controllers/leadController');
const { protect, bsmOnly, adminOnly } = require('../middleware/authMiddleware');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }
  next();
};

const otpRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => process.env.NODE_ENV === 'development',
  message: 'Too many OTP requests from this IP, please try again later.',
});

const emailValidation = body('email')
  .trim()
  .isEmail()
  .withMessage('Valid email is required');

const otpValidation = body('otp')
  .trim()
  .isLength({ min: 6, max: 6 })
  .withMessage('OTP must be 6 digits')
  .isNumeric()
  .withMessage('OTP must contain only digits');

const leadDataValidation = [
  body('leadData.applicant_name').notEmpty().withMessage('Applicant name is required'),
  body('leadData.mobile')
    .trim()
    .isLength({ min: 10, max: 10 })
    .withMessage('Mobile must be exactly 10 digits')
    .isNumeric()
    .withMessage('Mobile must contain only digits'),
  body('leadData.loan_type').notEmpty().withMessage('Loan type is required'),
  body('leadData.location_city').notEmpty().withMessage('Location city is required'),
  body('leadData.loan_amount_required').isNumeric().withMessage('Loan amount must be numeric'),
  body('leadData.email').trim().isEmail().withMessage('Email must be valid'),
];

router.post('/', createLead); // Public for Landing Page & Private for Agents (Internal assignment handled in controller)
router.post('/website', createLead); // Webhook
router.post('/send-otp', otpRateLimiter, [emailValidation, validateRequest], sendOtp);
router.post('/verify-otp', [emailValidation, otpValidation, ...leadDataValidation, validateRequest], verifyOtpAndCreateLead);
router.get('/', protect, getLeads);
router.get('/:id', protect, getLeadById);
router.put('/:id', protect, updateLead);
router.delete('/:id', protect, adminOnly, deleteLead);
router.patch('/:id/status', protect, updateStatus);
router.patch('/:id/assign', protect, bsmOnly, reassignLead);

module.exports = router;
