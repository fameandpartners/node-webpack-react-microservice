import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Motion, spring } from 'react-motion';
import classnames from 'classnames';

// Decorators
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

// Actions
import * as AppActions from '../../actions/AppActions';
import * as CartActions from '../../actions/CartActions';
import * as ModalActions from '../../actions/ModalActions';

// Constants
import AppConstants from '../../constants/AppConstants';
import ModalConstants from '../../constants/ModalConstants';

// PDP specific UI Components
import AddToCartButtonLedgeMobile from './AddToCartButtonLedgeMobile';
import CustomizationButtonLedge from './CustomizationButtonLedge';
import ProductDescription from './ProductDescription';
import ProductDisplayOptionsTouch from './ProductDisplayOptionsTouch';
import ProductOptions from './ProductOptions';
import ProductGrid from './ProductGrid';
import ProductFabricInfo from './ProductFabricInfo';

// import FameDifference from './FameDifference';

// CSS
import '../../../css/components/AppMain.scss';

function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    cartDrawerOpen: state.$$cartState.get('cartDrawerOpen'),
    sideMenuOpen: state.$$appState.get('sideMenuOpen'),
    fabric: state.$$productState.get('fabric').toJS(),
    garmentCareInformation: state.$$productState.get('garmentCareInformation'),
    sku: state.$$productState.get('sku'),
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

  handleCloseMenu() {
    const {
      activateCartDrawer,
      activateSideMenu,
      cartDrawerOpen,
      sideMenuOpen,
    } = this.props;
    activateCartDrawer({ sideMenuOpen: false });
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
      sideMenuOpen,
      fabric,
      garmentCareInformation,
      sku,
    } = this.props;

    return (
      <Motion
        style={{
          opacity: spring(
              sideMenuOpen || cartDrawerOpen ? 25 : 0, AppConstants.ANIMATION_CONFIGURATION,
          ),
        }}
      >
        {({ opacity }) =>
          <div
            className={
            classnames(
              'AppMain__wrapper',
              { 'AppMain__wrapper--cart-drawer-open': cartDrawerOpen },
            )
          }
          >
            <div
              className="AppMain u-height--full"
            >
              <div
                className="App__blanket u-height--full u-width--full"
                onClick={this.handleCloseMenu}
                style={{
                  opacity: opacity / 100,
                  visibility: opacity !== 0 ? 'visible' : 'hidden',
                }}
              />

              { breakpoint === 'mobile' || breakpoint === 'tablet'
                ? <ProductDisplayOptionsTouch />
                : (
                  <div>
                    <ProductOptions />
                  </div>
                )
              }

              <div className="layout-container">
                <div className="grid-2_sm-1 AppMain__product-info">
                  <div className="col grid-middle">
                    <ProductDescription />
                  </div>
                  <div className="col grid-middle">
                    <ProductFabricInfo
                      className="u-center"
                      fabric={fabric}
                      garmentCareInformation={garmentCareInformation}
                    />
                  </div>
                  {
                    sku
                      ? <div className="col grid-middle">
                        <p className="u-center">SKU {sku}</p>
                      </div>
                      : null
                  }
                </div>
              </div>

              { breakpoint === 'mobile' || breakpoint === 'tablet'
                  ? null
                  : (
                    <div className="u-gray-border--top layout-container u-mb-normal">
                      <ProductGrid />
                    </div>
                  )
                }
            </div>


            <div className="u-position--fixed u-width--full u-bottom u-z-index--mid">
              <AddToCartButtonLedgeMobile />
            </div>
            <CustomizationButtonLedge />
          </div>
      }
      </Motion>
    );
  }
}

AppMain.propTypes = {
  // Redux Props
  activateModal: PropTypes.func.isRequired,
  cartDrawerOpen: PropTypes.bool,
  sideMenuOpen: PropTypes.bool,
  fabric: PropTypes.shape({
    id: PropTypes.string,
    smallImg: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  garmentCareInformation: PropTypes.string.isRequired,
  sku: PropTypes.string,

  // Redux Actions
  activateCartDrawer: PropTypes.func.isRequired,
  activateSideMenu: PropTypes.func.isRequired,

  // Decorator Props
  breakpoint: PropTypes.string.isRequired,
};

AppMain.defaultProps = {
  cartDrawerOpen: false,
  sideMenuOpen: false,
  sku: null,
};

export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(AppMain));
