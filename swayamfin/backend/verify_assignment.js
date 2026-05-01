const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Lead = require('./models/Lead');
const Branch = require('./models/Branch');
const User = require('./models/User');
const Remark = require('./models/Remark');
const { createLead } = require('./controllers/leadController');

dotenv.config();

const URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/swayamfin';

async function verify() {
  await mongoose.connect(URI);
  console.log('--- SYSTEM VERIFICATION START ---');

  // 1. Check if we have branches and users
  const branch = await Branch.findOne({ name: 'Agra HQ' });
  const agent = await User.findOne({ email: 'agra.sp1@swipfin.com' });

  if (!branch || !agent) {
    console.error('Error: Branch or Agent not found. Run seed.js first.');
    process.exit(1);
  }

  console.log(`Testing with Branch: ${branch.name}, Agent: ${agent.full_name}`);

  // 2. Simulate a lead creation (This will trigger the round-robin logic)
  // We mock the Request/Response objects
  const req = {
    body: {
      applicant_name: 'Test Applicant',
      mobile: '9876543210',
      location_city: 'Agra',
      loan_type: 'home_loan',
      loan_amount_required: 5000000,
      source: 'website'
    }
  };

  const res = {
    status: function(code) { this.statusCode = code; return this; },
    json: function(data) { this.data = data; return this; }
  };

  console.log('Simulating lead creation...');
  await createLead(req, res);

  if (res.statusCode === 201) {
    const lead = res.data.data;
    console.log(`Lead created: ${lead.lead_number}`);
    console.log(`Assigned Agent ID: ${lead.assigned_to}`);
    
    // 3. Verify if assigned correctly
    if (lead.assigned_to && lead.assigned_to.toString() === agent._id.toString()) {
      console.log('SUCCESS: Lead assigned to the correct agent (Agra agent).');
    } else {
      console.log('FAIL: Assignment logic failed.');
    }

    // 4. Verify System Remark
    const remark = await Remark.findOne({ lead_id: lead._id, remark_type: 'system' });
    if (remark) {
      console.log(`System Remark Found: ${remark.remark_text}`);
    } else {
      console.log('Note: System remarks not yet implemented or triggered for first assignment.');
    }
  } else {
    console.error('Lead creation failed:', res.data);
  }

  console.log('--- SYSTEM VERIFICATION COMPLETE ---');
  process.exit(0);
}

verify();
