const fs = require('fs');
const path = require('path');
const Lead = require('../models/Lead');
const Branch = require('../models/Branch');
const User = require('../models/User');
const Remark = require('../models/Remark');
const Document = require('../models/Document');
const Message = require('../models/Message');
const notificationService = require('../utils/notificationService');
const axios = require('axios');
const nodemailer = require('nodemailer');

const otpStore = new Map();
const OTP_MAX_REQUESTS = 5;
const OTP_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const OTP_COOLDOWN_MS = 60 * 1000; // 60 seconds
const OTP_EXPIRE_MS = 2 * 60 * 1000; // 2 minutes
const OTP_BLOCK_MS = 15 * 60 * 1000; // 15 minutes
const MAX_WRONG_ATTEMPTS = 5;

const getOtpRecord = (email) => otpStore.get(email) || {
  requests: [],
  attempts: 0,
  blockedUntil: null,
  lastSentAt: null,
  otp: null,
  expires: null,
};

const saveOtpRecord = (email, record) => {
  otpStore.set(email, record);
  return record;
};

const cleanupOtpRecord = (email) => {
  otpStore.delete(email);
};

const isBlocked = (record) => record.blockedUntil && Date.now() < record.blockedUntil;

exports.createLead = async (req, res) => {
  try {
    const { 
      source, applicant_name, mobile, alternate_mobile, email, 
      location_city, pincode, loan_type, loan_amount_required,
      submitted_by, otp_method
    } = req.body;

    if (!applicant_name || !mobile || !location_city || !loan_type || !loan_amount_required) {
      return res.status(400).json({ message: 'Please provide all required fields: name, mobile, city, loan type, and amount.' });
    }

    // Deduplication check
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const existingLead = await Lead.findOne({
      mobile,
      createdAt: { $gte: oneDayAgo },
    });

    if (existingLead) {
      return res.status(409).json({ message: 'A lead with this mobile number was already submitted within the last 24 hours.' });
    }

    // Branch Mapping & Round Robin
    let assigned_to = null;
    let branch_id = null;

    const branch = await Branch.findOne({ city: new RegExp(`^${location_city.trim()}$`, 'i'), is_active: true });
    
    if (branch) {
      branch_id = branch._id;
      // Find active sales_person with oldest assignment
      const nextAgent = await User.findOne({ 
        branch_id: branch._id, 
        role: 'sales_person',
        is_active: true 
      }).sort({ lastAssigned: 1 });

      if (nextAgent) {
        assigned_to = nextAgent._id;
        nextAgent.lastAssigned = Date.now();
        await nextAgent.save();
      }
    }

    // Generate Lead Number
    const year = new Date().getFullYear();
    const branchCode = branch ? branch.code : 'ADM';
    const count = await Lead.countDocuments({ 
      createdAt: { $gte: new Date(`${year}-01-01`) },
      branch_id 
    });
    const lead_number = `${branchCode}-${year}-${String(count + 1).padStart(4, '0')}`;

    const newLead = await Lead.create({
      lead_number,
      source: source || 'website',
      applicant_name,
      mobile,
      alternate_mobile,
      email,
      location_city: location_city.trim(),
      pincode,
      loan_type,
      loan_amount_required,
      branch_id,
      assigned_to,
      submitted_by: submitted_by || undefined,
      otp_method: otp_method || 'email',
    });

    // Send WhatsApp Notification if agent assigned
    if (assigned_to) {
      const agent = await User.findById(assigned_to);
      if (agent) {
        await notificationService.sendWhatsAppAssignment(agent, newLead);
        
        // Log Initial Assignment
        await Remark.create({
          lead_id: newLead._id,
          user_id: assigned_to, // Initially assigned to this user
          remark_text: `Lead automatically assigned to ${agent.full_name} via Round-robin.`,
          remark_type: 'system'
        });
      }
    }

    // [NEW] Send Welcome WhatsApp to Customer
    await notificationService.sendCustomerWelcome(newLead);

    // Send Confirmation Email to Customer
    if (email) {
      try {
        const brevoHost = process.env.BREVO_HOST || 'smtp-relay.brevo.com';
        const brevoPort = Number(process.env.BREVO_PORT || 587);
        const brevoUser = process.env.BREVO_USER;
        const brevoPass = process.env.BREVO_PASS;
        const defaultFrom = `"Swayamfin" <${brevoUser}>`;
        const mailFrom = process.env.MAIL_FROM?.trim() || defaultFrom;

        if (brevoUser && brevoPass) {
          const transporter = nodemailer.createTransport({
            host: brevoHost,
            port: brevoPort,
            secure: false,
            auth: {
              user: brevoUser,
              pass: brevoPass,
            },
            connectionTimeout: 10000,
            greetingTimeout: 10000,
            socketTimeout: 10000,
          });

          const loanTypeDisplay = (loan_type || '').replace(/_/g, ' ').toUpperCase();
          const amountDisplay = (loan_amount_required || 0).toLocaleString('en-IN', { 
            style: 'currency', 
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0 
          });

          const mailOptions = {
            from: mailFrom,
            to: email,
            subject: 'Lead Submission Confirmation - Swayamfin',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #0EA5E9 0%, #0369A1 100%); padding: 30px; text-align: center; color: white; border-radius: 8px 8px 0 0;">
                  <h2 style="margin: 0; font-size: 24px;">Swayamfin</h2>
                  <p style="margin: 10px 0 0 0; font-size: 14px;">Fast. Reliable. Trustworthy.</p>
                </div>
                <div style="background-color: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px;">
                  <h3 style="color: #1E293B; margin-top: 0;">Thank you for choosing Swayamfin!</h3>
                  <p style="color: #475569; line-height: 1.6;">Dear <strong>${applicant_name}</strong>,</p>
                  <p style="color: #475569; line-height: 1.6;">Your loan application has been successfully submitted. We're excited to help you access the financial solutions you need.</p>
                  <div style="background-color: white; border-left: 4px solid #0EA5E9; padding: 15px; margin: 20px 0; border-radius: 4px;">
                    <h4 style="color: #1E293B; margin-top: 0;">Application Details:</h4>
                    <table style="width: 100%; color: #475569; font-size: 14px;">
                      <tr>
                        <td style="padding: 8px 0;"><strong>Lead Number:</strong></td>
                        <td style="padding: 8px 0; text-align: right; color: #0EA5E9; font-weight: bold;">${lead_number}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;"><strong>Loan Type:</strong></td>
                        <td style="padding: 8px 0; text-align: right;">${loanTypeDisplay}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;"><strong>Loan Amount:</strong></td>
                        <td style="padding: 8px 0; text-align: right;">${amountDisplay}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;"><strong>Location:</strong></td>
                        <td style="padding: 8px 0; text-align: right;">${location_city}</td>
                      </tr>
                    </table>
                  </div>
                  <p style="color: #475569; line-height: 1.6;">Our team will review your application and get in touch with you shortly. You can expect to hear from us within <strong>24-48 hours</strong>.</p>
                  <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
                    <strong>What's next?</strong><br>
                    • Our team will contact you via phone/WhatsApp<br>
                    • Document verification<br>
                    • Quick approval & disbursement
                  </p>
                  <div style="background-color: #ecf9ff; border: 1px solid #cffafe; padding: 15px; border-radius: 4px; margin: 20px 0;">
                    <p style="color: #0369A1; margin: 0; font-size: 13px;">
                      <strong>Need support?</strong> Contact us at <a href="https://wa.me/919560723332" style="color: #0EA5E9; text-decoration: none;">WhatsApp</a> or call our team for immediate assistance.
                    </p>
                  </div>
                  <p style="color: #64748b; font-size: 12px; text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                    This is an automated message. Please do not reply to this email.
                  </p>
                </div>
              </div>
            `,
          };

          const info = await transporter.sendMail(mailOptions);
          console.log('Lead confirmation email sent:', info.messageId);
        }
      } catch (emailError) {
        console.error('Error sending lead confirmation email:', emailError);
        // Don't fail the lead creation if email fails - log and continue
      }
    }

    res.status(201).json({ success: true, data: newLead });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getLeads = async (req, res) => {
  try {
    const userRole = req.user.role;
    let query = {};

    if (userRole === 'sales_person') {
      query.assigned_to = req.user._id;
    } else if (userRole === 'bsm') {
      query.branch_id = req.user.branch_id;
    } // admin sees all

    const leads = await Lead.find(query)
      .populate('assigned_to', 'full_name')
      .populate('branch_id', 'code name')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

exports.getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate('assigned_to', 'full_name email phone')
      .populate('branch_id', 'name code city');

    if (!lead) return res.status(404).json({ message: 'Lead not found' });

    if (req.user.role === 'sales_person' && lead.assigned_to?._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this lead' });
    }
    if (req.user.role === 'bsm' && lead.branch_id?._id.toString() !== req.user.branch_id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.status(200).json(lead);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Not found' });

    if (req.user.role === 'sales_person' && lead.assigned_to?.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized' });
    }
    if (req.user.role === 'bsm' && lead.branch_id?.toString() !== req.user.branch_id?.toString()) {
        return res.status(403).json({ message: 'Not authorized' });
    }

    const data = { ...req.body };
    delete data.lead_number;

    Object.assign(lead, data);
    if (data.status) {
      const statusToStage = {
        New: 'new',
        Contacted: 'contacted',
        'In Progress': 'in_progress',
        'Document Submitted': 'docs_submitted',
        Sanctioned: 'sanctioned',
        Disbursed: 'disbursed',
        'Closed - Won': 'closed',
        'Dead Lead': 'dead',
        'On Hold': 'on_hold',
      };
      if (statusToStage[data.status]) lead.stage = statusToStage[data.status];
    }
    await lead.save();

    res.json({ success: true, data: lead });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only administrators can delete leads' });
    }

    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });

    const uploadsRoot = path.join(__dirname, '../uploads');
    const docs = await Document.find({ lead_id: lead._id });
    for (const doc of docs) {
      if (doc.file_url && doc.file_url.startsWith('/uploads/')) {
        const fname = path.basename(doc.file_url);
        const abs = path.join(uploadsRoot, fname);
        try {
          if (fs.existsSync(abs)) fs.unlinkSync(abs);
        } catch (e) {
          console.error('deleteLead unlink', e);
        }
      }
    }

    await Document.deleteMany({ lead_id: lead._id });
    await Remark.deleteMany({ lead_id: lead._id });
    await Message.deleteMany({ lead_id: lead._id });
    await Lead.findByIdAndDelete(lead._id);

    res.json({ success: true, message: 'Lead removed' });
  } catch (err) {
    console.error('deleteLead', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status, stage, dead_reason } = req.body;
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Not found' });

    const oldStatus = lead.status;
    if (status) {
      lead.status = status;
      // Automated mapping to stages
      const statusToStage = {
        'New': 'new',
        'Contacted': 'contacted',
        'In Progress': 'in_progress',
        'Document Submitted': 'docs_submitted',
        'Sanctioned': 'sanctioned',
        'Disbursed': 'disbursed',
        'Closed - Won': 'closed',
        'Dead Lead': 'dead',
        'On Hold': 'on_hold'
      };
      if (statusToStage[status]) lead.stage = statusToStage[status];
    }
    if (dead_reason) lead.dead_reason = dead_reason;

    if (status === 'Dead Lead' || status === 'Closed - Won' || status === 'Disbursed') {
      lead.closing_date = Date.now();
    }

    await lead.save();

    // Log Activity as System Remark
    if (status && status !== oldStatus) {
      await Remark.create({
        lead_id: lead._id,
        user_id: req.user.id,
        remark_text: `Status updated from ${oldStatus} to ${status}`,
        remark_type: 'system'
      });

      // [NEW] Trigger Customer WhatsApp for Sanctioned/Disbursed
      if (status === 'Sanctioned' || status === 'Disbursed') {
        await notificationService.sendCustomerStatusUpdate(lead, status);
      }
    }

    res.json({ success: true, data: lead });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.reassignLead = async (req, res) => {
  try {
    const { new_assigned_to } = req.body;
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Not found' });
    
    // Only BSM and Admin can reassign
    if (req.user.role === 'bsm' && lead.branch_id?.toString() !== req.user.branch_id.toString()) {
        return res.status(403).json({ message: 'Not authorized' });
    }

    const oldAgentId = lead.assigned_to;
    lead.assigned_to = new_assigned_to;
    await lead.save();

    // Send WhatsApp Notification on Reassignment
    const agent = await User.findById(new_assigned_to);
    if (agent) {
      await notificationService.sendWhatsAppAssignment(agent, lead);
      
      // Log Activity
      await Remark.create({
        lead_id: lead._id,
        user_id: req.user.id,
        remark_text: `Lead reassigned to ${agent.full_name}`,
        remark_type: 'system'
      });
    }

    res.json({ success: true, data: lead });
  } catch(err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Valid email is required' });
    }

    const now = Date.now();
    const record = getOtpRecord(email);

    if (isBlocked(record)) {
      return res.status(429).json({ message: 'OTP requests temporarily blocked due to repeated invalid submissions. Try again later.' });
    }

    record.requests = (record.requests || []).filter(ts => now - ts < OTP_WINDOW_MS);
    if (record.requests.length >= OTP_MAX_REQUESTS) {
      record.blockedUntil = now + OTP_BLOCK_MS;
      saveOtpRecord(email, record);
      return res.status(429).json({ message: 'Too many OTP requests. Please try again after 15 minutes.' });
    }

    if (record.lastSentAt && now - record.lastSentAt < OTP_COOLDOWN_MS) {
      const waitSeconds = Math.ceil((OTP_COOLDOWN_MS - (now - record.lastSentAt)) / 1000);
      return res.status(429).json({ message: `Please wait ${waitSeconds} seconds before requesting a new OTP.` });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const newRecord = {
      ...record,
      otp,
      expires: now + OTP_EXPIRE_MS,
      lastSentAt: now,
      attempts: record.attempts || 0,
      blockedUntil: record.blockedUntil || null,
      requests: [...record.requests, now],
    };
    saveOtpRecord(email, newRecord);

    const sendEmail = async () => {
      // Brevo SMTP Configuration (Render-friendly)
      const brevoHost = process.env.BREVO_HOST || 'smtp-relay.brevo.com';
      const brevoPort = Number(process.env.BREVO_PORT || 587);
      const brevoUser = process.env.BREVO_USER;
      const brevoPass = process.env.BREVO_PASS;
      const defaultFrom = `"Swayamfin" <${brevoUser}>`;
      const mailFrom = process.env.MAIL_FROM?.trim() || defaultFrom;

      if (!brevoUser || !brevoPass) {
        throw new Error('Brevo SMTP credentials (BREVO_USER, BREVO_PASS) are not configured in environment variables');
      }

      // Create Brevo transporter
      const transporter = nodemailer.createTransport({
        host: brevoHost,
        port: brevoPort,
        secure: false,
        auth: {
          user: brevoUser,
          pass: brevoPass,
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
      });

      const mailOptions = {
        from: mailFrom,
        to: email,
        subject: 'Your verification code',
        text: `Your OTP code is ${otp}. It is valid for 2 minutes.`,
        html: `<p>Your OTP code is <strong>${otp}</strong>. It is valid for <strong>2 minutes</strong>.</p>`,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('OTP email sent via Brevo:', info.messageId);
    };

    await sendEmail();
    console.log(`OTP sent successfully to ${email}`);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error.stack || error);
    res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
};

exports.verifyOtpAndCreateLead = async (req, res) => {
  try {
    const { email, otp, leadData } = req.body;
    if (!email || !otp || !leadData) {
      return res.status(400).json({ message: 'Email, OTP, and lead data required' });
    }

    const record = getOtpRecord(email);
    if (isBlocked(record)) {
      return res.status(429).json({ message: 'OTP verification temporarily blocked. Try again later.' });
    }

    const now = Date.now();
    if (!record.otp || now > record.expires) {
      cleanupOtpRecord(email);
      return res.status(400).json({ message: 'OTP expired or invalid' });
    }

    if (record.otp !== otp) {
      record.attempts = (record.attempts || 0) + 1;
      if (record.attempts >= MAX_WRONG_ATTEMPTS) {
        record.blockedUntil = now + OTP_BLOCK_MS;
      }
      saveOtpRecord(email, record);
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    cleanupOtpRecord(email);

    const {
      source, applicant_name, mobile, alternate_mobile, location_city,
      pincode, loan_type, loan_amount_required,
      email: leadEmail,
    } = leadData;

    const finalEmail = leadEmail || email;

    if (!applicant_name || !mobile || !location_city || !loan_type || !loan_amount_required) {
      return res.status(400).json({ message: 'Please provide all required fields: name, mobile, city, loan type, and amount.' });
    }

    const oneDayAgo = new Date(now - 24 * 60 * 60 * 1000);
    const existingLead = await Lead.findOne({
      mobile,
      createdAt: { $gte: oneDayAgo },
    });

    if (existingLead) {
      return res.status(409).json({ message: 'A lead with this mobile number was already submitted within the last 24 hours.' });
    }

    let assigned_to = null;
    let branch_id = null;

    const branch = await Branch.findOne({ city: new RegExp(`^${location_city.trim()}$`, 'i'), is_active: true });
    
    if (branch) {
      branch_id = branch._id;
      const nextAgent = await User.findOne({
        branch_id: branch._id,
        role: 'sales_person',
        is_active: true
      }).sort({ lastAssigned: 1 });

      if (nextAgent) {
        assigned_to = nextAgent._id;
        nextAgent.lastAssigned = Date.now();
        await nextAgent.save();
      }
    }

    const year = new Date().getFullYear();
    const branchCode = branch ? branch.code : 'ADM';
    const count = await Lead.countDocuments({
      createdAt: { $gte: new Date(`${year}-01-01`) },
      branch_id
    });
    const lead_number = `${branchCode}-${year}-${String(count + 1).padStart(4, '0')}`;

    const newLead = await Lead.create({
      lead_number,
      source: source || 'website',
      applicant_name,
      mobile,
      alternate_mobile,
      email: finalEmail,
      location_city: location_city.trim(),
      pincode,
      loan_type,
      loan_amount_required,
      branch_id,
      assigned_to,
    });

    if (assigned_to) {
      const agent = await User.findById(assigned_to);
      if (agent) {
        await notificationService.sendWhatsAppAssignment(agent, newLead);
        await Remark.create({
          lead_id: newLead._id,
          user_id: assigned_to,
          remark_text: `Lead automatically assigned to ${agent.full_name} via Round-robin.`,
          remark_type: 'system'
        });
      }
    }

    await notificationService.sendCustomerWelcome(newLead);

    res.status(201).json({ success: true, data: newLead });
  } catch (error) {
    console.error('Error creating lead after OTP verification:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
