const mongoose = require('mongoose');
const axios = require('axios');
const Restaurant = mongoose.model('restaurant');

const MAPS_API_KEY = require("../../config/keys").MAPS_API_KEY;


const search = async (searchTerm, searchLoc) => {
  // strategy:
  // first return all restaurants by location
  // then filter by keyword

  // get searchLoc coord bounds
  let response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchLoc}&key=${MAPS_API_KEY}`);
  let { results } = response.data;
  
  // we got results
  if (results.length) {
    // attempt a search on the coords
    let { bounds } = results[0].geometry;
    let minLat = bounds.southwest.lat;
    let maxLat = bounds.northeast.lat;
    let minLng = bounds.southwest.lng;
    let maxLng = bounds.northeast.lng;
  
    // get all restaurants within some bounds
    return Restaurant.find({
      'coordinates.latitude': { $gte: minLat, $lte: maxLat },
      'coordinates.longitude': { $gte: minLng, $lte: maxLng },
    })
    // then perform the text search on within-bounds restaurants
    .find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
      ]
    });
  } else {
    // no results
    return [];
  }
}

module.exports = { search }