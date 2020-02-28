const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for reviews
const ReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  rating: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  body: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('review', ReviewSchema);