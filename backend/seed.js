const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('./models/User');
const Branch = require('./models/Branch');
const Lead = require('./models/Lead');
const Document = require('./models/Document');
const Remark = require('./models/Remark');
const Message = require('./models/Message');

const URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/swayamfin';

async function seed() {
  await mongoose.connect(URI);
  console.log('Connected. Wiping DB...');
  
  await User.deleteMany({});
  await Branch.deleteMany({});
  await Lead.deleteMany({});
  await Document.deleteMany({});
  await Remark.deleteMany({});
  await Message.deleteMany({});

  console.log('Seeding Branches...');
  const branches = await Branch.insertMany([
    { name: 'Agra Branch', code: 'AGR', city: 'Agra', is_active: true },
    { name: 'Mathura Branch', code: 'MTH', city: 'Mathura', is_active: true },
    { name: 'Hathras Branch', code: 'HTH', city: 'Hathras', is_active: true },
    { name: 'Kosi Branch', code: 'KOS', city: 'Kosi', is_active: true }
  ]);

  console.log('Seeding Users...');
  const commonPassword = 'Admin@123';

  // Admin Team
  await User.create({
    full_name: 'Vikkrant Prasad',
    email: 'vikkrant@swayamfin.com',
    phone: '8700965592',
    password_hash: commonPassword,
    role: 'admin',
    employee_code: 'ADM001',
    is_active: true
  });

  await User.create({
    full_name: 'Madhu Priya Prasad',
    email: 'madhu@swayamfin.com',
    phone: '8700965593',
    password_hash: commonPassword,
    role: 'admin',
    employee_code: 'ADM002',
    is_active: true
  });

  // BSMs
  await User.create({
    full_name: 'Nupur Prasad',
    email: 'nupur@swayamfin.com',
    phone: '8700965594',
    password_hash: commonPassword,
    role: 'bsm',
    branch_id: branches[0]._id, // Agra
    employee_code: 'BSM001',
    is_active: true
  });

  await User.create({
    full_name: 'Sudhanshu Shekhar',
    email: 'sudhanshu@swayamfin.com',
    phone: '8700965595',
    password_hash: commonPassword,
    role: 'bsm',
    branch_id: branches[1]._id, // Mathura
    employee_code: 'BSM002',
    is_active: true
  });

  // Sales Agents (2 per branch for Round-Robin testing)
  const agents = [
    { name: 'Agra Agent 1', branch: branches[0]._id, email: 'agra.sp1@swipfin.com', code: 'SP001' },
    { name: 'Agra Agent 2', branch: branches[0]._id, email: 'agra.sp2@swipfin.com', code: 'SP002' },
    { name: 'Mathura Agent 1', branch: branches[1]._id, email: 'mathura.sp1@swipfin.com', code: 'SP003' },
    { name: 'Mathura Agent 2', branch: branches[1]._id, email: 'mathura.sp2@swipfin.com', code: 'SP004' },
    { name: 'Hathras Agent 1', branch: branches[2]._id, email: 'hathras.sp1@swipfin.com', code: 'SP005' },
    { name: 'Hathras Agent 2', branch: branches[2]._id, email: 'hathras.sp2@swipfin.com', code: 'SP006' },
    { name: 'Kosi Agent 1', branch: branches[3]._id, email: 'kosi.sp1@swipfin.com', code: 'SP007' },
    { name: 'Kosi Agent 2', branch: branches[3]._id, email: 'kosi.sp2@swipfin.com', code: 'SP008' }
  ];

  for(const agent of agents) {
    await User.create({
      full_name: agent.name,
      email: agent.email,
      phone: '7777777777',
      password_hash: commonPassword,
      role: 'sales_person',
      branch_id: agent.branch,
      employee_code: agent.code,
      is_active: true,
      lastAssigned: Date.now()
    });
  }

  // Sample Leads for Analytics (Spread across branches)
  const allAgents = await User.find({ role: 'sales_person' });
  
  const sampleLeads = [
    { name: 'Rahul Kumar', city: 'Agra', branch: branches[0]._id, type: 'home_loan', amount: 2500000, status: 'In Progress', stage: 'in_progress' },
    { name: 'Anita Singh', city: 'Agra', branch: branches[0]._id, type: 'msme_structured', amount: 1500000, status: 'Disbursed', stage: 'disbursed' },
    { name: 'Vikram Singh', city: 'Mathura', branch: branches[1]._id, type: 'lap', amount: 5000000, status: 'Sanctioned', stage: 'sanctioned' },
    { name: 'Priya Sharma', city: 'Mathura', branch: branches[1]._id, type: 'supply_chain', amount: 8000000, status: 'New', stage: 'new' },
    { name: 'Amit Verma', city: 'Hathras', branch: branches[2]._id, type: 'home_loan', amount: 2000000, status: 'Contacted', stage: 'contacted' },
    { name: 'Sonal Gupta', city: 'Hathras', branch: branches[2]._id, type: 'msme_structured', amount: 1200000, status: 'Document Submitted', stage: 'docs_submitted' },
    { name: 'Karan Mehra', city: 'Kosi', branch: branches[3]._id, type: 'micro_lap', amount: 500000, status: 'Dead Lead', stage: 'dead' },
    { name: 'Deepak Raj', city: 'Kosi', branch: branches[3]._id, type: 'hybrid', amount: 3500000, status: 'New', stage: 'new' }
  ];

  for(let i=0; i<sampleLeads.length; i++) {
    const lead = sampleLeads[i];
    const assignedAgent = allAgents.find(a => a.branch_id.toString() === lead.branch.toString());
    
    await Lead.create({
      lead_number: `${lead.city.substring(0,3).toUpperCase()}-2025-${String(i+1).padStart(4, '0')}`,
      source: 'website',
      applicant_name: lead.name,
      mobile: `9${Math.floor(100000000 + Math.random() * 900000000)}`,
      location_city: lead.city,
      loan_type: lead.type,
      loan_amount_required: lead.amount,
      branch_id: lead.branch,
      assigned_to: assignedAgent?._id,
      status: lead.status,
      stage: lead.stage,
      closing_date: (lead.status === 'Disbursed' || lead.status === 'Dead Lead') ? Date.now() : null
    });
  }

  console.log('Done.');
  process.exit(0);
}

seed();
