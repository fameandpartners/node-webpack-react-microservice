import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Utilities
import { accumulateCustomizationSelections, calculateSubTotal } from '../../utilities/pdp';
import { sizeProfilePresence } from '../../utilities/pdpValidations';
import noop from '../../libs/noop';

// Breakpoint Decoration
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

// Actions
import * as CartActions from '../../actions/CartActions';
import * as CustomizationActions from '../../actions/CustomizationActions';
import * as ModalActions from '../../actions/ModalActions';

// UI
import Button from '../generic/Button';

// Constants
import CustomizationConstants from '../../constants/CustomizationConstants';
import ModalConstants from '../../constants/ModalConstants';

// temp. helpers (for Rails merge)
import { addToCart } from '../../utilities/cart-helper';

function stateToProps(state) {
  const selectedColor = state.$$customizationState.get('selectedColor');
  const selectedStyleCustomizations = state.$$customizationState.get('selectedStyleCustomizations').toJS();
  const addonOptions = state.$$customizationState.get('addons').get('addonOptions').toJS();

  return {
    // APP
    auSite: state.$$appState.get('siteVersion').toLowerCase() === 'australia',

    $$productState: state.$$productState,
    $$customizationState: state.$$customizationState,
    colorCentsTotal: selectedColor.get('centsTotal'),
    productCentsBasePrice: state.$$productState.get('productCentsBasePrice'),
    isActive: state.$$productState.get('isActive'),
    selectedAddonOptions: addonOptions.filter(a => selectedStyleCustomizations.indexOf(a.id) > -1),
    heightValue: state.$$customizationState.get('temporaryHeightValue'),
    sizeValue: state.$$customizationState.get('selectedDressSize'),
    expressMakingSelected: state.$$customizationState.get('expressMakingSelected'),
  };
}

function dispatchToProps(dispatch) {
  const { activateCartDrawer, addItemToCart } = bindActionCreators(CartActions, dispatch);
  const { activateModal } = bindActionCreators(ModalActions, dispatch);
  const {
    setSizeProfileError,
    activateCustomizationDrawer,
  } = bindActionCreators(CustomizationActions, dispatch);

  return {
    activateCartDrawer,
    activateModal,
    addItemToCart,
    setSizeProfileError,
    activateCustomizationDrawer,
  };
}


class AddToCartButton extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  subTotal() {
    const {
      productCentsBasePrice,
      colorCentsTotal,
      selectedAddonOptions,
      expressMakingSelected,
    } = this.props;
    return calculateSubTotal({
      productCentsBasePrice,
      colorCentsTotal,
      selectedAddonOptions,
      expressMakingSelected,
    });
  }

  /**
   * Handles adding item to cart
   */
  handleAddToBag() {
    const {
      auSite,
      activateModal,
      activateCustomizationDrawer,
      breakpoint,
      $$customizationState,
      $$productState,
      heightValue,
      isActive,
      sizeValue,
      setSizeProfileError,
    } = this.props;
    if (!isActive) { return; }
    if (!sizeProfilePresence(sizeValue, heightValue)) {
      setSizeProfileError({
        heightError: !heightValue,
        sizeError: !sizeValue,
      });
      if (breakpoint === 'mobile' || breakpoint === 'tablet') {
        activateModal({ modalId: ModalConstants.SIZE_SELECTION_MODAL });
      } else {
        activateCustomizationDrawer({
          productCustomizationDrawer: CustomizationConstants.SIZE_CUSTOMIZE,
        });
      }
    } else {
      const lineItem = accumulateCustomizationSelections({ $$customizationState, $$productState });
      addToCart(lineItem, auSite);
    }
  }

  generateText() {
    const { isActive, showTotal } = this.props;
    if (!isActive) {
      return 'Sorry, this product is currently unavailable';
    }
    if (showTotal) {
      return `${this.subTotal()} - Add to Bag`;
    }

    return 'Add to Bag';
  }

  render() {
    const { isActive } = this.props;
    return (
      <Button
        tall
        disabled={!isActive}
        uppercase={isActive}
        className="AddToCartButton"
        text={this.generateText()}
        handleClick={this.handleAddToBag}
      />
    );
  }
}

/*  eslint-disable react/forbid-prop-types */
AddToCartButton.propTypes = {
  // Passed Props
  showTotal: PropTypes.bool,
  // Redux Props
  auSite: PropTypes.bool.isRequired,
  $$productState: PropTypes.object.isRequired,
  $$customizationState: PropTypes.object.isRequired,
  colorCentsTotal: PropTypes.number,
  productCentsBasePrice: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  selectedAddonOptions: PropTypes.array,
  // Redux Actions
  // addItemToCart: PropTypes.func.isRequired,
  setSizeProfileError: PropTypes.func.isRequired,
  activateCustomizationDrawer: PropTypes.func,
  activateModal: PropTypes.func,
  heightValue: PropTypes.number,
  sizeValue: PropTypes.number,
  breakpoint: PropTypes.string,
  expressMakingSelected: PropTypes.bool,
};

AddToCartButton.defaultProps = {
  colorCentsTotal: 0,
  selectedAddonOptions: [],
  showTotal: true,
  sizeValue: null,
  heightValue: null,
  activateCustomizationDrawer: noop,
  activateModal: noop,
  breakpoint: '',
  expressMakingSelected: false,
};

export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(AddToCartButton));
