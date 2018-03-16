import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import MainLayout from './components/isomorphic/MainLayout';

// Actions
import * as AppActions from './actions/AppActions';
import * as CustomizationActions from './actions/CustomizationActions';

// Polyfills
import win from './polyfills/windowPolyfill';

// Global Styles
import '../css/global/variables.scss';
import '../css/reset.scss';
import '../css/gridlex.scss';
import '../css/helpers.scss';
import '../css/typography.scss';
import '../css/layout.scss';
import '../css/animations.scss';
import '../css/components/App.scss';


function stateToProps() {
  return {
    lockBody: false,
  };
}

function dispatchToProps(dispatch) {
  const { setShareableQueryParams } = bindActionCreators(AppActions, dispatch);
  const {
    selectProductColor,
    updateCustomizationStyleSelection,
  } = bindActionCreators(CustomizationActions, dispatch);

  return {
    selectProductColor,
    setShareableQueryParams,
    updateCustomizationStyleSelection,
  };
}

class IsomorphicStarter extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    autoBind(this);
  }

  componentDidUpdate() {
    if (win && win.fixBody) {
      win.fixBody(this.props.lockBody);
    }
  }

  render() {
    const { lockBody } = this.props;
    return (
      <div className="__react_root__">
        <div className={`App Root__wrapper ${lockBody ? 'App--scroll-lock' : ''}`}>
          <MainLayout />
        </div>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
IsomorphicStarter.propTypes = {
  lockBody: PropTypes.bool.isRequired,
};

export default connect(stateToProps, dispatchToProps)(IsomorphicStarter);
