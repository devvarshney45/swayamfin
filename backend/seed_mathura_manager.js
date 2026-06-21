const mongoose = require('mongoose');
const User = require('./models/User');
const Lead = require('./models/Lead');
const Branch = require('./models/Branch');
require('dotenv').config();

const seedManager = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Find Mathura branch
    const mathura = await Branch.findOne({ name: 'Mathura' });
    if (!mathura) {
      console.log('Mathura branch not found');
      process.exit(1);
    }

    // Create Manager (sales_person)
    const email = 'mathura.manager@swayamfin.com';
    const password = 'Pass@Mathura2026';
    
    // Check if exists
    let manager = await User.findOne({ email });
    if (manager) {
      await User.deleteOne({ email });
    }

    manager = new User({
      full_name: 'Manish Choudhary',
      email: email,
      phone: '9876543210',
      password_hash: password, // will be hashed in pre-save
      role: 'sales_person',
      branch_id: mathura._id,
      employee_code: 'RM-MAT-001'
    });

    await manager.save();
    console.log(`Manager created: ${email} / ${password}`);

    // Assign some leads to him
    // I'll take a few random leads or create new ones
    const leadsCount = 3;
    for (let i = 0; i < leadsCount; i++) {
        const lead = new Lead({
            lead_number: `MAT-2026-000${i+1}`,
            source: 'manual',
            applicant_name: `Client ${i+1} Mathura`,
            mobile: `999990000${i}`,
            location_city: 'Mathura',
            loan_type: 'lap',
            loan_amount_required: 5000000,
            assigned_to: manager._id,
            branch_id: mathura._id,
            partner_login: 'DMI',
            status: 'Under Credit'
        });
        await lead.save();
        console.log(`Lead ${lead.lead_number} assigned to ${manager.full_name}`);
    }

    console.log('Mathura Manager seed complete.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedManager();
