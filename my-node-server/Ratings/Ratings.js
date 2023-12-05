const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: String,
  ratings: String,
  reviews: String,
});

// Provide the schema to mongoose.model
const rat = mongoose.model('rat', userSchema);

exports.ratingsManager = async (id, ratings, reviews) => {
  try {
    // Check if a user with the same id already exists
    const existingUser = await rat.findOne({ id });

    if (existingUser) {
      // If the user exists, update the ratings and reviews
      existingUser.ratings = ratings;
      existingUser.reviews = reviews;
      await existingUser.save();
      return { message: 'Updated successfully.' };
    } else {
      // If the user doesn't exist, create a new entry
      const newUser = new rat({ id, ratings, reviews });
      await newUser.save();
      return { message: 'Saved successfully.' };
    }
  } catch (error) {
    console.error('Unhandled error:', error);
    // You should handle errors more appropriately, e.g., log them or send an appropriate response
    throw new Error('Internal server error.');
  }
};
