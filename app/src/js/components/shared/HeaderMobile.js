import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as AppActions from '../../actions/AppActions';

// CSS
import '../../../css/components/HeaderMobile.scss';

// Components
import Hamburger from './Hamburger';

// Assets
import ShoppingBagIcon from '../../../svg/i-shopping-bag.svg';

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

class HeaderMobile extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleClick() {
    const { activateSideMenu, sideMenuOpen } = this.props;
    activateSideMenu({ sideMenuOpen: !sideMenuOpen });
  }

  render() {
    const { headerTitle } = this.props;
    return (
      <header className="Header HeaderMobile width--full">
        <div className="layout-container">
          <nav className="grid">
            <div className="col-1">
              <Hamburger
                isOpen={false}
                handleClick={this.handleClick}
              />
            </div>
            <div className="col">
              {headerTitle}
            </div>
            <div className="col-1 textAlign--right">
              <img
                src={ShoppingBagIcon.url}
                alt="Shopping Bag Icon"
                width="26px"
                height="26px"
              />
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

HeaderMobile.propTypes = {
  headerTitle: PropTypes.string,
  // Redux Props
  sideMenuOpen: PropTypes.bool,
  activateSideMenu: PropTypes.func.isRequired,
};

HeaderMobile.defaultProps = {
  headerTitle: '',
  sideMenuOpen: false,
};

export default connect(stateToProps, dispatchToProps)(HeaderMobile);
