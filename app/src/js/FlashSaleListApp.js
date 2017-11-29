import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import { connect } from 'react-redux';

// Sentry Error Tracking
import Raven from 'raven-js';

// Global Styles
import '../css/global/variables.scss';
import '../css/reset.scss';
import '../css/gridlex.scss';
import '../css/helpers.scss';
import '../css/typography.scss';
import '../css/layout.scss';
import '../css/animations.scss';
import '../css/components/FlashSale.scss';

// Components
import CollectionFilter from './components/flash_sale/CollectionFilter';
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

function dispatchToProps() {
  return {};
}

class FlashSaleApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      transformedData: flashSaleDresses.dresses,
    };

    autobind(this);
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
              <FlashSaleProductGrid products={transformedData} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FlashSaleApp.propTypes = {
  lockBody: PropTypes.bool.isRequired,
};

export default connect(stateToProps, dispatchToProps)(FlashSaleApp);
