import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TransitionMotion } from 'react-motion';

// Actions
import * as CartActions from '../../../actions/CartActions';

// Constants
import * as modalAnimations from '../../../utilities/modal-animation';

function stateToProps(state) {
  return {
    firstName: state.$$appState.get('user').get('first_name'),
  };
}

function dispatchToProps(dispatch) {
  const { activateCartDrawer } = bindActionCreators(CartActions, dispatch);
  return { activateCartDrawer };
}

class HeaderActionRevealer extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      searchBarActive: false,
      openNavItem: null,
    };
  }

  willEnter() {
    return modalAnimations.STANDARD_WILL_ENTER;
  }

  willLeave() {
    return modalAnimations.STANDARD_WILL_LEAVE;
  }

  render() {
    const { isActive, isHovering, firstName } = this.props;
    return (
      <span>
        <span
          className="Header__action-name link"
          onClick={this.handleRevealProfileActions}
        >
          Hello, {firstName}
        </span>
        <TransitionMotion
          styles={isActive || isHovering ? [modalAnimations.STANDARD_DEFAULT_STYLES] : []}
          willEnter={this.willEnter}
          willLeave={this.willLeave}
        >
          { (items) => {
            if (items.length) {
              const { style } = items[0];
              return (
                <div
                  style={{
                    opacity: style.opacity,
                    transform: `translate3d(0, ${style.y || 0}%, 0)`,
                  }}
                  key="Header__action-revealer-profile"
                  className="Header__action-account-revealer grid-middle"
                >
                  <div className="grid-middle-center u-width--full">
                    <span className="col-12 u-textAlign--center">
                      <a className="h5 link link--no-underline" href="/profile">Account</a>
                    </span>
                    <span className="col-12 u-textAlign--center">
                      <a className="h5 link link--no-underline" href="/profile">Orders</a>
                    </span>
                    <span className="col-12 u-textAlign--center">
                      <a className="h5 link link--no-underline" href="/logout">Log&nbsp;out</a>
                    </span>
                  </div>
                </div>
              );
            }
            return null;
          }}
        </TransitionMotion>
      </span>
    );
  }
}

HeaderActionRevealer.propTypes = {
  isHovering: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  firstName: PropTypes.string.isRequired,
};

export default connect(stateToProps, dispatchToProps)(HeaderActionRevealer);
