import Immutable from 'immutable';
import BDCustomizationConstants from '../constants/BDCustomizationConstants';

export const $$initialState = Immutable.fromJS({
  // Enum String, [
  // 'COLOR_CUSTOMIZE',
  // 'LENGTH_CUSTOMIZE',
  // 'BODICE_CUSTOMIZE',
  // 'STRAPS_SLEEVES_CUSTOMIZE',
  // 'SILHOUTTE_CUSTOMIZE',
  // 'DETAILS_CUSTOMIZE'
  // ]
  activeBDCustomizationHeading: null,

  // // String ['?', '?', '?']
  bdProductCustomizationDrawer: null,

  // // Bool
  productCustomizationDrawerOpen: false,
  //
  // // String ['cm', 'inch']
  // temporaryMeasurementMetric: UNITS.INCH,
  // selectedMeasurementMetric: UNITS.INCH,
  //
  // // Number
  // temporaryHeightValue: null,
  // selectedHeightValue: null,
  //
  //
  // // ObjectOf({
  // //   id: Number,
  // //   name: String,
  // //   centsTotal: Number,
  // //   hexValue: String,
  // //   patternUrl,
  // // })
  // temporaryColor: null,
  // selectedColor: null,
  //
  // // Number
  // temporaryDressSize: null,
  // selectedDressSize: null,
  //
  // // ArrayOf(Number)
  // temporaryStyleCustomizations: [],
  // selectedStyleCustomizations: [],
  //
  // // TODO: V2 This data structure could use some clean up and
  // // is a legacy carry over from previous pdp implementation
  // // ArrayOf({
  // //   addonLayerImages: Array|Null,
  // //   selectedAddonImageLayers: Array,
  // //   addonOptions: Array,
  // //   baseImages: Array|Null,
  // //   isLegacyCADCustomizations: Boolean,
  // //   baseSelected: Object,
  // //   addonsLayersComputed: Array,
  // //   addonsBasesComputed: Array,
  // // })
  // addons: null,
  // expressMakingSelected: false,
});

export default function CartReducer($$state = $$initialState, action = null) {
  switch (action.type) {
    // GENERAL
    case BDCustomizationConstants.SET_BD_CUSTOMIZATION_SECTION: {
      return $$state.merge({
        activeBDCustomizationHeading: action.sectionId,
      });
    }

    case BDCustomizationConstants.BD_ACTIVATE_CUSTOMIZATION_DRAWER: {
      return $$state.merge({
        bdProductCustomizationDrawer: action.bdProductCustomizationDrawer,
        bdProductCustomizationDrawerOpen: action.isActive,
      });
    }
    // case CustomizationConstants.SET_SIZE_PROFILE_ERROR: {
    //   return $$state.merge({
    //     heightError: action.heightError,
    //     sizeError: action.sizeError,
    //   });
    // }
    // case CustomizationConstants.CHANGE_CUSTOMIZATION_DRAWER: {
    //   return $$state.merge({
    //     productCustomizationDrawer: action.productCustomizationDrawer,
    //   });
    // }
    // // COLOR
    // case CustomizationConstants.SELECT_PRODUCT_COLOR: {
    //   if (action.selectedColor) {
    //     return $$state.merge({
    //       temporaryColor: action.selectedColor,
    //       selectedColor: action.selectedColor,
    //     });
    //   }
    //   return $$state.merge({ temporaryColor: action.temporaryColor });
    // }
    // // HEIGHT
    // case CustomizationConstants.UPDATE_MEASUREMENT_METRIC: {
    //   if (action.selectedMeasurementMetric) {
    //     return $$state.merge({
    //       temporaryMeasurementMetric: action.selectedMeasurementMetric,
    //       selectedMeasurementMetric: action.selectedMeasurementMetric,
    //     });
    //   }
    //   return $$state.merge({
    //     temporaryMeasurementMetric: action.temporaryMeasurementMetric,
    //   });
    // }
    // case CustomizationConstants.UPDATE_HEIGHT_SELECTION: {
    //   if (action.selectedHeightValue) {
    //     return $$state.merge({
    //       selectedHeightValue: action.selectedHeightValue,
    //       temporaryHeightValue: action.selectedHeightValue,
    //     });
    //   }
    //   return $$state.merge({
    //     temporaryHeightValue: action.temporaryHeightValue,
    //   });
    // }
    // case CustomizationConstants.UPDATE_DRESS_SIZE_SELECTION: {
    //   if (typeof action.selectedDressSize === 'number') {
    //     return $$state.merge({
    //       selectedDressSize: action.selectedDressSize,
    //       temporaryDressSize: action.selectedDressSize,
    //     });
    //   }
    //
    //   return $$state.merge({
    //     temporaryDressSize: action.temporaryDressSize,
    //   });
    // }
    // case CustomizationConstants.UPDATE_CUSTOMIZATION_STYLE_SELECTION: {
    //   if (action.selectedStyleCustomizations) {
    //     return $$state.merge({
    //       temporaryStyleCustomizations: action.selectedStyleCustomizations,
    //       selectedStyleCustomizations: action.selectedStyleCustomizations,
    //     });
    //   }
    //   return $$state.merge({
    //     temporaryStyleCustomizations: action.temporaryStyleCustomizations,
    //   });
    // }
    // // STYLE
    // case CustomizationConstants.SET_ACTIVE_ADDON_IMAGE_LAYERS: {
    //   return $$state.merge({
    //     addons: $$state.get('addons')
    //     .merge({ selectedAddonImageLayers: action.addonImageLayers }),
    //   });
    // }
    // case CustomizationConstants.SET_ADDON_BASE_LAYER: {
    //   return $$state.merge({
    //     addons: $$state.get('addons').merge({ baseSelected: action.baseSelected }),
    //   });
    // }
    // case CustomizationConstants.SET_EXPRESS_MAKING_STATUS: {
    //   return $$state.merge({
    //     expressMakingSelected: action.status,
    //   });
    // }
    default: {
      return $$state;
    }
  }
}
