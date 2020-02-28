const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    required: true,
    min: 8,
    max: 32
  },
  zipCode: {
    type: Number,
    required: true
  },
  birthday: {
    month: {
      type: String,
      required: true
    },
    day: {
      type: Number,
      required: true
    },
    yr: {
      type: Number,
      required: true
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('user', UserSchema);