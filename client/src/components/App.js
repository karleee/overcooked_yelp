import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute } from '../util/route_util';
import LoginPage from '../components/session/LoginForm';
import RegisterPage from '../components/session/RegisterForm';
import RestaurantDetail from './restaurants/RestaurantDetail';
import Home from './home/Home';

const App = () => {
  return (
    <div className="app-wrapper">
      <Switch>
        <AuthRoute path='/login' component={LoginPage} routeType='auth' />
        <AuthRoute path='/signup' component={RegisterPage} routeType='auth' />
        <Route exact path='/restaurants/:id' component={RestaurantDetail} />
        <Route exact path='/' component={Home} />
      </Switch>
    </div>
  );
}

export default App;
