import axios from "axios";
const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY;

// prefer json format for maps api
const MAPS_BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json";

// set default location if not logged in
export const DEFAULT_LOCATION = 'San Francisco, CA';

// fetch results
const _getCoordsFromAddress = address => (
  axios.get(`${MAPS_BASE_URL}?address=${address}&key=${MAPS_API_KEY}`)
  .then(results => results)
);

// this function is used to set the map defaults on initialization
export const setOptionsFromLocation = async find_loc => {
  let res = await _getCoordsFromAddress(find_loc);

  // if no results, default to CA (benchbnb default)
  if (!res.data.results.length) {
    return {
      center: {
        lat: 37.773972,
        lng: -122.431297
      }, // San Francisco coords
      zoom: 13
    };
  } else {
    // get coords + bounds as geometry
    let { geometry } = res.data.results[0]
    return {
      center: {
        lat: geometry.location.lat,
        lng: geometry.location.lng,
      },
      zoom: 6
    };
  }
}

// return a string of the city based on a submitted zipCode
export const getCityFromZip = async zipCode => {
  let city, state;

  // get results from api call
  let res = await _getCoordsFromAddress(zipCode);

  // a city was found for the term
  if (res.data.results.length) {
    let { address_components } = res.data.results[0];
    // pull out city and state from the results
    address_components.forEach(component => {
      component.types.forEach(type => {
        if (type === 'locality') {
          city = component.long_name;
        }
        if (type === 'administrative_area_level_1') {
          state = component.short_name;
        }
      })
    })

    // return the result
    if (city && state) {
      return `${city}, ${state}`;
    }
  } else {
    // if anything fails, just go to zipcode
    return zipCode;
  }
};