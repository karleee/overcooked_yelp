const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        type: String,
        required: true
      },
      tuesday: {
        type: String,
        required: true
      },
      wednesday: {
        type: String,
        required: true
      },
      thursday: {
        type: String,
        required: true
      },
      friday: {
        type: String,
        required: true
      },
      saturday: {
        type: String,
        required: true
      },
      sunday: {
        type: String,
        required: true
      }
    }
  }
});

module.exports = mongoose.model('restaurant', RestaurantSchema);