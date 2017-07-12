import CartConstants from '../constants/CartConstants';

export function addItemToCart({ lineItem }) {
  return {
    type: CartConstants.ADD_ITEM_TO_CART,
    lineItem,
  };
}

// TODO: @elgrecode, figure out if this belongs here
// export function activateCartDrawer({ cartDrawerOpen }) {
//   return {
//     type: AppConstants.ACTIVATE_CART_DRAWER,
//     cartDrawerOpen,
//   };
// }

export default {
  addItemToCart,
};