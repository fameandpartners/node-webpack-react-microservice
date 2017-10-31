import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import SearchBarExpander from '../../generic/SearchBarExpander';
import win from '../../../polyfills/windowPolyfill';

// Assets
import Carat from '../../../../svg/carat.svg';
import SearchIcon from '../../../../svg/i-search.svg';

// Constants
import { NAVIGATION_CONTAINERS } from '../../../constants/AppConstants';

// CSS
import '../../../../css/components/SideMenuActionButtons.scss';


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

    return (
      <div>
        <div className="SideMenuActionButtons__body u-position--relative">
          <ul>
            <li
              className="u-cursor--pointer"
              onClick={this.bindActionClick(NAVIGATION_CONTAINERS.SHOP_ALL)}
              role="button"
            >
              <span className="SideMenuActionButtons--mr-caret-bump">Shop all</span>
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
            <li>
              <a className="link link--static link--no-underline" href="/profile">Account</a>
            </li>
            <li className="u-mb-normal">
              <a className="link link--static link--no-underline" href="/view-orders">Orders</a>
            </li>
            <li>
              <span
                className={classnames(
                  'SideMenuActionButtons__icon-wrapper u-display--inline-block u-vertical-align--middle',
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
  handleMenuActionClick: PropTypes.func.isRequired,
};

export default SideMenuActionButtons;
