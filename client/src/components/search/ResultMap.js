import React from 'react';

import Map from '../map/Map';

const ResultMap = ({ restaurants, find_loc }) => (
  <div className="search-result-map-container">
    <Map
      restaurants={restaurants} 
      find_loc={find_loc}
      mode="search"
    />
  </div>
);

export default ResultMap;