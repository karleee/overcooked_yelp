import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './home/Home';

const App = () => {
  return (
    <div className="app-wrapper">
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </div>
  );
}

export default App;
