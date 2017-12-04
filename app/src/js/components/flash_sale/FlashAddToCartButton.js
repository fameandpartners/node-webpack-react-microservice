import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Services
import FlashSaleService from '../../services/FlashSaleService';

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

// CSS
import '../../../css/components/FlashSaleAddToCartButton.scss';

// Constants
// import { LOADING_IDS } from '../../constants/AppConstants';
// import CustomizationConstants from '../../constants/CustomizationConstants';
// import ModalConstants from '../../constants/ModalConstants';
//
// // temp. helpers (for Rails merge)
// import { addToCart } from '../../utilities/cart-helper';

function stateToProps(state) {
  const lineItem = state.$$flashSaleState.get('$$lineItem').toJS();
  const cartItems = state.$$cartState.toJS().lineItems;

  return {
    lineItem,
    lineItemId: lineItem ? lineItem.id : null,
    cartItems,
  };
}

function dispatchToProps(dispatch) {
  const { activateModal } = bindActionCreators(ModalActions, dispatch);
  const {
    setAppLoadingState,
    setErrorCode,
  } = bindActionCreators(AppActions, dispatch);

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
    setErrorCode,
    setCartContents,
    setAppLoadingState,
    setSizeProfileError,
    activateCustomizationDrawer,
  };
}


class FlashSaleAddToCartButton extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  subTotal() {
    const { lineItem } = this.props;
    return lineItem.current_price;
  }

  handleAddToBagCallback(req) {
    const {
      activateCartDrawer,
      setAppLoadingState,
      setCartContents,
      setErrorCode,
    } = this.props;

    req.end((err, res) => {
      setAppLoadingState({ loadingId: null });
      if (err) {
        setErrorCode({ errorCode: res.statusCode });
        // eslint-disable-next-line
        return console.warn('error adding something to the cart', err);
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
    const { lineItemId } = this.props;
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
    // }
    this.handleAddToBagCallback(
      FlashSaleService.postFlashSaleItem(lineItemId),
    );
  }

  generateText() {
    if (this.props.showTotal) {
      return `${this.subTotal()} - Add to Bag`;
    }

    return 'Add to Bag';
  }

  itemInCart() {
    const {
      lineItemId,
      cartItems,
    } = this.props;

    if (cartItems.filter(i => i.id === lineItemId).length > 0) {
      return true;
    }

    return false;
  }

  render() {
    const { addToCartLoading } = this.props;

    if (this.itemInCart()) {
      return (
        <h2 className="ItemInCart__message">
          This dress is already in your cart.
        </h2>
      );
    }

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
FlashSaleAddToCartButton.propTypes = {
  // Passed Props
  showTotal: PropTypes.bool,
  // Redux Props
  lineItem: PropTypes.number,
  lineItemId: PropTypes.number,
  cartItems: PropTypes.array,
  addToCartLoading: PropTypes.bool,
  // Redux Funcs
  activateCartDrawer: PropTypes.func.isRequired,
  setAppLoadingState: PropTypes.func.isRequired,
  setCartContents: PropTypes.func.isRequired,
  setErrorCode: PropTypes.func.isRequired,
};

FlashSaleAddToCartButton.defaultProps = {
  showTotal: true,
  addToCartLoading: false,
  lineItem: null,
  lineItemId: null,
  cartItems: [],
};

// eslint-disable-next-line
export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(FlashSaleAddToCartButton));
