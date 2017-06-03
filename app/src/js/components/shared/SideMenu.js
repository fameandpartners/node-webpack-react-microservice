import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Motion, spring } from 'react-motion';

// Actions
import * as AppActions from '../../actions/AppActions';

// Components
import Hamburger from './Hamburger';

// CSS
import '../../../css/components/SideMenu.scss';

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
  }
  handleCloseMenu() {
    const { activateSideMenu } = this.props;
    activateSideMenu({ sideMenuOpen: false });
  }
  render() {
    const { sideMenuOpen } = this.props;
    return (
      <Motion
        style={{
          x: spring(sideMenuOpen ? 0 : -100, {
            stiffness: 170,
            damping: 18,
            precision: 80,
          }),
        }}
      >
        {({ x }) =>
          <div
            className="SideMenu"
            style={{
              WebkitTransform: `translate3d(${x}%, 0, 0)`,
              transform: `translate3d(${x}%, 0, 0)`,
            }}
          >
            <Hamburger
              className="SideMenu__menu-btn position--absolute"
              isOpen
              handleClick={this.handleCloseMenu}
            />
            <div className="SideMenu__body position--relative">
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
                <li>Item 4</li>
              </ul>
            </div>
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
