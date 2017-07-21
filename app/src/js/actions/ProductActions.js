import ProductConstants from '../constants/ProductConstants';

export function activateColorDrawer({ isActive }) {
  return {
    type: ProductConstants.ACTIVATE_COLOR_DRAWER,
    isActive,
  };
}

export function selectProductColor({ color }) {
  return {
    type: ProductConstants.SELECT_PRODUCT_COLOR,
    color,
  };
}

export default {
  activateColorDrawer,
  selectProductColor,
};
