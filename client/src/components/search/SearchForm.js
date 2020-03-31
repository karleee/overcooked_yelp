import React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import * as MapUtil from '../../util/map_util';
import Queries from '../../graphql/queries';
import '../../assets/stylesheets/SearchForm.css';

const { CURRENT_USER } = Queries;

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    // set these terms from the url if present
    let { find_desc, find_loc } = queryString.parse(this.props.location.search);
    this.state = {
      find_desc: find_desc || "",
      find_loc: find_loc || "",
      locationFieldDirty: false,
    }
    this.submitSearch = this.submitSearch.bind(this);
    this.update = this.update.bind(this);
  }

  submitSearch(currentUserZipCode) {
    return e => {
      e.preventDefault();

      // optional search term
      let searchTerm = this.state.find_desc;

      // set default location if not provided
      let defaultLocation = (currentUserZipCode) ? currentUserZipCode : MapUtil.DEFAULT_LOCATION;
      let searchLoc = this.state.find_loc || defaultLocation;

      // perform the search
      this.props.history.push(`/search?find_desc=${searchTerm}&find_loc=${searchLoc}`);
    }
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  renderFindInput() {
    let placeholder;
    if (this.props.mode === 'navbar') {
      placeholder = 'tacos, cheap dinner, Max\'s';
    } else if (this.props.mode === 'main') {
      placeholder = 'burgers, pancakes, burritos, salads...';
    } else {
      placeholder = ''; 
    }

    return (
      <input
        name="find_desc"
        type="text"
        value={this.state.find_desc}
        onChange={this.update('find_desc')}
        placeholder={placeholder}
      />
    );
  }

  renderNearInput(defaultLocation) {
    return (
      <input
        name="find_loc"
        type="text"
        value={this.state.find_loc}
        onChange={this.update('find_loc')}
        placeholder={defaultLocation}
      />
    );
  }

  setFindLocation(userLocation) {
    // this function sets the location input
    // should only happen once
    // location is find_loc > user city > user zip
    MapUtil.getCityFromZip(userLocation).then(city => {
      this.setState({
        find_loc: city,
        locationFieldDirty: true
      });
    });
  }

  render() {
    return (
      <Query query={CURRENT_USER}>
        {({ loading, data }) => {
          if(loading) return 'Loading...';

          // set defaults for location search
          let { find_loc } = queryString.parse(this.props.location.search);
          let zipCode = data.currentUserZipCode;
          let userLocation = (find_loc) ? find_loc :
            (zipCode) ? zipCode : MapUtil.DEFAULT_LOCATION
          if (!this.state.locationFieldDirty && zipCode) {
            this.setFindLocation(userLocation);
          }

          // render different but similar forms
          // based on home vs navbar
          // can be further refactored
          return (this.props.mode === "navbar") ? (
            <form
              autoComplete="off"
              className="search-form navbar"
              onSubmit={this.submitSearch(data.currentUserZipCode)}
            >

              <div className="navbar-search-input-wrapper">
                
                {this.renderFindInput()}

                <div className="navbar-search-separator-wrapper"></div>

                {this.renderNearInput(userLocation)}

                <div
                  className="navbar-search-icon-wrapper"
                  onClick={this.submitSearch(data.currentUserZipCode)}
                >
                  <i className="navbar-search-icon"></i>
                </div>

                {/* need a button to allow for keyboard-submit */}
                <button type="submit">Submit</button>
              </div>
            </form>
          ) : (
            <form
              autoComplete="off"
              className="search-form"
              onSubmit={this.submitSearch(data.currentUserZipCode)}
            >
              <div className="search-input-wrapper">
                <div className="find-input-wrapper">
                  <label>
                    Find
                    {this.renderFindInput()}
                  </label>
                </div>

                <div className="separator-wrapper"></div>

                <div className="near-input-wrapper">
                  <label>
                    Near
                    {this.renderNearInput(userLocation)}
                  </label>
                </div>

                <div
                  className="search-button-wrapper"
                  onClick={this.submitSearch(data.currentUserZipCode)}
                >
                  <i className="search-icon"></i>
                </div>
                {/* need a button to allow for keyboard-submit */}
                <button type="submit">Submit</button>
              </div>
            </form>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(SearchForm);