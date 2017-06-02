import React, { PropTypes, Component } from 'react';
import autoBind from 'react-autobind';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// Actions
// import * as AppActions from '../../actions/AppActions';

// CSS
import '../../../css/components/Header.scss';

// function stateToProps(state) {
//   // Which part of the Redux global state does our component want to receive as props?
//   return {
//     sideMenuOpen: state.$$appState.get('sideMenuOpen'),
//   };
// }
//
// function dispatchToProps(dispatch) {
//   const actions = bindActionCreators(AppActions, dispatch);
//   return {
//     activateSideMenu: actions.activateSideMenu,
//   };
// }

class Header extends Component {
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
      <header className="Header width--full">
        <div className="layout-container">
          <nav className="grid-12">
            <ul className="col-4 textAlign--left">
              <li><a className="Header__link" href="#shop">Shop all</a></li>
              <li><a className="Header__link" href="#featured">Featured</a></li>
              <li><a className="Header__link" href="#about">Who we are</a></li>
            </ul>
            <div className="col-4 textAlign--center">
              <div className="logo">F&P</div>
            </div>
            <ul className="col-4 textAlign--right">
              <li className="Header__action">[Search]</li>
              <li className="Header__action">[Me]</li>
              <li className="Header__action">[Bag]</li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  sideMenuOpen: PropTypes.bool,
  activateSideMenu: PropTypes.func.isRequired,
};

Header.defaultProps = {
  sideMenuOpen: false,
};

export default Header;
