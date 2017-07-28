import ProductConstants from '../constants/ProductConstants';

export function activateColorDrawer({ isActive }) {
  return {
    type: ProductConstants.ACTIVATE_COLOR_DRAWER,
    isActive,
  };
}

export function activateCustomizationDrawer({ isActive }) {
  return {
    type: ProductConstants.ACTIVATE_CUSTOMIZATION_DRAWER,
    isActive,
  };
}

export function changeCustomizationDrawer({ productCustomizationDrawer }) {
  return {
    type: ProductConstants.CHANGE_CUSTOMIZATION_DRAWER,
    productCustomizationDrawer,
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
  changeCustomizationDrawer,
  selectProductColor,
};
