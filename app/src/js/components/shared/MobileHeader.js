import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as AppActions from '../../actions/AppActions';

// CSS
import '../../../css/components/MobileHeader.scss';

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

class MobileHeader extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleClick() {
    const { activateSideMenu, sideMenuOpen } = this.props;
    activateSideMenu({ sideMenuOpen: !sideMenuOpen });
  }

  render() {
    return (
      <header className="Header MobileHeader width--full">
        <div className="layout-container">
          <nav className="grid-12">
            <div className="col-6">
              <Hamburger isOpen={false} handleClick={this.handleClick} />
            </div>
            <div className="col-6 textAlign--right">
              <ShoppingBagIcon width="26px" height="26px" />
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

MobileHeader.propTypes = {
  sideMenuOpen: PropTypes.bool,
  activateSideMenu: PropTypes.func.isRequired,
};

MobileHeader.defaultProps = {
  sideMenuOpen: false,
};

export default connect(stateToProps, dispatchToProps)(MobileHeader);
