import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
// import qs from 'qs';
import { bindActionCreators } from 'redux';

// // Sentry Error Tracking
// import Raven from 'raven-js';

// Libraries
import Resize from './decorators/Resize';
import PDPBreakpoints from './libs/PDPBreakpoints';

// Actions
import * as BridesmaidsFilterActions from './actions/BridesmaidsFilterActions';

// Assets
// ???

// Global Styles
import '../css/global/variables.scss';
import '../css/reset.scss';
import '../css/gridlex.scss';
import '../css/helpers.scss';
import '../css/typography.scss';
import '../css/layout.scss';
import '../css/animations.scss';
import '../css/components/FlashSale.scss';

// Utilities
import win from './polyfills/windowPolyfill';
import {
  // transformFilterColors,
  // transformFilterSilhouettes,
  // transformFilterLengths,
  // transformFilterTopDetails,
  getFilteredResults,
} from './utilities/bridesmaids-helpers';

// Constants
// ???

// Components
import BridesmaidsProductGrid from './components/bridesmaids/BridesmaidsProductGrid';
// import BridesmaidsColorSelect from './components/bridesmaids/BridesmaidsColorSelect';
// import BridesmaidsSilhouetteSelect from './components/bridesmaids/BridesmaidsSilhouetteSelect';
// import BridesmaidsLengthSelect from './components/bridesmaids/BridesmaidsLengthSelect';
// import BridesmaidsTopDetailSelect from './components/bridesmaids/BridesmaidsTopDetailSelect';
// import ErrorMessage from './components/generic/ErrorMessage';

// CSS
import '../css/components/BridesmaidsFilterResultsApp.scss';


// // Configure Error Tracking
// Raven
//   .config('https://bc3111a59f064fbba31becef25d2fb7c@sentry.io/88252')
//   .install();


function stateToProps() {
  return {
    lockBody: false,
  };
}

function dispatchToProps(dispatch) {
  const actions = bindActionCreators(BridesmaidsFilterActions, dispatch);
  return {
    hydrateFiltersFromURL: actions.hydrateFiltersFromURL,
  };
}

class BridesmaidsFilterResultsApp extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      filteredDresses: [],
    };
  }

  componentDidMount() {
    const queryParams = win.location.search;
    const hasSearchQueryParams = !!queryParams;

    if (hasSearchQueryParams) {
      getFilteredResults(queryParams).end((err, res) => {
        // eslint-disable-next-line
        console.log('getFilteredResults()', res.body.bridesmaid);
        this.setState({
          // just set 50 for testing... (current hardcoded string fetching 516)
          filteredDresses: res.body.bridesmaid.slice(466),
        });
      });
    } else {
      // eslint-disable-next-line
      console.log('NO QUERY PARAMS PRESENT IN URL!');
    }
  }

  render() {
    const {
      filteredDresses,
    } = this.state;

    const {
      lockBody,
    } = this.props;

    return (
      <div className="__react_root__">
        <div className={`FlashSaleListApp Root__wrapper ${lockBody ? 'FlashSaleApp--scroll-lock' : ''}`}>
          <div className="FlashSaleBanner__wrapper">
            Here's Your Exclusive Collection
          </div>
          <div className="grid-12-noGutter layout-container">
            <div className="col-12">
              <BridesmaidsProductGrid products={filteredDresses} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BridesmaidsFilterResultsApp.propTypes = {
  // Redux
  lockBody: PropTypes.bool.isRequired,
};

// eslint-disable-next-line
export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(BridesmaidsFilterResultsApp));
