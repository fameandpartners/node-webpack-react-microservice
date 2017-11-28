import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Utilities
// import { accumulateCustomizationSelections, calculateSubTotal } from '../../utilities/pdp';
// import { sizeProfilePresence } from '../../utilities/pdpValidations';
// import noop from '../../libs/noop';
// import win from '../../polyfills/windowPolyfill';

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
// import { LOADING_IDS } from '../../constants/AppConstants';
// import CustomizationConstants from '../../constants/CustomizationConstants';
// import ModalConstants from '../../constants/ModalConstants';
//
// // temp. helpers (for Rails merge)
// import { addToCart } from '../../utilities/cart-helper';

function stateToProps() {
  return {};
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
    return '$226';
  }

  handleAddToBagCallback() {

    // TODO: Do something like this
    // const {
    //   activateCartDrawer,
    //   setAppLoadingState,
    //   setCartContents,
    // } = this.props;
    // req.end((err, res) => {
    //   setAppLoadingState({ loadingId: null });
    //   if (err) {
    //     // eslint-disable-next-line
    //     return console.warn('error adding something to the cart', err);
    //   }
    //
    //   // eslint-disable-next-line
    //   if (win && win.__data) { // we are in old PDP, this needs to be removed ASAP
    //     win.location = '/checkout';
    //   }
    //
    //   setCartContents({ cart: res.body });
    //   activateCartDrawer({ cartDrawerOpen: true });
    //   return null;
    // });
  }

  /**
   * Handles adding item to cart
   */
  handleAddToBag() {
    console.log('clicking add to bag!!!');

    // TODO: SOMETHING LIKE THIS
    // const {
    //   addToCartLoading,
    //   auSite,
    //   activateModal,
    //   activateCustomizationDrawer,
    //   breakpoint,
    //   $$customizationState,
    //   $$productState,
    //   heightValue,
    //   isActive,
    //   sizeValue,
    //   setAppLoadingState,
    //   setSizeProfileError,
    // } = this.props;
    // if (!isActive || addToCartLoading) { return; }
    //
    // if (!sizeProfilePresence(sizeValue, heightValue)) {
    //   setSizeProfileError({
    //     heightError: !heightValue,
    //     sizeError: !sizeValue,
    //   });
    //   if (breakpoint === 'mobile' || breakpoint === 'tablet') {
    //     activateModal({ modalId: ModalConstants.SIZE_SELECTION_MODAL });
    //   } else {
    //     activateCustomizationDrawer({
    //       productCustomizationDrawer: CustomizationConstants.SIZE_CUSTOMIZE,
    //     });
    //   }
    // } else {
    //   const lineItem = accumulateCustomizationSelections({ $$customizationState,
    //   $$productState });
    //   setAppLoadingState({ loadingId: LOADING_IDS.ADD_TO_CART_LOADING });
    //   this.handleAddToBagCallback(addToCart(lineItem, auSite));
    // }
  }

  generateText() {
    if (this.props.showTotal) {
      return `${this.subTotal()} - Add to Bag`;
    }

    return 'Add to Bag';
  }

  render() {
    const { addToCartLoading } = this.props;
    return (
      <Button
        tall
        isLoading={addToCartLoading}
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
  addToCartLoading: PropTypes.bool,
};

AddToCartButton.defaultProps = {
  showTotal: true,
  addToCartLoading: false,
};

export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(AddToCartButton));
