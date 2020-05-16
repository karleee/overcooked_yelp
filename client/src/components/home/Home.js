import React from 'react';

import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import RestaurantIndex from '../restaurants/RestaurantIndex';
import SessionButton from '../session/SessionButton';
import SearchForm from '../search/SearchForm';
import Footer from '../footer/Footer';

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
        let find_loc;
  
        if (data.currentUserId) {
          find_loc = data.currentUserZipCode;
        } else {
          find_loc = 'San Francisco, CA'; 
        }

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
        <h1>Morsel</h1>
      )
    }}
  </Query>
);

const Home = props => (
  <div className="home-container">
    <div className="home banner-container">
      <div className="home nav-bar-container">
        <div className="write-review-wrapper"> 
          <Link to="/writeareview">Write a Review</Link> 
        </div> 

        <div className="home login-logout-wrapper">
          <SessionButton /> 
        </div>
      </div>

      <img src="/images/homepage/banner.png" alt="Homepage banner" /> 

      <div className="home banner-overlay-wrapper"></div>

      <div className="logo-wrapper">
        <svg>
          <text x="50%" y="50%">morsel</text>
        </svg>
        <img src="/images/homepage/logo.png" alt="Logo" />
      </div>
      
      <SearchForm mode='main'/>
    </div>


    <div className="home best-restaurants-wrapper">
      <h1>Find the Best Restaurants in Town</h1>

      <div className="home categories-wrapper">
        <LinkToLocalCategory searchTerm="Steakhouses">
          <div className="home best-restaurants-thumb-wrapper">
            <img src="/images/homepage/categories/categories_steakhouses.png" alt="Steakhouses" />
          </div>  

          <p>Steakhouses</p>
        </LinkToLocalCategory>

        <LinkToLocalCategory searchTerm="Holiday Desserts">
          <div className="home best-restaurants-thumb-wrapper">
            <img src="/images/homepage/categories/categories_holidayDesserts.png" alt="Holiday desserts" />
          </div>

          <p>Holiday Desserts</p>
        </LinkToLocalCategory>

        <LinkToLocalCategory searchTerm="Chinese">
          <div className="home best-restaurants-thumb-wrapper">
            <img src="/images/homepage/categories/categories_chinese.png" alt="Chinese" />
          </div>

          <p>Chinese</p>
        </LinkToLocalCategory>

        <LinkToLocalCategory searchTerm="Burgers">
          <div className="home best-restaurants-thumb-wrapper">
            <img src="/images/homepage/categories/categories_burgers.png" alt="Burgers" /> 
          </div>

          <p>Burgers</p>
        </LinkToLocalCategory>
      </div>
    </div>

    <div className="home hot-new-businesses-wrapper">
      <LocalizedMorselTitle />
      
      <div className="home other-cities-wrapper">
        <Link to="/search?find_desc=&find_loc=South%20Lake%20Tahoe">South Lake Tahoe</Link>
        <Link to="/search?find_desc=&find_loc=Honolulu">Honolulu</Link> 
        <Link to="/search?find_desc=&find_loc=Los%20Angeles">Los Angeles</Link>
        <Link to="/search?find_desc=&find_loc=San%20Francisco">San Francisco</Link>
        <Link to="/search?find_desc=&find_loc=Portland">Portland</Link>
        <Link to="/search?find_desc=&find_loc=Orlando">Orlando</Link>
 
        <div className="home underline-wrapper"></div>
      </div>

      <h2>Hot & New Businesses</h2>

      <RestaurantIndex />
    </div>

    <Footer />
  </div>
);

export default Home;