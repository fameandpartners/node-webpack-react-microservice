import React, { PureComponent } from 'react';
import autobind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Motion, spring } from 'react-motion';

// Utilities
import win from '../../polyfills/windowPolyfill';

// Constants
import AppConstants from '../../constants/AppConstants';

// Actions
import * as AppActions from '../../actions/AppActions';
import * as CartActions from '../../actions/CartActions';

// CSS
import '../../../css/components/BlanketOverlay.scss';

function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    sideMenuOpen: state.$$appState.get('sideMenuOpen'),
  };
}

function dispatchToProps(dispatch) {
  const actions = bindActionCreators(AppActions, dispatch);
  const cartActions = bindActionCreators(CartActions, dispatch);

  return {
    activateCartDrawer: cartActions.activateCartDrawer,
    activateSideMenu: actions.activateSideMenu,
  };
}

/* eslint-disable react/prefer-stateless-function */
class BlanketOverlay extends PureComponent {
  constructor(props) {
    super(props);
    autobind(this);
  }

  handleCloseMenu() {
    const {
      activateCartDrawer,
      activateSideMenu,
      sideMenuOpen,
    } = this.props;

    activateCartDrawer({ sideMenuOpen: false });
    if (sideMenuOpen) activateSideMenu({ sideMenuOpen: false });
  }

  componentDidUpdate() {
    const {
      sideMenuOpen,
    } = this.props;
    if (win.fixBody) {
      win.fixBody(sideMenuOpen);
    }
  }

  render() {
    const {
      sideMenuOpen,
    } = this.props;

    return (
      <Motion
        style={{
          opacity: spring(
              sideMenuOpen ? 50 : 0, AppConstants.ANIMATION_CONFIGURATION,
          ),
        }}
      >
        {({ opacity }) =>
          <div
            className="BlanketOverlay u-height--full u-width--full u-cursor--pointer"
            onClick={this.handleCloseMenu}
            style={{
              opacity: opacity / 100,
              visibility: opacity !== 0 ? 'visible' : 'hidden',
            }}
          />
        }
      </Motion>
    );
  }
}

BlanketOverlay.propTypes = {
  activateCartDrawer: PropTypes.func.isRequired,
  activateSideMenu: PropTypes.func.isRequired,
  sideMenuOpen: PropTypes.bool,
};

BlanketOverlay.defaultProps = {
  sideMenuOpen: false,
};

export default connect(stateToProps, dispatchToProps)(BlanketOverlay);
