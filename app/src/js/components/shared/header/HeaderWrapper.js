import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactHoverObserver from 'react-hover-observer';

// Decorators
import Resize from '../../../decorators/Resize';
import PDPBreakpoints from '../../../libs/PDPBreakpoints';

// Actions
import * as AppActions from '../../../actions/AppActions';
import * as CartActions from '../../../actions/CartActions';
import * as ModalActions from '../../../actions/ModalActions';

// Constants
import ModalConstants from '../../../constants/ModalConstants';

// Generic UI Components
import HeaderHider from '../../shared/header/HeaderHider';
import HeaderMobile from '../../shared/header/HeaderMobile';
import HeaderDesktop from '../../shared/header/HeaderDesktop';


function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    productTitle: state.$$productState.get('productTitle'),
    sideMenuOpen: state.$$appState.get('sideMenuOpen'),
    cartDrawerOpen: state.$$cartState.get('cartDrawerOpen'),
  };
}

function dispatchToProps(dispatch) {
  const actions = bindActionCreators(AppActions, dispatch);
  const modalActions = bindActionCreators(ModalActions, dispatch);
  const cartActions = bindActionCreators(CartActions, dispatch);

  return {
    activateCartDrawer: cartActions.activateCartDrawer,
    activateSideMenu: actions.activateSideMenu,
    activateModal: modalActions.activateModal,
  };
}

class HeaderWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    autoBind(this);
  }

  handleCloseMenu() {
    const {
      activateCartDrawer,
      activateSideMenu,
      cartDrawerOpen,
      sideMenuOpen,
    } = this.props;

    if (sideMenuOpen) activateSideMenu({ sideMenuOpen: false });
    else if (cartDrawerOpen) activateCartDrawer({ sideMenuOpen: false });
  }

  handleActivateModal() {
    this.props.activateModal({ modalId: ModalConstants.SIGN_UP_MODAL });
  }

  render() {
    const {
      breakpoint,
      productTitle,
    } = this.props;

    return (
      <div className="__react_root__">
        { breakpoint === 'mobile' || breakpoint === 'tablet' ?
          <HeaderHider>
            <HeaderMobile headerTitle={productTitle} />
          </HeaderHider>
                :
          <ReactHoverObserver hoverOffDelayInMs={120}>
            <HeaderDesktop />
          </ReactHoverObserver>
        }
      </div>
    );
  }
}

HeaderWrapper.propTypes = {
  // Redux Props
  activateModal: PropTypes.func.isRequired,
  cartDrawerOpen: PropTypes.bool,
  sideMenuOpen: PropTypes.bool,
  productTitle: PropTypes.string,

  // Redux Actions
  activateCartDrawer: PropTypes.func.isRequired,
  activateSideMenu: PropTypes.func.isRequired,

  // Decorator Props
  breakpoint: PropTypes.string.isRequired,
};

HeaderWrapper.defaultProps = {
  cartDrawerOpen: false,
  productTitle: null,
  sideMenuOpen: false,
  sku: null,
};

export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(HeaderWrapper));
