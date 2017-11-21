import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TransitionMotion } from 'react-motion';

// Actions
import * as CartActions from '../../../actions/CartActions';

// Constants
import * as modalAnimations from '../../../utilities/modal-animation';

function stateToProps(state) {
  const user = state.$$appState.get('user');
  return {
    firstName: user ? user.get('first_name') : null,
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
    const {
      isActive,
      isHovering,
      firstName,
      searchBarActive,
    } = this.props;
    return (
      <span>
        { firstName ?
          (
            <span>
              <span
                className={classnames(
                  'Header__action-name link link--no-underline',
                  { 'Header__action-name--hide': searchBarActive },
                )}
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
                            <a className="h5 link link--no-underline" href="/view-orders">Orders</a>
                          </span>
                          <span className="col-12 u-textAlign--center">
                            <a
                              className="h5 link link--no-underline"
                              href="/logout"
                            >
                                Log&nbsp;Out
                            </a>
                          </span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              </TransitionMotion>
            </span>
          )
          :
            <a href="/profile">
              <span
                className={classnames(
                  'Header__action-name link link--no-underline',
                  { 'Header__action-name--hide': searchBarActive },
                )}
                onClick={this.handleRevealProfileActions}
              >
                Log In / Sign Up
              </span>
            </a>

        }
      </span>
    );
  }
}

HeaderActionRevealer.propTypes = {
  isHovering: PropTypes.bool.isRequired,
  searchBarActive: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
};

HeaderActionRevealer.defaultProps = {
  firstName: null,
};

export default connect(stateToProps, dispatchToProps)(HeaderActionRevealer);
