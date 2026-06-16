const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

async function checkUser() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/swayamfin');
  const user = await User.findOne({ email: 'aryandsot@gmail.com' });
  console.log('User found:', user ? 'Yes' : 'No');
  if (user) {
    console.log('Role:', user.role);
    console.log('Is Active:', user.is_active);
    console.log('Password Hash present:', !!user.password_hash);
  }
  await mongoose.disconnect();
}

checkUser();
