import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import qs from 'qs';
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
  transformFilterColors,
  transformFilterSilhouettes,
  transformFilterLengths,
  transformFilterTopDetails,
} from './utilities/bridesmaids-helpers';

// Constants
// ???

// Components
import BridesmaidsColorSelect from './components/bridesmaids/BridesmaidsColorSelect';
import BridesmaidsSilhouetteSelect from './components/bridesmaids/BridesmaidsSilhouetteSelect';
import BridesmaidsLengthSelect from './components/bridesmaids/BridesmaidsLengthSelect';
import BridesmaidsTopDetailSelect from './components/bridesmaids/BridesmaidsTopDetailSelect';

// CSS
import '../css/components/BridesmaidsFilterApp.scss';


// // Configure Error Tracking
// Raven
//   .config('https://bc3111a59f064fbba31becef25d2fb7c@sentry.io/88252')
//   .install();


function stateToProps({ $$bridesmaidsFilterState }) {
  const filterColors = transformFilterColors(
    $$bridesmaidsFilterState.get('$$bridesmaidsFilterColors').toJS(),
  );
  const filterSilhouettes = transformFilterSilhouettes(
    $$bridesmaidsFilterState.get('$$bridesmaidsFilterSilhouettes').toJS(),
  );
  const filterLengths = transformFilterLengths(
    $$bridesmaidsFilterState.get('$$bridesmaidsFilterLengths').toJS(),
  );
  const filterTopDetails = transformFilterTopDetails(
    $$bridesmaidsFilterState.get('$$bridesmaidsFilterTopDetails').toJS(),
  );

  return {
    lockBody: false,
    filterColors,
    filterSilhouettes,
    filterLengths,
    filterTopDetails,
  };
}

function dispatchToProps(dispatch) {
  const actions = bindActionCreators(BridesmaidsFilterActions, dispatch);
  return {
    hydrateFiltersFromURL: actions.hydrateFiltersFromURL,
  };
}

class BridesmaidsFilterApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      productsCurrentPage: null,
      totalPages: null,
    };

    autobind(this);
  }

  componentWillMount() {
    /**
     * NOTE:
     *   Do we still need something like this for the
     *   bridesmaids filter?
     */

    // const queryParams = win.location.search;
    // const parsedQueryObj = qs.parse(queryParams.slice(1));

    // this.setState({
    //   productsCurrentPage: Number(parsedQueryObj.page) || this.props.page,
    // eslint-disable-next-line
    //   totalPages: this.props.pageDresses.length ? Number(this.props.pageDresses[0].total_pages) : this.props.page,
    // });
  }

  componentDidMount() {
    const queryParams = win.location.search;
    const hasSearchQueryParams = !!queryParams;

    if (hasSearchQueryParams) {
      const parsedQueryObj = qs.parse(queryParams.slice(1));
      this.props.hydrateFiltersFromURL({
        page: parsedQueryObj.page,
        sort: parsedQueryObj.sort || 'asc',
        selectedColors: parsedQueryObj.color || [],
        selectedSizes: parsedQueryObj.size,
        selectedDressLengths: parsedQueryObj.length || [],
      });
    }
  }


  render() {
    const {
      breakpoint,
      lockBody,
      filterColors,
      filterSilhouettes,
      filterLengths,
      filterTopDetails,
    } = this.props;

    return (
      <div className="__react_root__">
        <div className={`FlashSaleListApp Root__wrapper ${lockBody ? 'FlashSaleApp--scroll-lock' : ''}`}>
          <div className="FlashSaleBanner__wrapper">
            { breakpoint === 'mobile' || breakpoint === 'tablet'
              ? (
                <h1>
                  Find the <em>Perfect</em> Dress
                </h1>
              )
              : (
                <h1>
                  Create Your Own Custom Dress Collection
                </h1>
              )
            }
          </div>
          <div className="grid-12-noGutter layout-container">
            <h2>Choose your color</h2>
            <div className="col-12">
              <BridesmaidsColorSelect
                filterColors={filterColors}
              />
            </div>
            <h2>Choose your silhouette</h2>
            <div className="col-12">
              <BridesmaidsSilhouetteSelect
                filterSilhouettes={filterSilhouettes}
              />
            </div>
            <div className="col-12">
              <h2>Choose your length</h2>
              <BridesmaidsLengthSelect
                filterLengths={filterLengths}
              />
            </div>
            <div className="col-12">
              <h2>Choose the top details you like</h2>
              <BridesmaidsTopDetailSelect
                filterTopDetails={filterTopDetails}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BridesmaidsFilterApp.propTypes = {
  // Decorator
  breakpoint: PropTypes.string.isRequired,
  // Redux
  lockBody: PropTypes.bool.isRequired,
  // Redux Functions
  hydrateFiltersFromURL: PropTypes.func.isRequired,
  filterColors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    hexValue: PropTypes.string,
    patternUrl: PropTypes.string,
  })).isRequired,
  filterSilhouettes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
  })).isRequired,
  filterLengths: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
  })).isRequired,
  filterTopDetails: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
  })).isRequired,
};

export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(BridesmaidsFilterApp));
