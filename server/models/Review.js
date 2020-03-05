const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for reviews
const ReviewSchema = new Schema({
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
  rating: {
    type: Number,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  photos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'photo'
    }
  ],
  date: {
    type: String,
    default: true
  }
});

// Static function to find all photos for a review
ReviewSchema.statics.findPhotos = (reviewId) => {
  const Review = mongoose.model('review');

  return Review.findById(reviewId)
    .populate('photos')
    .then(review => review.photos);
}

module.exports = mongoose.model('review', ReviewSchema);