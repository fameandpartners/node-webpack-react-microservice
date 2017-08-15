import ProductConstants from '../constants/ProductConstants';
import StyleConstants from '../constants/StyleConstants';

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

// ADDON MANIPULATIONS
export function setAddonOptions(addonOptions) {
  return { type: StyleConstants.SET_ADDON_OPTIONS, addonOptions };
}

export function setActiveAddonImageLayers(addonImageLayers) {
  return { type: StyleConstants.SET_ACTIVE_ADDON_IMAGE_LAYERS, addonImageLayers };
}

export function setAddonBaseLayer(baseSelected) {
  return { type: StyleConstants.SET_ADDON_BASE_LAYER, baseSelected };
}

export default {
  activateColorDrawer,
  changeCustomizationDrawer,
  selectProductColor,
};
