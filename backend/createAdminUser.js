const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function createAdminUser() {
  try {
    const adminPassword = 'admin123'; // Change this to a secure password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const adminUser = new User({
      username: 'admin',
      password: hashedPassword,
      role: 'admin',
    });

    await adminUser.save();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    mongoose.disconnect();
  }
}

createAdminUser();