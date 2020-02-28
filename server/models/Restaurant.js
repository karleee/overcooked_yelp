const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for restaurants
const RestaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  phoneNum: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    streetAddress: { 
      type: String,
      required: true,
      unqiue: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: Number,
      required: true
    }
  },
  coordinates: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  hours: {
    monday: {
      open: {
        type: String,
        required: true
      },
      close: {
        type: String,
        required: true
      }
    },
    tuesday: {
      open: {
        type: String,
        required: true
      },
      close: {
        type: String,
        required: true
      }
    },
    wednesday: {
      open: {
        type: String,
        required: true
      },
      close: {
        type: String,
        required: true
      }
    },
    thursday: {
      open: {
        type: String,
        required: true
      },
      close: {
        type: String,
        required: true
      }
    },
    friday: {
      open: {
        type: String,
        required: true
      },
      close: {
        type: String,
        required: true
      }
    },
    saturday: {
      open: {
        type: String,
        required: true
      },
      close: {
        type: String,
        required: true
      }
    },
    sunday: {
      open: {
        type: String,
        required: true
      },
      close: {
        type: String,
        required: true
      }
    }
  },
  amenities: {
    healthScore: {
      type: Number,
      required: true
    },
    reservations: {
      type: Boolean,
      required: true
    },
    happyHourSpecials: {
      type: Boolean,
      required: true
    },
    delivery: {
      type: Boolean,
      required: true
    },
    vegetarian: {
      type: Boolean,
      required: true
    },
    takeOut: {
      type: Boolean,
      required: true
    }
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'review'
    }
  ]
});

// Static function to find all reviews for a restaurant
CategorySchema.statics.findReviews = (restaurantId) => {
  const Restaurant = mongoose.model('restaurant');

  return Restaurant.findById(restaurantId)
    .populate('reviews')
    .then(restaurant => restaurant.reviews);
}

module.exports = mongoose.model('restaurant', RestaurantSchema);