const Lead = require('../models/Lead');
const Branch = require('../models/Branch');
const User = require('../models/User');

/**
 * Validates duplication and creates a lead with round robin routing
 */
exports.createLead = async (req, res) => {
  try {
    const { fullName, mobile, loanType, amount, city, utm_source, utm_medium, utm_campaign } = req.body;

    // 1. Lead Deduplication
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const existingLead = await Lead.findOne({
      mobile,
      createdAt: { $gte: oneDayAgo },
    });

    if (existingLead) {
      return res.status(409).json({ 
        success: false, 
        message: 'A lead with this mobile number was already submitted within the last 24 hours.' 
      });
    }

    // 2. Round-Robin Lead Routing Setup
    let assignedBranch = null;   
    let assignedAgent = null;    
    
    // Exact mapping logic checking MongoDB for nearest city and finding agent with oldest 'lastAssigned'
    const branch = await Branch.findOne({ city: new RegExp(city, 'i') });
    if (branch) {
       assignedBranch = branch._id;
       const nextAgent = await User.findOne({ branch: branch._id, role: 'Agent' }).sort({ lastAssigned: 1 });
       if (nextAgent) {
         assignedAgent = nextAgent._id;
         nextAgent.lastAssigned = Date.now();
         await nextAgent.save();
       }
    }

    // 3. Create Lead
    const newLead = await Lead.create({
      fullName,
      mobile,
      loanType,
      amount,
      city,
      assignedBranch,
      assignedAgent,
      utm_source,
      utm_medium,
      utm_campaign,
    });

    res.status(201).json({
      success: true,
      data: newLead,
      message: 'Lead captured successfully!',
    });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ success: false, message: 'Server Error. Could not process lead.' });
  }
};

/**
 * Gets all leads assigned to the authenticated agent today
 */
exports.getTodaysLeads = async (req, res) => {
  try {
    // Note: Assuming req.user._id is populated via authentication middleware
    const agentId = req.user ? req.user._id : null; 
    
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const query = {
      createdAt: { $gte: startOfToday }
    };
    
    if (agentId) {
      query.assignedAgent = agentId;
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    console.error('Error fetching today\'s leads:', error);
    res.status(500).json({ success: false, message: 'Could not fetch leads.' });
  }
};

/**
 * Updates status / logs call data for a lead
 */
exports.updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, agentNotes } = req.body;

    const lead = await Lead.findById(id);
    
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found.' });
    }

    if (status) lead.status = status;
    if (agentNotes) lead.agentNotes = agentNotes;

    await lead.save();

    res.status(200).json({
      success: true,
      data: lead,
      message: 'Lead updated successfully.',
    });
  } catch (error) {
    console.error('Error updating lead status:', error);
    res.status(500).json({ success: false, message: 'Could not update lead.' });
  }
};

/**
 * Gets a single lead by ID
 */
exports.getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate('assignedBranch')
      .populate('assignedAgent', 'name email');

    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    // Security: Check if agent is assigned or user is admin
    if (req.user.role !== 'Admin' && lead.assignedAgent?._id.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

/**
 * Gets all leads for Super Admin (global view)
 */
exports.getAllLeads = async (req, res) => {
  try {
    const { status, loanType, city } = req.query;
    const query = {};
    if (status) query.status = status;
    if (loanType) query.loanType = loanType;
    if (city) query.city = new RegExp(city, 'i');

    const leads = await Lead.find(query)
      .populate('assignedBranch')
      .populate('assignedAgent', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

/**
 * Gets lead statistics for Admin Dashboard
 */
exports.getLeadStats = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const statusStats = await Lead.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const loanTypeStats = await Lead.aggregate([
      { $group: { _id: '$loanType', count: { $sum: 1 } } }
    ]);
    const cityStats = await Lead.aggregate([
      { $group: { _id: '$city', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalLeads,
        statusStats,
        loanTypeStats,
        cityStats
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
