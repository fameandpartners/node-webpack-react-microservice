import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findIndex } from 'lodash';
import noop from '../../libs/noop';

// Actions
import * as FabricSwatchActions from '../../actions/FabricSwatchActions';
import { addToCart } from '../../utilities/cart-helper';
import * as CartActions from '../../actions/CartActions';

// UI Components
import Button from '../generic/Button';
import FabricSwatchProduct from './FabricSwatchProduct';

// Utilities
import win from '../../polyfills/windowPolyfill';

function stateToProps(state) {
  const swatchOrder = state.$$fabricSwatchState.get('swatchOrder');
  const availableSwatches = state.$$fabricSwatchState.get('$$availableSwatches').toJS();

  return {
    availableSwatches,
    swatchOrder,
  };
}

function dispatchToProps(dispatch) {
  const { updateFabricSwatchOrder } = bindActionCreators(FabricSwatchActions, dispatch);
  const {
    activateCartDrawer,
    addItemToCart,
    setCartContents,
  } = bindActionCreators(CartActions, dispatch);
  return {
    updateFabricSwatchOrder,
    activateCartDrawer,
    addItemToCart,
    setCartContents,
  };
}

class BuyFabricSwatch extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleAddToBagCallback(req) {
    const {
      activateCartDrawer,
      setCartContents,
    } = this.props;
    req.end((err, res) => {
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

  handleAddToCartClick() {
    console.log(this.currentOrderToJS());

    this.currentOrderToJS().forEach((swatch) => {
      this.handleAddToBagCallback(addToCart(swatch, ''));
    });
  }

  handleSwatchSelection(swatch) {
    const { updateFabricSwatchOrder } = this.props;
    const currentOrder = this.currentOrderToJS();

    const index = findIndex(currentOrder, { sku: swatch.sku });
    if (index >= 0) {
      updateFabricSwatchOrder({ swatchOrder: [] });
    } else {
      const swatchOrder = [swatch];
      updateFabricSwatchOrder({ swatchOrder });
    }
  }

  isOrdered(swatch) {
    const index = findIndex(this.currentOrderToJS(), { sku: swatch.sku });
    return index >= 0;
  }

  hasOrders() {
    return this.currentOrderToJS().length > 0;
  }

  addToCartButtonText() {
    const currentOrder = this.currentOrderToJS();
    if (currentOrder.length > 0) {
      let totalPrice = 0;
      currentOrder.map(item => (totalPrice += Math.floor(item.price)));
      return `$${totalPrice} - Add to Bag`;
    }
    return 'Add to Bag';
  }

  selectedSwatchText() {
    if (this.props.isMobileDisplay) {
      return '';
    }
    const currentOrder = this.currentOrderToJS();
    const colors = currentOrder.map(item => (item.color_name));
    const colorsText = colors.join(', ');
    if (colors.length > 1) {
      return `${colorsText} Heavy Georgette's`;
    }
    return `${colorsText} Heavy Georgette`;
  }

  currentOrderToJS() {
    const { swatchOrder } = this.props;
    // must convert swatch data objects to JS from format stored in redux,
    // is there a better way to do this?
    return Array.from(swatchOrder).map(item => (item.toJS()));
  }

  render() {
    const { availableSwatches, isMobileDisplay } = this.props;
    const buttonText = this.addToCartButtonText();
    const selectedSwatchText = this.selectedSwatchText();

    return (
      <div>
        <h3 className="FabricSwatchSelectionTitle u-capitalize u-mt--normal u-mb--normal">
          Choose Your Fabric Swatch
        </h3>

        <div className="FabricSwatchListWrapper u-mb--normal">
          {availableSwatches.map(
            (item, key) => (
              <FabricSwatchProduct
                key={key}
                swatch={item}
                handleSwatchSelection={this.handleSwatchSelection}
                isOrdered={this.isOrdered(item)}
              />
            ),
          )}
        </div>

        <div className="FabricSwatchButtonLedge">
          <div className="FabricSwatchButtonContainer">
            <div className="FabricSwatchButtonWrapper">
              {
                this.hasOrders() && isMobileDisplay === false ?
                  <span className="FabricSwatchSelectedText">{selectedSwatchText}</span>
                : null
              }
              <Button
                tall
                text={buttonText}
                handleClick={this.handleAddToCartClick}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BuyFabricSwatch.propTypes = {
  // Redux Properties
  activateCartDrawer: PropTypes.func.isRequired,
  availableSwatches: PropTypes.arrayOf(
    PropTypes.shape({
      variant_id: PropTypes.number,
      product_id: PropTypes.number,
      sku: PropTypes.string,
      color_name: PropTypes.string,
      color_id: PropTypes.number,
      color_hex: PropTypes.string,
      color_image_url: PropTypes.string,
      price: PropTypes.float,
    }),
  ).isRequired,
  swatchOrder: PropTypes.arrayOf(
    PropTypes.shape({
      variant_id: PropTypes.number,
      product_id: PropTypes.number,
      sku: PropTypes.string,
      color_name: PropTypes.string,
      color_id: PropTypes.number,
      color_hex: PropTypes.string,
      color_image_url: PropTypes.string,
      price: PropTypes.float,
    }),
  ),
  updateFabricSwatchOrder: PropTypes.func.isRequired,
  setCartContents: PropTypes.func.isRequired,
  isMobileDisplay: PropTypes.bool,
};

BuyFabricSwatch.defaultProps = {
  availableSwatches: [],
  swatchOrder: [],
  updateFabricSwatchOrder: noop,
  isMobileDisplay: false,
};

export default connect(stateToProps, dispatchToProps)(BuyFabricSwatch);
