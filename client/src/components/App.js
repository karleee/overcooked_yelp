import React from 'react';
import '../stylesheets/reset.css';
import '../stylesheets/App.css';

function App() {
  return (
    <div className="app-wrapper">
      <div className="banner-wrapper"></div>

      <h1>Overcooked</h1>

      <div className="search-input-wrapper">
        <div className="find-input-wrapper">
          <label>
            Find
            <input
              type="text"
              placeholder="burgers, pancakes, burritos, salads..."
            />
          </label>
        </div>

        <div className="separator-wrapper"></div>

        <div className="near-input-wrapper">
          <label>
            Near
            <input
              type="text"
              placeholder="Put user's current location here"
            />
          </label>
        </div>

        <div className="search-button-wrapper"></div>
      </div>
    </div>
  );
}

export default App;
