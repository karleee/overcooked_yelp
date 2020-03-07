import React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import * as MapUtil from '../../util/map_util';
import Queries from '../../graphql/queries';
const { CURRENT_USER } = Queries;

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      find_desc: "",
      find_loc: "",
      locationFieldDirty: false,
    }
    this.submitSearch = this.submitSearch.bind(this);
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

  setFindLocation(zipCode) {
    MapUtil.getCityFromZip(zipCode).then(city => {
      this.setState({
        find_loc: city,
        // should only happen once
        locationFieldDirty: true
      });
    });
  }

  render() {
    return (
      <Query query={CURRENT_USER}>
        {({ loading, data }) => {
          if (loading) return <p>Loading</p>;

          let zipCode = data.currentUserZipCode;
          if (!this.state.locationFieldDirty && zipCode) {
            this.setFindLocation(zipCode);
          }

          return (
            <form onSubmit={this.submitSearch(data.currentUserZipCode)}>
              <div className="search-input-wrapper">
                <div className="find-input-wrapper">
                  <label>
                    Find
                    <input
                      name="find_desc"
                      type="text"
                      value={this.state.find_desc}
                      onChange={this.update('find_desc')}
                      placeholder="burgers, pancakes, burritos, salads..."
                    />
                  </label>
                </div>

                <div className="separator-wrapper"></div>

                <div className="near-input-wrapper">
                  <label>
                    Near
                    <input
                      name="find_loc"
                      type="text"
                      value={this.state.find_loc}
                      onChange={this.update('find_loc')}
                      placeholder={(data.currentUserZipCode) ? data.currentUserZipCode : MapUtil.DEFAULT_LOCATION}
                    />
                  </label>
                </div>

                <div
                  className="search-button-wrapper"
                  onClick={this.submitSearch(data.currentUserZipCode)}
                >
                  <i className="search-icon"></i>
                </div>
                {/* need a button to allow for keyboard-submit */}
                <button type="submit" style={{ display: "none"}}>Submit</button>
              </div>
            </form>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(SearchForm);