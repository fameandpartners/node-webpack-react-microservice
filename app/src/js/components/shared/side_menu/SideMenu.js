import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Motion, spring } from 'react-motion';

// Actions
import * as AppActions from '../../../actions/AppActions';

// Constants
import { NAVIGATION_CONTAINERS } from '../../../constants/AppConstants';

// Components
import ContainerDividerToggle from '../ContainerDividerToggle';
import SideMenuActionButtons from './SideMenuActionButtons';
import SideMenuSubNavigation from './SideMenuSubNavigation';
import Hamburger from '../header/Hamburger';

// CSS
import '../../../../css/components/SideMenu.scss';

function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    sideMenuOpen: state.$$appState.get('sideMenuOpen'),
  };
}

function dispatchToProps(dispatch) {
  const actions = bindActionCreators(AppActions, dispatch);
  return {
    activateSideMenu: actions.activateSideMenu,
  };
}


class SideMenu extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      subNavigationContainer: null,
    };
  }

  handleCloseMenu() {
    const { activateSideMenu } = this.props;
    activateSideMenu({ sideMenuOpen: false });
  }

  handleMenuActionClick(subNavigationContainer) {
    this.setState({ subNavigationContainer });
  }

  render() {
    const { sideMenuOpen } = this.props;
    const { subNavigationContainer } = this.state;
    return (
      <Motion
        style={{
          x: spring(sideMenuOpen ? 0 : -20, {
            stiffness: 170,
            damping: 18,
            precision: 80,
          }),
        }}
      >
        {({ x }) =>
          <div
            className="SideMenu u-width--full"
            style={{
              WebkitTransform: `translate3d(${x * 5}%, 0, 0)`,
              transform: `translate3d(${x * 5}%, 0, 0)`,
            }}
          >
            <Hamburger
              className="SideMenu__menu-btn u-position--absolute"
              isOpen
              handleClick={this.handleCloseMenu}
            />

            <ContainerDividerToggle
              activeId={subNavigationContainer}
              activationIdSet={[
                NAVIGATION_CONTAINERS.SHOP_ALL,
                NAVIGATION_CONTAINERS.WHO_WE_ARE,
              ]}
              leftContainerNode={
                <SideMenuActionButtons
                  handleMenuActionClick={this.handleMenuActionClick}
                />
              }
              rightContainerNode={(
                <SideMenuSubNavigation
                  subNavigationContainer={NAVIGATION_CONTAINERS.SHOP_ALL}
                />
              )}
            />

          </div>
        }
      </Motion>
    );
  }
}

SideMenu.propTypes = {
  activateSideMenu: PropTypes.func.isRequired,
  sideMenuOpen: PropTypes.bool,
};
SideMenu.defaultProps = {
  sideMenuOpen: false,
};
export default connect(stateToProps, dispatchToProps)(SideMenu);
