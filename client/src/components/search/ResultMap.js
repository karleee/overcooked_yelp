import React from 'react';

import Map from '../map/Map';

const ResultMap = ({ restaurants, find_loc }) => (
  <div className="search-result-map-container">
    {/* <div className="search-result-map-image-wrapper">  */}
      <Map
        restaurants={restaurants} 
        find_loc={find_loc}
        mode="search"
      />
    {/* </div> */}
  </div>
);

export default ResultMap;