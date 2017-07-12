import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Motion, spring } from 'react-motion';
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

// Actions
import * as AppActions from '../../actions/AppActions';
import * as ModalActions from '../../actions/ModalActions';
import * as CartActions from '../../actions/CartActions';

// Constants
import AppConstants from '../../constants/AppConstants';
import ModalConstants from '../../constants/ModalConstants';

// PDP specific UI Components
import ProductPrecustomizations from './ProductPrecustomizations';
import ProductDescription from './ProductDescription';
import ProductDisplayOptionsTouch from './ProductDisplayOptionsTouch';
import ProductOptions from './ProductOptions';
import ProductGrid from './ProductGrid';
import CartDrawer from './CartDrawer';

// Generic UI Components
// import ComponentTestPleaseRemove from '../shared/ComponentTestPleaseRemove';
import HeaderHider from '../shared/HeaderHider';
import HeaderMobile from '../shared/HeaderMobile';
import Header from '../shared/Header';
import Footer from '../shared/Footer';

// CSS
import '../../../css/components/AppMain.scss';

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

class AppMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    autoBind(this);
  }

  get appBlanketClass() {
    const { sideMenuOpen } = this.props;
    return `App__blanket height--full width--full ${sideMenuOpen ? 'App__blanket--open' : ''}`;
  }

  handleCloseMenu() {
    const { activateSideMenu, activateCartDrawer, cartDrawerOpen, sideMenuOpen } = this.props;
    if (sideMenuOpen) activateSideMenu({ sideMenuOpen: false });
    else if (cartDrawerOpen) activateCartDrawer({ sideMenuOpen: false });
  }

  handleActivateModal() {
    this.props.activateModal({ modalId: ModalConstants.SIGN_UP_MODAL });
  }

  render() {
    const {
      breakpoint,
      cartDrawerOpen,
      productTitle,
      sideMenuOpen,
    } = this.props;

    return (
      <Motion
        style={{
          opacity: spring(
              sideMenuOpen || cartDrawerOpen ? 25 : 0, AppConstants.ANIMATION_CONFIGURATION,
          ),
          x: spring(cartDrawerOpen ? -500 : 0, AppConstants.ANIMATION_CONFIGURATION),
        }}
      >
        {({ opacity, x }) =>
          <div className="AppMain__wrapper">
            <div
              className="AppMain height--full"
              style={{ transform: `translateX(${x}px)` }}
            >
              <div
                className={this.appBlanketClass}
                onClick={this.handleCloseMenu}
                style={{
                  opacity: opacity / 100,
                  visibility: opacity !== 0 ? 'visible' : 'hidden',
                }}
              />
              { breakpoint === 'mobile' || breakpoint === 'tablet' ?
                <HeaderHider>
                  <HeaderMobile headerTitle={productTitle} />
                </HeaderHider>
                :
                <Header />
              }

              { /* <ComponentTestPleaseRemove /> */ }

              <div className="layout-container App--mt-normal">
                { breakpoint === 'mobile' || breakpoint === 'tablet'
                  ? <ProductDisplayOptionsTouch />
                  : <ProductOptions />
                }
              </div>

              <div className="layout-container">
                <div className="grid-2_sm-1 AppMain__product-info">
                  <div className="col grid-middle">
                    <ProductDescription />
                  </div>
                  <div className="col grid-middle">
                    <ProductPrecustomizations />
                  </div>
                </div>
              </div>

              <div className="layout-container App--mb-normal">
                { breakpoint === 'mobile' || breakpoint === 'tablet'
                  ? null
                  : <ProductGrid />
                }
              </div>

              <Footer />
            </div>
            <div
              className="CartDrawer__wrapper"
              style={{ transform: `translateX(${500 - (x * -1)}px)` }}
            >
              <CartDrawer />
            </div>
          </div>
      }
      </Motion>
    );
  }
}

AppMain.propTypes = {
  // Redux Props
  activateCartDrawer: PropTypes.func.isRequired,
  activateSideMenu: PropTypes.func.isRequired,
  activateModal: PropTypes.func.isRequired,
  cartDrawerOpen: PropTypes.bool,
  productTitle: PropTypes.string,
  sideMenuOpen: PropTypes.bool,
  // Decorator Props
  breakpoint: PropTypes.string.isRequired,
  // winWidth: PropTypes.number.isRequired,
};

AppMain.defaultProps = {
  cartDrawerOpen: false,
  productTitle: '',
  sideMenuOpen: false,
};

export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(AppMain));
