import axios from "axios";
const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY;

export const getCityFromZip = async zipCode => {
    // get results from api call
    let res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${MAPS_API_KEY}`);
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