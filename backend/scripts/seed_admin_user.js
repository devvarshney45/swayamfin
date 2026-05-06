require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');

const EMAIL = 'aryandsot@gmail.com';
const PASSWORD = 'Admin#123';

async function run() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI is not set');
    process.exit(1);
  }
  await mongoose.connect(uri);

  let user = await User.findOne({ email: EMAIL });
  if (!user) {
    await User.create({
      full_name: 'Aryan Admin',
      email: EMAIL,
      phone: '9999999999',
      password_hash: PASSWORD,
      role: 'admin',
      employee_code: 'ADM-ARYAN',
      is_active: true,
    });
    console.log('Created admin:', EMAIL);
  } else {
    user.full_name = user.full_name || 'Aryan Admin';
    user.role = 'admin';
    user.is_active = true;
    user.branch_id = null;
    user.password_hash = PASSWORD;
    if (!user.employee_code) user.employee_code = 'ADM-ARYAN';
    await user.save();
    console.log('Updated existing user to admin:', EMAIL);
  }

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
