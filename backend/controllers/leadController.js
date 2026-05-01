const Lead = require('../models/Lead');
const Branch = require('../models/Branch');
const User = require('../models/User');
const Remark = require('../models/Remark');
const notificationService = require('../utils/notificationService');

exports.createLead = async (req, res) => {
  try {
    const { 
      source, applicant_name, mobile, alternate_mobile, email, 
      location_city, pincode, loan_type, loan_amount_required 
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

    // Merge updates
    Object.assign(lead, req.body);
    await lead.save();

    res.json({ success: true, data: lead });
  } catch (err) {
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
