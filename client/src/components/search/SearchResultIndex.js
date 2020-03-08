import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import Queries from '../../graphql/queries';
import { DEFAULT_LOCATION } from '../../util/map_util';

import ResultMap from './ResultMap';
import ResultList from './ResultList';
import ProgressLoader from '../loader/ProgressLoader';

import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/App.css';
import '../../assets/stylesheets/SearchResultIndex.css';

const { SEARCH } = Queries;

class SearchResultIndex extends Component {
  constructor(props) {
    super(props);
  }

  // Hides scrolling when modal is mounted
  // componentDidMount() {
  //   document.body.style.overflow = 'hidden';
  // }

  // Reactiviates scrolling when modal is unmounted
  // componentWillUnmount() {
  //   document.body.style.overflow = 'unset';
  // }

  render() {
    // get search term and search location from the url
    let { find_desc, find_loc } = queryString.parse(this.props.location.search);
    find_loc = find_loc || DEFAULT_LOCATION;
    
    return (
      <div className="search-result-index-wrapper">
        <Query query={SEARCH} variables={{ find_desc, find_loc }}>
          {({ loading, error, data }) => {
            if (loading) return <ProgressLoader type='loading' />;
            if (error) return <ProgressLoader type='error' />;

            // if any errors, just dont return any restaurants
            let restaurants = (error) ? [] : data.search;
            return (
              <div className="search-result-wrapper">
                <Navbar />

                <div className="search-result-body-container">
                  <ResultList
                    restaurants={restaurants}
                    find_desc={find_desc}
                    find_loc={find_loc}
                  />

                  <ResultMap
                    restaurants={restaurants}
                    find_loc={find_loc}
                  />
                </div>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
};

export default withRouter(SearchResultIndex);