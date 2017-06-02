import React, { PropTypes, Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as AppActions from '../../actions/AppActions';

// CSS
import '../../../css/components/MobileHeader.scss';

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
        <nav>
          <Hamburger isOpen={false} handleClick={this.handleClick} />
        </nav>
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
