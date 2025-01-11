import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import Astrologer from './models/Astrologer';
import astrologerData from './data-set/astrologer.json';
import userData from './data-set/user.json';
import connectDatabase from './config/dbConnect';




dotenv.config();


// Seeder function
const seeder = async () => {
  try {
    // Connect to MongoDB
    await connectDatabase();
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Astrologer.deleteMany({});
    console.log('Cleared existing data');

    // Insert seed data
    await Astrologer.insertMany(astrologerData);
    console.log('Inserted seed data');
    await User.insertMany(userData);
    console.log('Inserted seed data user');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Database seeded successfully and disconnected');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1); // Exit with failure code
  }
};

export default seeder

// Run the seeder function

