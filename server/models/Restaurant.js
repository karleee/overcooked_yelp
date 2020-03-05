const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for restaurants
const RestaurantSchema = new Schema({  
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true 
  },
  category: {
    type: String,
    required: true
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
      type: String
    },
    takesReservations: {
      type: Boolean
    },
    happyHourSpecials: {
      type: Boolean
    },
    delivery: {
      type: Boolean
    },
    vegetarianOptions: {
      type: Boolean
    },
    takeOut: {
      type: Boolean
    },
    acceptsCreditCards: {
      type: Boolean
    },
    wifi: {
      type: Boolean
    }
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'review'
    }
  ],
  photos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'photo'
    }
  ]
});

// Static function to find all reviews for a restaurant
RestaurantSchema.statics.findReviews = (restaurantId) => {
  const Restaurant = mongoose.model('restaurant');

  return Restaurant.findById(restaurantId)
    .populate('reviews')
    .then(restaurant => restaurant.reviews);
}

// Static function to find all photos for a restaurant
RestaurantSchema.statics.findPhotos = (restaurantId) => {
  const Restaurant = mongoose.model('restaurant');

  return Restaurant.findById(restaurantId)
    .populate('photos')
    .then(restaurant => restaurant.photos);
}

module.exports = mongoose.model('restaurant', RestaurantSchema);