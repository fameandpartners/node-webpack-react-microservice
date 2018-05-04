import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Decorators
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

// Actions
import * as AppActions from '../../actions/AppActions';
import * as ModalActions from '../../actions/ModalActions';

// Constants
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
    selectedColor: state.$$customizationState.get('selectedColor').toJS(),
    defaultFabric: state.$$productState.get('fabric').toJS(),
    hasFabrics: state.$$productState.get('hasFabrics'),
    garmentCareInformation: state.$$productState.get('garmentCareInformation'),
    sku: state.$$productState.get('sku'),
  };
}

function dispatchToProps(dispatch) {
  const actions = bindActionCreators(AppActions, dispatch);
  const modalActions = bindActionCreators(ModalActions, dispatch);

  return {
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

  handleActivateModal() {
    this.props.activateModal({ modalId: ModalConstants.SIGN_UP_MODAL });
  }

  render() {
    const {
      breakpoint,
      defaultFabric,
      garmentCareInformation,
      hasFabrics,
      selectedColor,
      sku,
    } = this.props;

    return (
      <div className="AppMain__wrapper">
        <div
          className="AppMain u-height--full"
        >
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
                  fabric={hasFabrics ? selectedColor : defaultFabric}
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
                <div className="u-gray-border--top layout-container u-mb--normal">
                  <ProductGrid />
                </div>
              )
            }
        </div>


        <div className="u-position--fixed u-width--full u-bottom">
          <AddToCartButtonLedgeMobile />
        </div>
        <CustomizationButtonLedge />
      </div>
    );
  }
}

AppMain.propTypes = {
  // Redux Props
  activateModal: PropTypes.func.isRequired,
  defaultFabric: PropTypes.shape({
    id: PropTypes.string,
    smallImg: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  garmentCareInformation: PropTypes.string.isRequired,
  hasFabrics: PropTypes.bool.isRequired,
  selectedColor: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  sku: PropTypes.string,

  // Decorator Props
  breakpoint: PropTypes.string.isRequired,
};

AppMain.defaultProps = {
  cartDrawerOpen: false,
  sku: null,
};

export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(AppMain));
