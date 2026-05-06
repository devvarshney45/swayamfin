require('dotenv').config();
const mongoose = require('mongoose');
const Branch = require('../models/Branch');
const User = require('../models/User');

const branchesToSeed = [
  { name: 'Agra', code: 'AGR', city: 'Agra', address: 'Agra Branch Office' },
  { name: 'Mathura', code: 'MTH', city: 'Mathura', address: 'Mathura Branch Office' },
  { name: 'Hathras', code: 'HTH', city: 'Hathras', address: 'Hathras Branch Office' },
  { name: 'Kosi', code: 'KOS', city: 'Kosi', address: 'Kosi Branch Office' }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB...');

    for (const bData of branchesToSeed) {
      let branch = await Branch.findOne({ code: bData.code });
      if (!branch) {
        branch = await Branch.create(bData);
        console.log(`Created Branch: ${branch.name}`);
      } else {
        console.log(`Branch ${branch.name} already exists.`);
      }

      // Create a BSM for this branch if doesn't exist
      const bsmEmail = `bsm.${bData.code.toLowerCase()}@swayamfin.com`;
      let bsm = await User.findOne({ email: bsmEmail });
      if (!bsm) {
        bsm = await User.create({
          full_name: `${bData.name} Sales Manager`,
          email: bsmEmail,
          phone: '0000000000',
          password_hash: 'bsm123', // Will be hashed by pre-save
          role: 'bsm',
          branch: bData.name,
          employee_code: `BSM-${bData.code}`
        });
        console.log(`Created BSM: ${bsm.full_name} (${bsm.email})`);
      } else {
        console.log(`BSM for ${bData.name} already exists.`);
      }
    }

    console.log('Seeding completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
}

seed();
