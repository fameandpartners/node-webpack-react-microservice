/* eslint-disable max-len */
import CustomizationConstants from '../constants/CustomizationConstants';
// import StyleConstants from '../constants/StyleConstants';

// export function activateColorDrawer({ isActive }) {
//   return {
//     type: CustomizationConstants.ACTIVATE_COLOR_DRAWER,
//     isActive,
//   };
// }
//
// export function activateCustomizationDrawer({ isActive = true, productCustomizationDrawer }) {
//   return {
//     type: CustomizationConstants.ACTIVATE_CUSTOMIZATION_DRAWER,
//     isActive,
//     productCustomizationDrawer,
//   };
// }
//
// export function changeCustomizationDrawer({ productCustomizationDrawer }) {
//   return {
//     type: CustomizationConstants.CHANGE_CUSTOMIZATION_DRAWER,
//     productCustomizationDrawer,
//   };
// }
//
// export function selectProductColor({ color }) {
//   return {
//     type: CustomizationConstants.SELECT_PRODUCT_COLOR,
//     color,
//   };
// }

// ADDON MANIPULATIONS
// export function setAddonOptions(addonOptions) {
//   return { type: StyleConstants.SET_STYLE_ADDON_OPTIONS, addonOptions };
// }
//
// export function setActiveAddonImageLayers(addonImageLayers) {
//   return { type: StyleConstants.SET_ACTIVE_ADDON_IMAGE_LAYERS, addonImageLayers };
// }
//
// export function setAddonBaseLayer(baseSelected) {
//   return { type: StyleConstants.SET_ADDON_BASE_LAYER, baseSelected };
// }

export function updateCustomizationMetric({ selectedMeasurementMetric, temporaryMeasurementMetric }) {
  return {
    type: CustomizationConstants.UPDATE_MEASUREMENT_METRIC,
    selectedMeasurementMetric,
    temporaryMeasurementMetric,
  };
}

export function updateHeightSelection({
  temporaryHeightId,
  selectedHeightId,
  temporaryHeightValue,
  selectedHeightValue,
}) {
  return {
    type: CustomizationConstants.UPDATE_HEIGHT_SELECTION,
    temporaryHeightId,
    selectedHeightId,
    temporaryHeightValue,
    selectedHeightValue,
  };
}

export function updateDressSizeSelection({ temporaryDressSize, selectedDressSize }) {
  return {
    type: CustomizationConstants.UPDATE_DRESS_SIZE_SELECTION,
    temporaryDressSize,
    selectedDressSize,
  };
}

export default {
  // activateColorDrawer,
  // changeCustomizationDrawer,
  // selectProductColor,
  updateCustomizationMetric,
  updateHeightSelection,
  updateDressSizeSelection,
};
