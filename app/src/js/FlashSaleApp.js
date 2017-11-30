import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';

// Sentry Error Tracking
import Raven from 'raven-js';

// Components
import FlashAppMain from './components/flash_sale/FlashAppMain';

// Global Styles
import '../css/global/variables.scss';
import '../css/reset.scss';
import '../css/gridlex.scss';
import '../css/helpers.scss';
import '../css/typography.scss';
import '../css/layout.scss';
import '../css/animations.scss';
import '../css/components/FlashSale.scss';

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
    this.state = { isOpen: false };
    autoBind(this);
  }

  render() {
    const { lockBody } = this.props;
    return (
      <div className="__react_root__">
        <div className={`FlashSaleApp Root__wrapper ${lockBody ? 'FlashSaleApp--scroll-lock' : ''}`}>
          <FlashAppMain />
        </div>
      </div>
    );
  }
}

FlashSaleApp.propTypes = {
  lockBody: PropTypes.bool.isRequired,
};

export default connect(stateToProps, dispatchToProps)(FlashSaleApp);
