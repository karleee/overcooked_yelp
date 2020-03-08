import React from 'react';
import Navbar from '../navbar/Navbar';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import Queries from '../../graphql/queries';
import { DEFAULT_LOCATION } from '../../util/map_util';
import ResultMap from './ResultMap';
import ResultList from './ResultList';

import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/App.css';
import '../../assets/stylesheets/SearchResultIndex.css';

const { SEARCH } = Queries;

const SearchResultIndex = props => {
    // get search term and search location from the url
    let { find_desc, find_loc } = queryString.parse(props.location.search);
    find_loc = find_loc || DEFAULT_LOCATION;
    return (
      <div className="search-result-index-wrapper">
        <Navbar />
        <Query query={SEARCH} variables={{ find_desc, find_loc }}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            // if any errors, just dont return any restaurants
            let restaurants = (error) ? [] : data.search;
            return (
              <div className="search-result-wrapper">
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
            );
          }}
        </Query>
      </div>
    );
};

export default withRouter(SearchResultIndex);