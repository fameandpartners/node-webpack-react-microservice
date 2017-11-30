import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import qs from 'qs';
import { bindActionCreators } from 'redux';

// Sentry Error Tracking
import Raven from 'raven-js';

// Actions
import * as CollectionFilterSortActions from './actions/CollectionFilterSortActions';

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

// Components
import CollectionFilter from './components/flash_sale/CollectionFilter';
import CollectionSort from './components/flash_sale/CollectionSort';
import FlashSaleProductGrid from './components/flash_sale/FlashSaleProductGrid';

// TEMP. mock data
import flashSaleDresses from '../mock/flash-sale-dresses.json';

// Configure Error Tracking
Raven
  .config('https://bc3111a59f064fbba31becef25d2fb7c@sentry.io/88252')
  .install();


function stateToProps() {
  return {
    lockBody: false,
  };
}

function dispatchToProps(dispatch) {
  const actions = bindActionCreators(CollectionFilterSortActions, dispatch);
  return {
    hydrateFiltersFromURL: actions.hydrateFiltersFromURL,
  };
}

class FlashSaleApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      transformedData: flashSaleDresses.dresses,
    };

    autoBind(this);
  }

  componentDidMount() {
    const queryParams = win.location.search;
    const hasSearchQueryParams = !!queryParams;

    if (hasSearchQueryParams) {
      const parsedQueryObj = qs.parse(queryParams.slice(1));
      this.props.hydrateFiltersFromURL({
        page: parsedQueryObj.page,
        sort: parsedQueryObj.sort,
        selectedColors: parsedQueryObj.color || [],
        selectedDressSize: parsedQueryObj.size,
        selectedDressLengths: parsedQueryObj.length || [],
      });
    }
  }

  render() {
    const { lockBody } = this.props;
    const {
      transformedData,
    } = this.state;

    return (
      <div className="__react_root__">
        <div className={`FlashSaleListApp Root__wrapper ${lockBody ? 'FlashSaleApp--scroll-lock' : ''}`}>
          <div className="grid-12 layout-container">
            <div className="col-3">
              <CollectionFilter />
            </div>
            <div className="col-9">
              <div className="grid-12">
                <div className="col-12">
                  <CollectionSort />
                </div>
                <div className="col-12">
                  <FlashSaleProductGrid products={transformedData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FlashSaleApp.propTypes = {
  lockBody: PropTypes.bool.isRequired,
  hydrateFiltersFromURL: PropTypes.func.isRequired,
};

export default connect(stateToProps, dispatchToProps)(FlashSaleApp);
