import React from 'react';
import '../../assets/stylesheets/Home.css';

import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import RestaurantIndex from '../restaurants/RestaurantIndex';
import SessionButton from '../session/SessionButton';
import SearchForm from '../search/SearchForm';
import '../../assets/stylesheets/Home.css';
import '../../assets/stylesheets/SearchForm.css';

import Queries from '../../graphql/queries';
const { CURRENT_USER } = Queries;

const LinkToLocalCategory = ({ searchTerm, children }) => {
  let find_desc = encodeURI(searchTerm);
  return (
    <Query query={CURRENT_USER}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>{error.message}</p>
        let find_loc = data.currentUserZipCode;
        return (
          <Link to={`/search?find_desc=${find_desc}&find_loc=${find_loc}`}>{children}</Link>
        );
      }}
    </Query>
  );
}

const LocalizedMorselTitle = () => (
  <Query query={CURRENT_USER}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>{error.message}</p>
      return (
        <h1>Morsel {data.currentUserZipCode}</h1>
      )
    }}
  </Query>
);

const Home = () => {
  return (
    <div className="home-container">
      <div className="banner-container">
        <div className="home-nav-bar-container">
          <div className="write-review-wrapper">
            <p>Write a Review</p> 
          </div>

          <div className="home-login-logout-wrapper">
            <SessionButton /> 
          </div>
        </div>

        <img src="/images/homepage/banner.png" alt="Homepage banner" /> 

        <div className="overlay-wrapper"></div>

        <div className="logo-wrapper">
          <svg>
            <text x="50%" y="50%">morsel</text>
          </svg>
          <img src="/images/homepage/logo.png" alt="Logo" />
        </div>
        
        <SearchForm />
      </div>


      <div className="best-restaurants-wrapper">
        <div className="header-wrapper">
          <h1>Find the Best Restaurants in Town</h1>
        </div>

        <div className="restaurants-wrapper">
          <LinkToLocalCategory searchTerm="Surf 'N' Turf">
            <div className="surf-and-turf-wrapper">
              <div className="thumbnail-wrapper"></div> 
              <p>Surf 'N' Turf</p>
            </div>
          </LinkToLocalCategory>

          <LinkToLocalCategory searchTerm="Holiday Desserts">
            <div className="holiday-desserts-wrapper">
              <div className="thumbnail-wrapper"></div>
              <p>Holiday Desserts</p>
            </div>
          </LinkToLocalCategory>

          <LinkToLocalCategory searchTerm="Chinese">
            <div className="chinese-wrapper">
              <div className="thumbnail-wrapper"></div>
              <p>Chinese</p>
            </div>
          </LinkToLocalCategory>

          <LinkToLocalCategory searchTerm="Burgers">
            <div className="burgers-wrapper">
              <div className="thumbnail-wrapper"></div>
              <p>Burgers</p>
            </div>
          </LinkToLocalCategory>
        </div>
      </div>


      <div className="main-content-wrapper">
        <div className="header-wrapper">
          <LocalizedMorselTitle />

          <div className="other-cities-wrapper">
            <div className="cities-wrapper">
              <p><Link to="/search?find_desc=&find_loc=South%20Lake%20Tahoe">South Lake Tahoe</Link></p>
              <p><Link to="/search?find_desc=&find_loc=Honolulu">Honolulu</Link></p> 
              <p><Link to="/search?find_desc=&find_loc=Los%20Angeles">Los Angeles</Link></p>
              <p><Link to="/search?find_desc=&find_loc=San%20Francisco">San Francisco</Link></p>
              <p><Link to="/search?find_desc=&find_loc=Tokyo">Tokyo</Link></p>
              <p><Link to="/search?find_desc=&find_loc=Portland">Portland</Link></p>
              <p><Link><i className="more-cities-icon"></i>More Cities</Link></p>
            </div> 

            <div className="underline-wrapper"></div>
          </div>

          <div className="new-restaurants-wrapper">
            <h2>Hot & New Businesses</h2>

            <RestaurantIndex />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;