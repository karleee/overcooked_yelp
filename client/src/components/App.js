import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute } from '../util/route_util';
import ExampleGreeting from '../components/session/ExampleGreeting';
import SessionButton from '../components/session/SessionButton';
import LoginPage from '../components/session/LoginForm';
import RegisterPage from '../components/session/RegisterForm';
import RestaurantDetail from './restaurants/RestaurantDetail';
import Home from './home/Home';
import ReviewCreate from './reviews/ReviewCreate';
import ReviewDetail from './reviews/ReviewDetail';

const App = () => {
  return (
    <div className="app-wrapper">
      <header>
        <h1>Temporary Homepage!</h1>
        <ExampleGreeting />
        <SessionButton />
      </header>

      <main>
        <Switch>
          <AuthRoute path="/login" component={LoginPage} routeType="auth" />
          <AuthRoute path="/signup" component={RegisterPage} routeType="auth" />
          <Route exact path='/restaurants/:id' component={RestaurantDetail} />
          <Route exact path='/' component={Home} />
          <AuthRoute exact path='/restaurants/:id/reviews/create' component={ReviewCreate} routeType="protected" />
          <Route exact path='/reviews/details/:id' component={ReviewDetail} />
        </Switch>
      </main>
      {/* <footer>
        <p>Footer</p>
      </footer> */}
    </div>
  );
}

export default App;
