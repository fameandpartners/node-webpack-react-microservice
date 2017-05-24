import React, { PropTypes, Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as AppActions from '../../actions/AppActions';

// CSS
import '../../../css/components/Header.scss';

// Components
import Hamburger from './Hamburger';

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
        <nav>
          <Hamburger isOpen={false} handleClick={this.handleClick} />
          <ul>
            <li><a href="#link1">Link 1</a></li>
            <li><a href="#link2">Link 2</a></li>
            <li><a href="#link3">Link 3</a></li>
          </ul>
        </nav>
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

export default connect(stateToProps, dispatchToProps)(Header);
