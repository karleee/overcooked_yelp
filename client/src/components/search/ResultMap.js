import React from 'react';

import RestaurantMap from '../map/Map';

const ResultMap = ({ restaurants, find_loc }) => (
    <div className="search-result-map-wrapper">
        <div className="search-result-map-image-wrapper">
            <RestaurantMap
                restaurants={restaurants}
                find_loc={find_loc}
                mode="search"
            />
        </div>
    </div>
);

export default ResultMap;