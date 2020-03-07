import axios from "axios";
const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY;

// prefer json format for maps api
const MAPS_BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json";

// set default location if not logged in
export const DEFAULT_LOCATION = "Orlando, FL";

// fetch results
const _getCoordsFromAddress = address => (
  axios.get(`${MAPS_BASE_URL}?address=${address}&key=${MAPS_API_KEY}`)
  .then(results => results)
);

export const setOptionsFromLocation = async find_loc => {
  let res = await _getCoordsFromAddress(find_loc);

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

export const getCityFromZip = async zipCode => {
    // get results from api call
    let res = await _getCoordsFromAddress(zipCode);
    let { address_components } = res.data.results[0];
    // pull out city and state from the results
    let city, state;
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
    } else {
      return zipCode;
    }
  };