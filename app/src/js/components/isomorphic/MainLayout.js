import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import HeaderWrapper from '../shared/header/HeaderWrapper';
import Footer from '../shared/Footer';

// Decorators
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

// Actions
import * as AppActions from '../../actions/AppActions';
import * as ModalActions from '../../actions/ModalActions';

// Constants
import ModalConstants from '../../constants/ModalConstants';

// CSS
import '../../../css/components/AppMain.scss';

function stateToProps() {
  // Which part of the Redux global state does our component want to receive as props?
  return {};
}

function dispatchToProps(dispatch) {
  const actions = bindActionCreators(AppActions, dispatch);
  const modalActions = bindActionCreators(ModalActions, dispatch);

  return {
    activateSideMenu: actions.activateSideMenu,
    activateModal: modalActions.activateModal,
  };
}

class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    autoBind(this);
  }

  handleActivateModal() {
    this.props.activateModal({ modalId: ModalConstants.SIGN_UP_MODAL });
  }

  render() {
    const {
      breakpoint,
    } = this.props;
    console.log('breakpoint', breakpoint);

    return (
      <div className="AppMain__wrapper">
        <HeaderWrapper />
        <Footer />
      </div>
    );
  }
}

MainLayout.propTypes = {
  // Decorator Props
  breakpoint: PropTypes.string.isRequired,
  // Redux Funcs
  activateModal: PropTypes.func.isRequired,
};

MainLayout.defaultProps = {
  cartDrawerOpen: false,
  sku: null,
};

export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(MainLayout));
