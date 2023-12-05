const mongoose = require('mongoose');
const rat = mongoose.model('rat');

exports.checking = async (id) => {
  try {
    // Check if a user with the same id already exists
    const existingUser = await rat.findOne({ id });

    if (existingUser) {
      // If the user exists, update the ratings and reviews
      const ratings= existingUser.ratings;
      const reviews= existingUser.reviews;
      return { ratings, reviews};
    } else {
      return { ratings:'', reviews:''};
    }
  } catch (error) {
    console.error('Unhandled error:', error);
    // You should handle errors more appropriately, e.g., log them or send an appropriate response
    throw new Error('Internal server error.');
  }
};
