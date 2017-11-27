import CartConstants from '../constants/CartConstants';

export function addItemToCart({ lineItem }) {
  return {
    type: CartConstants.ADD_ITEM_TO_CART,
    lineItem,
  };
}

export function setCartContents({ cart }) {
  return {
    type: CartConstants.SET_CART_CONTENTS,
    cart,
  };
}

export function activateCartDrawer({ cartDrawerOpen }) {
  return {
    type: CartConstants.ACTIVATE_CART_DRAWER,
    cartDrawerOpen,
  };
}

export default {
  addItemToCart,
};
