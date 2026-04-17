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

    // Insert Branches (matching city enum: Delhi, Noida, Agra, Gurgaon)
    const branches = await Branch.insertMany([
      { name: 'Swayamfin Delhi HQ', city: 'Delhi' },
      { name: 'Swayamfin Noida Branch', city: 'Noida' },
      { name: 'Swayamfin Agra Post', city: 'Agra' },
      { name: 'Swayamfin Gurgaon Branch', city: 'Gurgaon' }
    ]);
    
    // Create Admin & 8 Agents (2 per branch)
    const usersData = [
      { name: 'Swayamfin Admin', email: 'admin@swayamfin.com', password: 'Admin@123', role: 'Admin' },
      // Delhi agents
      { name: 'Amit Sharma', email: 'amit@swayamfin.com', password: 'Swayamfin@123', role: 'Agent', branch: branches[0]._id, cityName: 'Delhi', lastAssigned: Date.now() },
      { name: 'Priya Gupta', email: 'priya@swayamfin.com', password: 'Swayamfin@123', role: 'Agent', branch: branches[0]._id, cityName: 'Delhi', lastAssigned: Date.now() - 1000 },
      // Noida agents
      { name: 'Rahul Desai', email: 'rahul@swayamfin.com', password: 'Swayamfin@123', role: 'Agent', branch: branches[1]._id, cityName: 'Noida', lastAssigned: Date.now() },
      { name: 'Neha Khanna', email: 'neha@swayamfin.com', password: 'Swayamfin@123', role: 'Agent', branch: branches[1]._id, cityName: 'Noida', lastAssigned: Date.now() - 1000 },
      // Agra agents
      { name: 'Vikram Singh', email: 'vikram@swayamfin.com', password: 'Swayamfin@123', role: 'Agent', branch: branches[2]._id, cityName: 'Agra', lastAssigned: Date.now() },
      { name: 'Anjali Verma', email: 'anjali@swayamfin.com', password: 'Swayamfin@123', role: 'Agent', branch: branches[2]._id, cityName: 'Agra', lastAssigned: Date.now() - 1000 },
      // Gurgaon agents
      { name: 'Ravi Kapoor', email: 'ravi@swayamfin.com', password: 'Swayamfin@123', role: 'Agent', branch: branches[3]._id, cityName: 'Gurgaon', lastAssigned: Date.now() },
      { name: 'Sonia Mehra', email: 'sonia@swayamfin.com', password: 'Swayamfin@123', role: 'Agent', branch: branches[3]._id, cityName: 'Gurgaon', lastAssigned: Date.now() - 1000 }
    ];

    for (const userData of usersData) {
      await User.create(userData);
    }

    console.log('Successfully seeded 4 Branches and 8 Agents!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
