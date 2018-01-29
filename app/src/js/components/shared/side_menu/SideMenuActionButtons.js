import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import { connect } from 'react-redux';
import SearchBarExpander from '../../generic/SearchBarExpander';
import win from '../../../polyfills/windowPolyfill';

// Assets
import Carat from '../../../../svg/carat.svg';
import SearchIcon from '../../../../svg/i-search.svg';

// Constants
import { NAVIGATION_CONTAINERS } from '../../../constants/AppConstants';

// CSS
import '../../../../css/components/SideMenuActionButtons.scss';


function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  const user = state.$$appState.get('user');
  return {
    firstName: user ? user.get('first_name') : null,
  };
}

class SideMenuActionButtons extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      searchBarActive: false,
    };
  }

  handleSearchIconClick() {
    this.setState({ searchBarActive: true });
  }

  handleSearchIconClickClose() {
    this.setState({ searchBarActive: false });
  }

  handleDressSearch(evt, data) {
    const location = `${win.location.origin}/search?q=${win.encodeURI(data)}`;
    win.location = location;
  }

  bindActionClick(subNavigationContainer) {
    const { handleMenuActionClick } = this.props;
    return () => {
      handleMenuActionClick(subNavigationContainer);
    };
  }

  render() {
    const { searchBarActive } = this.state;
    const { firstName } = this.props;

    return (
      <div className="u-height--full grid-middle">
        <div className="SideMenuActionButtons__body u-position--relative">
          <ul>
            { firstName ?
              <li className="u-mb--big u-ml-xs">
                <a
                  className="link link--static link--no-underline"
                  href="/profile"
                >
                    Hello, {firstName}
                </a>
              </li>
              :
              <li className="u-ml-xs">
                <a
                  className="link link--static link--no-underline"
                  href="/profile"
                >
                  Log In / Sign Up
                </a>
              </li>
            }
            <li>-</li>
            <li
              className="u-cursor--pointer"
              onClick={this.bindActionClick(NAVIGATION_CONTAINERS.SHOP_ALL)}
              role="button"
            >
              <span className="SideMenuActionButtons--mr-caret-bump">Shop All</span>
              <span className="u-position--relative u-u-display--inline">
                <Carat
                  className="SideMenuActionButtons__caret--right"
                  width="10px"
                  height="10px"
                />
              </span>
            </li>
            <li
              className="u-cursor--pointer"
              onClick={this.bindActionClick(NAVIGATION_CONTAINERS.WHO_WE_ARE)}
              role="button"
            >
              <span className="SideMenuActionButtons--mr-caret-bump">Who We Are</span>
              <span>
                <Carat
                  className="SideMenuActionButtons__caret--right u-position--inherit"
                  width="10px"
                  height="10px"
                />
              </span>
            </li>
            { firstName ?
              <li>
                <a className="link link--static link--no-underline" href="/profile">Account</a>
              </li> : null
            }
            { firstName ?
              <li className="u-mb--normal">
                <a className="link link--static link--no-underline" href="/view-orders">Orders</a>
              </li> : null
            }
            <li>
              <span
                className={classnames(
                  'SideMenuActionButtons__icon-wrapper u-display--inline-block',
                  { 'SideMenuActionButtons__icon-wrapper--active': searchBarActive },
                )}
                onClick={this.handleSearchIconClick}
              >
                <SearchIcon
                  className="SearchBarExpander__icon u-cursor--pointer u-position--absolute"
                  width="18px"
                  height="26px"
                />
              </span>
              <SearchBarExpander
                handleSearchIconClick={this.handleSearchIconClick}
                onBlur={this.handleSearchIconClickClose}
                onSubmit={this.handleDressSearch}
                isActive={searchBarActive}
              />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

SideMenuActionButtons.propTypes = {
  firstName: PropTypes.string,
  handleMenuActionClick: PropTypes.func.isRequired,
};

SideMenuActionButtons.defaultProps = {
  firstName: null,
};

export default connect(stateToProps)(SideMenuActionButtons);
