import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';

// Sentry Error Tracking
import Raven from 'raven-js';

// Components
import SuperCollectionAppMain from './components/super_collection/SuperCollectionAppMain';

// Global Styles
import '../css/global/variables.scss';
import '../css/reset.scss';
import '../css/gridlex.scss';
import '../css/helpers.scss';
import '../css/typography.scss';
import '../css/layout.scss';
import '../css/animations.scss';
import '../css/components/SuperCollection.scss';

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

class SuperCollection extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    autoBind(this);
  }

  render() {
    const { lockBody } = this.props;
    return (
      <div className="__react_root__">
        <div className={`SuperCollection Root__wrapper ${lockBody ? 'SuperCollection--scroll-lock' : ''}`}>
          <SuperCollectionAppMain />
        </div>
      </div>
    );
  }
}

SuperCollection.propTypes = {
  lockBody: PropTypes.bool.isRequired,
};

export default connect(stateToProps, dispatchToProps)(SuperCollection);