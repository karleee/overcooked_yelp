import React from 'react';

const RestaurantInfoContent = ({ restaurant }) => (
  <div className="restaurant-info-content">
    <img src="https://via.placeholder.com/150x75" />
    <h3>{restaurant.name}</h3>
    <p>need avg reviews here</p>
    <p>{restaurant.category}</p>
  </div>
);

export default RestaurantInfoContent;