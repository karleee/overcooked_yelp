const mongoose = require('mongoose');
const Restaurant = mongoose.model('restaurant');

const search = searchTerm => {
  if (searchTerm) {
    return Restaurant.find(
      {
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } },
        ]
      }
    );
  } else {
    return Restaurant.find({});
  }
}

module.exports = { search }