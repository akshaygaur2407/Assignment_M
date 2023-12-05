const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = mongoose.model('User'); 


exports.loginUser = async (email) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { message: 'User found, login successful' };
    } else {
      return { message: 'User not found, check your email and password and try again' };
    }
  } catch (error) {
    console.error('Error checking user:', error);
    return { error: 'Internal server error.' };
  }
};
