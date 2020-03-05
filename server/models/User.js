const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for users
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    min: 8,
    max: 32,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  profilePhoto: {
    type: String
  },
  friends: {
    type: Number
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'review'
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

// Static function to find all reviews for a user
UserSchema.statics.findReviews = (userId) => {
  const User = mongoose.model('user');

  return User.findById(userId)
    .populate('reviews')
    .then(user => user.reviews);
}

module.exports = mongoose.model('user', UserSchema);