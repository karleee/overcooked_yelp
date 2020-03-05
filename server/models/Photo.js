const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for restaurants
const PhotoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'restaurant',
    required: true
  },
  review: {
    type: Schema.Types.ObjectId,
    ref: 'review',
    required: true
  },
  url: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  categories: [
    {
      type: String,
      required: true
    }
  ]
});

module.exports = mongoose.model('photo', PhotoSchema);