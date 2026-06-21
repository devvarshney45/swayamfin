const mongoose = require('mongoose');
const Branch = require('./models/Branch');
require('dotenv').config();

const check = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const branches = await Branch.find();
    console.log('Branches in DB:');
    branches.forEach(b => console.log(`- ${b.name} (${b.city}) ID: ${b._id}`));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

check();
