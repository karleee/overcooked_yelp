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
        // let find_loc = data.currentUserZipCode;
        // temp fix for when user is not logged in
        let find_loc;
  
        if (data.currentUserId) {
          find_loc = data.currentUserZipCode;
        } else {
          find_loc = 'Orlando, FL';
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
            <Link to="/writeareview">Write a Review</Link> 
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
        
        <SearchForm mode='main'/>
      </div>


      <div className="best-restaurants-wrapper">
        <div className="header-wrapper">
          <h1>Find the Best Restaurants in Town</h1>
        </div>

        <div className="categories-wrapper">
          <LinkToLocalCategory searchTerm="Surf 'N' Turf">
            <div className="thumbnail-wrapper">
              <img src="/images/homepage/categories/categories_surfNTurf.png" alt="Surf N Turf" />
            </div>  

            <p>Surf 'N' Turf</p>
          </LinkToLocalCategory>

          <LinkToLocalCategory searchTerm="Holiday Desserts">
            <div className="thumbnail-wrapper">
              <img src="/images/homepage/categories/categories_holidayDesserts.png" alt="Holiday desserts" />
            </div>

            <p>Holiday Desserts</p>
          </LinkToLocalCategory>

          <LinkToLocalCategory searchTerm="Chinese">
            <div className="thumbnail-wrapper">
              <img src="/images/homepage/categories/categories_chinese.png" alt="Chinese" />
            </div>

            <p>Chinese</p>
          </LinkToLocalCategory>

          <LinkToLocalCategory searchTerm="Burgers">
            <div className="thumbnail-wrapper">
              <img src="/images/homepage/categories/categories_burgers.png" alt="Burgers" /> 
            </div>

            <p>Burgers</p>
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
              <p><Link to="/search?find_desc=&find_loc=Napa">Napa</Link></p>
              <p><Link to="/search?find_desc=&find_loc=Portland">Portland</Link></p>
              {/* <p><Link><i className="more-cities-icon"></i>More Cities</Link></p> */}
            </div> 

            <div className="underline-wrapper"></div>
          </div>

          <div className="new-restaurants-wrapper">
            <h2>Hot & New Businesses</h2>

            <RestaurantIndex />
          </div>
        </div>
      </div>

      <div className="footer-container">

      </div>
    </div>
  );
}

export default Home;