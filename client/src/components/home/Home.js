import React, { Component } from 'react';
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

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dev1ShowContact: false,
      dev2ShowContact: false,
      dev3ShowContact: false,
      dev4ShowContact: false
    }
    this.showContactInfo = this.showContactInfo.bind(this);
    this.resetContactInfo = this.resetContactInfo.bind(this);
  }

  showContactInfo(devNum) {
    if (devNum === 1) {
      this.setState({dev1ShowContact: !this.state.dev1ShowContact});
      this.setState({dev2ShowContact: false});
      this.setState({ dev3ShowContact: false });
      this.setState({ dev4ShowContact: false });
    } else if (devNum === 2) {
      this.setState({ dev2ShowContact: !this.state.dev2ShowContact });
      this.setState({ dev1ShowContact: false });
      this.setState({ dev3ShowContact: false });
      this.setState({ dev4ShowContact: false });
    } else if (devNum === 3) {
      this.setState({ dev3ShowContact: !this.state.dev3ShowContact });
      this.setState({ dev1ShowContact: false });
      this.setState({ dev2ShowContact: false });
      this.setState({ dev4ShowContact: false });
    } else {
      this.setState({ dev4ShowContact: !this.state.dev4ShowContact });
      this.setState({ dev1ShowContact: false });
      this.setState({ dev2ShowContact: false });
      this.setState({ dev3ShowContact: false });
    }
  }

  resetContactInfo() {
    if (this.state.dev1ShowContact) this.setState({ dev1ShowContact: false });
    if (this.state.dev2ShowContact) this.setState({ dev2ShowContact: false });
    if (this.state.dev3ShowContact) this.setState({ dev3ShowContact: false });
    if (this.state.dev4ShowContact) this.setState({ dev4ShowContact: false });
  }

  render() {
    return (
      <div className="home-container" onClick={() => this.resetContactInfo()}>
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
                <p><Link to="/search?find_desc=&find_loc=Orlando">Orlando</Link></p>
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
          <div className="footer-columns-wrapper">
            <div className="about-wrapper">
              <h3>About</h3>
              <ul>
                <li><a href="https://github.com/karleee/morsel">Github</a></li>
              </ul>
            </div>

            <div className="discover-wrapper">
              <h3>Discover</h3>
              <ul>
                <li><a href="http://sleepify-dev.herokuapp.com/">Sleepify</a></li>
                <li><a href="https://nookbnb.herokuapp.com/#/">Nookbnb</a></li>
              </ul>
            </div>

            <div className="developers-wrapper">
              <h3>Developers</h3>
              <ul>
                <li onClick={() => this.showContactInfo(1)}>
                  <div className="developer-name-wrapper">
                    <p>John Enriquez</p>
                    <div className="developers-triangle-wrapper"></div>
                  </div>

                  {this.state.dev1ShowContact ? <div className="developers-dropdown-wrapper">
                    <ul>
                      <li>Github</li>
                      <li>LinkedIn</li>
                      <li>Angel List</li>
                      <li>Portfolio</li>
                      <li>Email</li>
                    </ul>
                  </div> : ''}
                </li>

                <li onClick={() => this.showContactInfo(2)}>
                  <div className="developer-name-wrapper">
                    <p>Don Sondapperumaarachchi</p>
                    <div className="developers-triangle-wrapper"></div>
                  </div>

                  {this.state.dev2ShowContact ? <div className="developers-dropdown-wrapper">
                    <ul>
                      <li>Github</li>
                      <li>LinkedIn</li>
                      <li>Angel List</li>
                      <li>Portfolio</li>
                      <li>Email</li>
                    </ul>
                  </div> : ''}
                </li>

                <li onClick={() => this.showContactInfo(3)}>
                  <div className="developer-name-wrapper">
                    <p>Josh Graham</p>
                    <div className="developers-triangle-wrapper"></div>
                  </div>

                  {this.state.dev3ShowContact ? <div className="developers-dropdown-wrapper">
                    <ul>
                      <li>Github</li>
                      <li>LinkedIn</li>
                      <li>Angel List</li>
                      <li>Portfolio</li>
                      <li>Email</li>
                    </ul>
                  </div> : ''}
                </li>

                <li onClick={() => this.showContactInfo(4)}>
                  <div className="developer-name-wrapper">
                    <p>Karen Lee</p>
                    <div className="developers-triangle-wrapper"></div>
                  </div>
                  
                  {this.state.dev4ShowContact ? <div className="developers-dropdown-wrapper">
                    <ul>
                      <li>Github</li>
                      <li>LinkedIn</li>
                      <li>Angel List</li>
                      <li>Portfolio</li>
                      <li>Email</li>
                    </ul>
                  </div> : ''}
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-image-wrapper"></div>

          <div className="footer-copyright-wrapper"></div>
        </div>
      </div>
    );
  }
}

export default Home;