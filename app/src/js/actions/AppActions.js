import AppConstants from '../constants/AppConstants';

export function activateSideMenu({ sideMenuOpen }) {
  return {
    type: AppConstants.ACTIVATE_SIDE_MENU,
    sideMenuOpen,
  };
}

export function activateCartDrawer({ cartDrawerOpen }) {
  return {
    type: AppConstants.ACTIVATE_CART_DRAWER,
    cartDrawerOpen,
  };
}

export default {
  activateSideMenu,
  activateCartDrawer,
};
