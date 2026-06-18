const mongoose = require('mongoose');
const Lead = require('../models/Lead');
require('dotenv').config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/swayamfin');
    console.log('Connected to DB...');

    const companies = ['Swayamfin', 'DMI', 'Credifin'];
    const partners = ['DMI', 'Credifin'];
    const names = ['Rahul', 'Ankit', 'Suresh', 'Priya', 'Amit', 'Neha', 'Vikram', 'Pooja', 'Deepak', 'Arun'];

    // Create 20 leads for June 2026
    for (let i = 0; i < 20; i++) {
      const partner = partners[i % 2];
      const lead_number = `JUNE-${Date.now()}-${i}`;
      
      // Distributed dates across the last 10 days
      const dayOffset = Math.floor(Math.random() * 10);
      const createdAt = new Date('2026-06-18');
      createdAt.setDate(createdAt.getDate() - dayOffset);

      // Milestone dates
      const sDate = new Date(createdAt);
      sDate.setDate(sDate.getDate() + 1);
      const dDate = new Date(sDate);
      dDate.setDate(dDate.getDate() + 1);

      const lead = new Lead({
        lead_number,
        source: 'manual',
        applicant_name: `${names[Math.floor(Math.random() * names.length)]} ${i}`,
        mobile: `88888${10000 + i}`,
        location_city: 'Agra',
        loan_type: 'lap',
        loan_amount_required: 1000000,
        partner_login: partner,
        case_under_company: 'Swayamfin',
        fees: 10000 + (i * 100),
        sanction_amount: 800000 + (i * 1000),
        disbursed_amount: i % 3 === 0 ? 800000 + (i * 1000) : 0,
        status: i % 3 === 0 ? 'Disbursed' : i % 3 === 1 ? 'Under Sanction' : 'Under login stage',
        sanction_date: sDate.toISOString().split('T')[0],
        disbursement_date: dDate.toISOString().split('T')[0],
        createdAt: createdAt
      });

      await lead.save();
      console.log(`Saved: ${lead_number} | Partner: ${partner} | Date: ${createdAt.toDateString()}`);
    }

    console.log('Seeding complete! Check your new partner-wise graphs.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
