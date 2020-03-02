import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import ReviewCreate from './components/reviews/ReviewCreate';
import ReviewDetail from './components/reviews/ReviewDetail';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ReviewCreate/>
        <Switch>
            <Route exact path="reviews/create" component={ReviewCreate} />
            <Route exact path="reviews/details/:id" component={ReviewDetail} />
        </Switch>
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
