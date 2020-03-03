import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RestaurantDetail from './restaurants/RestaurantDetail';
import Home from './home/Home';

const App = () => {
  return (
    <div className="app-wrapper">
      <Switch>
        <Route exact path='/restaurants/:id' component={RestaurantDetail} />
        <Route exact path='/' component={Home} />
      </Switch>
    </div>
  );
}

export default App;
