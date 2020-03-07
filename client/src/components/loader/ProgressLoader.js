import React from 'react';
import '../../assets/stylesheets/Loader.css';

const ProgressLoader = props => {
  const loadingPhrases = [
    'Preheating the oven...',
    'Pouring the sugar...',
    'Pouring the milk...',
    'Mixing the eggs...'
  ];

  const randomPhrase = loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)];

  return (
    <div className="pizza-loader-container">
      <div className="pizza-loader-wrapper">
        <img src="/images/loader/pizza_loader.gif" alt="Loading spinner" />
      </div>

      <div className="pizza-loader-text">{props.type === 'loading' ? <p>{randomPhrase}</p> : <p>Oops, something went wrong! Please try again later.</p>}</div>
    </div>
  );
};

export default ProgressLoader;