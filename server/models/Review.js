const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for reviews
const ReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'restaurant'
  },
  rating: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    default: (Date.now).toString()
  },
  body: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('review', ReviewSchema);