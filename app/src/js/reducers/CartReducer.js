import Immutable from 'immutable';
import CartConstants from '../constants/CartConstants';

export const $$initialState = Immutable.fromJS({
  cartDrawerOpen: false,
  // ArrayOf({
  //   productCentsBasePrice: Number,
  //   productImage: String,
  //   productTitle: String,
  //   color: ObjectOf({
  //     id: String,
  //     centsTotal: Number,
  //     name: String,
  //     presentation: String,
  //     hexValue: String,
  //     patternUrl: String,
  //   }),
  //   addons: ObjectOf({
  //     id: String,
  //     description: String,
  //     centsTotal: Number,
  //   },
  // })
  lineItems: [],
});

function transformCartDataLineItems(lineItems) {
  return lineItems.map(li => ({
    productCentsBasePrice: (parseInt(li.price.amount, 10) * 100),
    productImage: li.image.original,
    productTitle: li.name,
    color: {
      id: li.color.id,
      centsTotal: li.color.custom_color ? 1600 : 0,
      name: li.color.name,
      presentation: li.color.presentation,
      hexValue: li.color.value,
      patternUrl: li.color.image,
    },
    addons: li.customizations,
  }));
}

function transformCartData(cart) {
  return {
    displayTotal: cart.display_total,
    itemCount: cart.item_count,
    lineItems: transformCartDataLineItems(cart.products),
  };
}

export default function CartReducer($$state = $$initialState, action = null) {
  switch (action.type) {
    case CartConstants.ACTIVATE_CART_DRAWER: {
      return $$state.merge({
        cartDrawerOpen: action.cartDrawerOpen,
      });
    }
    // TODO: REMOVE
    case CartConstants.ADD_ITEM_TO_CART: {
      const cart = transformCartData(action.cart);
      return $$state.merge({
        displayTotal: cart.displayTotal,
        lineItems: cart.lineItems,
      });
    }
    case CartConstants.SET_CART_CONTENTS: {
      const cart = transformCartData(action.cart);
      return $$state.merge({
        displayTotal: cart.displayTotal,
        lineItems: cart.lineItems,
      });
    }
    default: {
      return $$state;
    }
  }
}
