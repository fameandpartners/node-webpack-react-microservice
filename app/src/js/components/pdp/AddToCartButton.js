/* eslint-disable import/no-unresolved, import/extensions, import/no-extraneous-dependencies, max-len */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
// import { formatCustomizationIds } from '@common/utils/render-url-helper';

// Utilities
import { accumulateCustomizationSelections, calculateSubTotal } from '../../utilities/pdp';
import { sizeProfilePresence } from '../../utilities/pdpValidations';
import noop from '../../libs/noop';
import win from '../../polyfills/windowPolyfill';
import Analytics from '../../utilities/analytics';

// Breakpoint Decoration
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

// Actions
import * as AppActions from '../../actions/AppActions';
import * as CartActions from '../../actions/CartActions';
import * as CustomizationActions from '../../actions/CustomizationActions';
import * as ModalActions from '../../actions/ModalActions';

// UI
import Button from '../generic/Button';

// Constants
import { LOADING_IDS } from '../../constants/AppConstants';
import CustomizationConstants from '../../constants/CustomizationConstants';
import ModalConstants from '../../constants/ModalConstants';

// temp. helpers (for Rails merge)
import { addToCart } from '../../utilities/cart-helper';

// CSS
import '../../../css/components/AddToCartButton.scss';

function stateToProps(state) {
  const selectedColor = state.$$customizationState.get('selectedColor');
  const selectedStyleCustomizations = state.$$customizationState.get('selectedStyleCustomizations').toJS();
  const addonOptions = state.$$customizationState.get('addons').get('addonOptions').toJS();

  return {
    // APP
    auSite: state.$$appState.get('siteVersion').toLowerCase() === 'australia',
    addToCartLoading: state.$$appState.get('loadingId') === LOADING_IDS.ADD_TO_CART_LOADING,
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
  const { activateModal } = bindActionCreators(ModalActions, dispatch);
  const { setAppLoadingState } = bindActionCreators(AppActions, dispatch);

  const {
    activateCartDrawer,
    addItemToCart,
    setCartContents,
  } = bindActionCreators(CartActions, dispatch);
  const {
    setSizeProfileError,
    activateCustomizationDrawer,
  } = bindActionCreators(CustomizationActions, dispatch);

  return {
    activateCartDrawer,
    activateModal,
    addItemToCart,
    setCartContents,
    setAppLoadingState,
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

  handleAddToBagCallback(req) {
    const {
      activateCartDrawer,
      setAppLoadingState,
      setCartContents,
    } = this.props;
    req.end((err, res) => {
      setAppLoadingState({ loadingId: null });
      if (err) {
        // eslint-disable-next-line
        return console.warn('error adding something to the cart', err);
      }

      // eslint-disable-next-line
      if (win && win.__data) { // we are in old PDP, this needs to be removed ASAP
        win.location = '/checkout';
      }

      setCartContents({ cart: res.body });
      activateCartDrawer({ cartDrawerOpen: true });
      return null;
    });
  }

  /**
   * Handles adding item to cart
   */
  handleAddToBag() {
    const {
      addToCartLoading,
      auSite,
      activateModal,
      activateCustomizationDrawer,
      breakpoint,
      $$customizationState,
      $$productState,
      heightValue,
      isActive,
      sizeValue,
      setAppLoadingState,
      setSizeProfileError,
    } = this.props;
    if (!isActive || addToCartLoading) { return; }

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
      setAppLoadingState({ loadingId: LOADING_IDS.ADD_TO_CART_LOADING });
      this.handleAddToBagCallback(addToCart(lineItem, auSite));
      // GA Tracking

      const productId = $$productState.get('sku').toLowerCase();
      const colorOrFabric = $$customizationState.get('selectedColor').get('name');

      // const customizations = $$customizationState.get('addons').get('addonOptions').toJS();
      // const selectedCustomizationsIds = $$customizationState.get('selectedStyleCustomizations').toArray();
      // const selectedCustomizations = customizations.filter(c => selectedCustomizationsIds.indexOf(c.id) > -1);
      // spree doesn't return the name
      // const customizationNames = selectedCustomizations.map(c => c.name);

      // const pidPart = formatCustomizationIds([...customizationNames, colorOrFabric]);


      Analytics.addToCart({
        id: productId,
        productCentsBasePrice: lineItem.productCentsBasePrice,
        productTitle: lineItem.productTitle,
        productVariantId: `${productId}~${colorOrFabric}`,
      });
    }
  }

  handleAddButtonClick() {
    this.handleAddToBag();
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
    const { addToCartLoading, isActive } = this.props;

    return (
      <Button
        tall
        isLoading={addToCartLoading}
        disabled={!isActive}
        uppercase={isActive}
        text={this.generateText()}
        handleClick={this.handleAddButtonClick}
        className={classnames(
          'AddToCartButton',
        )}
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
  addToCartLoading: PropTypes.bool,
  $$productState: PropTypes.object.isRequired,
  $$customizationState: PropTypes.object.isRequired,
  colorCentsTotal: PropTypes.number,
  expressMakingSelected: PropTypes.bool,
  isActive: PropTypes.bool.isRequired,
  productCentsBasePrice: PropTypes.number.isRequired,
  selectedAddonOptions: PropTypes.array,
  // Redux Actions
  // addItemToCart: PropTypes.func.isRequired,
  activateCartDrawer: PropTypes.func.isRequired,
  activateCustomizationDrawer: PropTypes.func,
  activateModal: PropTypes.func,
  setAppLoadingState: PropTypes.func.isRequired,
  heightValue: PropTypes.number,
  setSizeProfileError: PropTypes.func.isRequired,
  setCartContents: PropTypes.func.isRequired,
  sizeValue: PropTypes.number,
  // Decorator Props
  breakpoint: PropTypes.string,
};

AddToCartButton.defaultProps = {
  addToCartLoading: null,
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
