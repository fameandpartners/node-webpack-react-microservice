import CustomizationConstants from '../constants/CustomizationConstants';
import StyleConstants from '../constants/StyleConstants';

export function activateColorDrawer({ isActive }) {
  return {
    type: CustomizationConstants.ACTIVATE_COLOR_DRAWER,
    isActive,
  };
}

export function changeCustomizationDrawer({ productCustomizationDrawer }) {
  return {
    type: CustomizationConstants.CHANGE_CUSTOMIZATION_DRAWER,
    productCustomizationDrawer,
  };
}

export function selectProductColor({ color }) {
  return {
    type: CustomizationConstants.SELECT_PRODUCT_COLOR,
    color,
  };
}

// ADDON MANIPULATIONS
export function setAddonOptions(addonOptions) {
  return { type: StyleConstants.SET_STYLE_ADDON_OPTIONS, addonOptions };
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
