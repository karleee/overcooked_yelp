import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute } from '../util/route_util';
import LoginPage from '../components/session/LoginForm';
import RegisterPage from '../components/session/RegisterForm';
import GalleryIndex from './gallery/GalleryIndex';
import RestaurantDetail from './restaurants/RestaurantDetail';
import Home from './home/Home';

<<<<<<< HEAD
const App = () => {
  return (
    <div className="app-wrapper">
      <Switch>
        <AuthRoute exact path='/login' component={LoginPage} routeType='auth' />
        <AuthRoute exact path='/signup' component={RegisterPage} routeType='auth' />
        <Route exact path='/restaurants/:id/photos' component={GalleryIndex} />
        <Route exact path='/restaurants/:id' component={RestaurantDetail} />
        <Route exact path='/' component={Home} />
      </Switch>
    </div>
  );
=======
class App extends React.Component {
  constructor(props){
    super(props);
  }
  
  addScriptToPage(scriptUrl) {
    // render a script tag for scriptUrl in the head of the HTML page
    const script = document.createElement("script");
    script.src = scriptUrl;
    document.head.appendChild(script);
  }

  componentDidMount() {
    // CreateReactApp requires the REACT_APP_ prefix for env vars
    let MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY;
    // place the google maps api as a script tag in the head
    // this script places a google object on window.google
    let mapsApiUrl = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}`;
    this.addScriptToPage(mapsApiUrl);
  }

  render() {
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
            <Route exact path="/restaurants/:id" component={RestaurantDetail} />
            <Route exact path="/" component={Home} />
          </Switch>
        </main>
        {/* <footer>
            <p>Footer</p>
          </footer> */}
      </div>
    );
  }
>>>>>>> master
}

export default App;
