require('dotenv').config();
const mongoose = require('mongoose');
const Branch = require('./models/Branch');
const User = require('./models/User');

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/swayamfin';
    await mongoose.connect(mongoUri);
    console.log('Connected to DB for Seeding...');

    // Clear existing
    await Branch.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing Branches and Users.');

    // Insert Branches
    const branches = await Branch.insertMany([
      { name: 'Swayamfin Delhi HQ', city: 'Delhi' },
      { name: 'Swayamfin Nariman Point', city: 'Mumbai' },
      { name: 'Swayamfin Agra Post', city: 'Agra' }
    ]);
    
    // Insert 6 Agents (2 per branch)
    await User.insertMany([
      { name: 'Amit Sharma', email: 'amit@swayamfin.com', role: 'Agent', branch: branches[0]._id, lastAssigned: Date.now() },
      { name: 'Priya Gupta', email: 'priya@swayamfin.com', role: 'Agent', branch: branches[0]._id, lastAssigned: Date.now() - 1000 },
      { name: 'Rahul Desai', email: 'rahul@swayamfin.com', role: 'Agent', branch: branches[1]._id, lastAssigned: Date.now() },
      { name: 'Neha Khanna', email: 'neha@swayamfin.com', role: 'Agent', branch: branches[1]._id, lastAssigned: Date.now() - 1000 },
      { name: 'Vikram Singh', email: 'vikram@swayamfin.com', role: 'Agent', branch: branches[2]._id, lastAssigned: Date.now() },
      { name: 'Anjali Verma', email: 'anjali@swayamfin.com', role: 'Agent', branch: branches[2]._id, lastAssigned: Date.now() - 1000 }
    ]);

    console.log('Successfully seeded 3 Branches and 6 Agents!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
