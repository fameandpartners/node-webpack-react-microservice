/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies */

import Immutable from 'immutable';
import cartResponseToCart from '@common/transforms/cartResponseToCart.ts';
import CartConstants from '../constants/CartConstants';


export const $$initialState = Immutable.fromJS({
  cartDrawerOpen: false,
  items: [],
});


export default function CartReducer($$state = $$initialState, action = null) {
  switch (action.type) {
    case CartConstants.ACTIVATE_CART_DRAWER: {
      return $$state.merge({
        cartDrawerOpen: action.cartDrawerOpen,
      });
    }
    // TODO: REMOVE
    case CartConstants.ADD_ITEM_TO_CART: {
      const cart = cartResponseToCart(action.cart);
      return $$state.merge(cart);
    }
    case CartConstants.SET_CART_CONTENTS: {
      const cart = cartResponseToCart(action.cart);
      return $$state.merge(cart);
    }
    default: {
      return $$state;
    }
  }
}
