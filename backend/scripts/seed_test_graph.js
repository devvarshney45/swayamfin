const mongoose = require('mongoose');
const Lead = require('../models/Lead');
require('dotenv').config();

async function seedTestLeads() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/swayamfin');
    console.log('Connected to DB...');

    // Clear existing test leads created by this script if any (optional, but better to just add)
    
    const companies = ['DMI', 'Credifin'];
    const names = ['Test Applicant A', 'Test Applicant B', 'Test Applicant C', 'Test Applicant D'];
    
    // Create leads for the last 10 days
    for (let i = 0; i < 20; i++) {
      const randomDaysAgo = Math.floor(Math.random() * 10);
      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - randomDaysAgo);
      
      const company = companies[Math.floor(Math.random() * companies.length)];
      const lead_number = `TEST-${Date.now()}-${i}`;
      
      const lead = new Lead({
        lead_number,
        source: 'website',
        applicant_name: `${names[Math.floor(Math.random()*names.length)]} ${i}`,
        mobile: `99999${10000 + i}`,
        email: `test${i}@example.com`,
        location_city: 'Agra',
        loan_type: 'msme_structured',
        loan_amount_required: 500000,
        case_under_company: company,
        status: 'Under login stage',
        createdAt: createdAt
      });
      
      await lead.save();
      console.log(`Saved lead for ${createdAt.toDateString()} under ${company}`);
    }

    console.log('Seeding complete! Check your graph now.');
    await mongoose.disconnect();
  } catch (err) {
    console.error('Seeding error:', err);
  }
}

seedTestLeads();
