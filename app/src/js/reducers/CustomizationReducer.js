import Immutable from 'immutable';
import CustomizationConstants from '../constants/CustomizationConstants';
import { UNITS } from '../constants/PDPConstants';

export const $$initialState = Immutable.fromJS({
  // String ['COLOR_CUSTOMIZE', 'STYLE_CUSTOMIZE', 'SIZE_PROFILE']
  productCustomizationDrawer: CustomizationConstants.COLOR_CUSTOMIZE,

  // Bool
  productCustomizationDrawerOpen: false,

  // String ['cm', 'inch']
  temporaryMeasurementMetric: UNITS.INCH,
  selectedMeasurementMetric: UNITS.INCH,

  // Number
  temporaryHeightValue: null,
  selectedHeightValue: null,


  // ObjectOf({
  //   id: String,
  //   name: String,
  //   centsTotal: Number,
  //   hexValue: String,
  //   patternUrl,
  // })
  selectedColor: null,

  // TODO: IF we figure out a way to untangle previous addons,
  // we should have a flat representation of selections here
  // // ObjectOf({
  // //   id: String,
  // //   description: String,
  // // })
  // selectedCustomizations: {},


  // Number
  temporaryDressSize: null,
  selectedDressSize: null,

  selectedStyleAddonOptions: [],

  // Addon area
  addons: {
    // Marry previous customizations to addons
    addonLayerImages: [],
    selectedAddonImageLayers: [],
    addonOptions: [],
    baseImages: [],
    baseSelected: null,
    addonsLayersComputed: [],
    addonsBasesComputed: [],
  },

  // This is eventually what we have to make
  // size_id:86
  // color_id:25
  // variant_id:51459
  // making_options_ids:
  // height_value:59
  // height_unit:inch
  // customizations_ids[]:
  // dress_variant_id:51460
  //
  // More params
  // size_id:34
  // color_id:25
  // variant_id:51459
  // making_options_ids:
  // height_value:193
  // height_unit:cm
  // customizations_ids[]:4473
  // customizations_ids[]:4474
  // customizations_ids[]:4475
  // dress_variant_id:51461
});

export default function CartReducer($$state = $$initialState, action = null) {
  switch (action.type) {
    // GENERAL
    case CustomizationConstants.ACTIVATE_CUSTOMIZATION_DRAWER: {
      return $$state.merge({
        productCustomizationDrawer: action.productCustomizationDrawer,
        productCustomizationDrawerOpen: action.isActive,
      });
    }
    case CustomizationConstants.CHANGE_CUSTOMIZATION_DRAWER: {
      return $$state.merge({
        productCustomizationDrawer: action.productCustomizationDrawer,
      });
    }
    // COLOR
    case CustomizationConstants.SELECT_PRODUCT_COLOR: {
      return $$state.merge({
        selectedColor: action.color,
      });
    }
    // HEIGHT
    case CustomizationConstants.UPDATE_MEASUREMENT_METRIC: {
      if (action.selectedMeasurementMetric) {
        return $$state.merge({
          temporaryMeasurementMetric: action.selectedMeasurementMetric,
          selectedMeasurementMetric: action.selectedMeasurementMetric,
        });
      }
      return $$state.merge({
        temporaryMeasurementMetric: action.temporaryMeasurementMetric,
      });
    }
    case CustomizationConstants.UPDATE_HEIGHT_SELECTION: {
      if (action.selectedHeightValue) {
        return $$state.merge({
          selectedHeightValue: action.selectedHeightValue,
          temporaryHeightValue: action.selectedHeightValue,
        });
      }
      return $$state.merge({
        temporaryHeightValue: action.temporaryHeightValue,
      });
    }
    case CustomizationConstants.UPDATE_DRESS_SIZE_SELECTION: {
      if (action.selectedDressSize) {
        return $$state.merge({
          selectedDressSize: action.selectedDressSize,
          temporaryDressSize: action.selectedDressSize,
        });
      }

      return $$state.merge({
        temporaryDressSize: action.temporaryDressSize,
      });
    }
    // STYLE
    case CustomizationConstants.SET_ACTIVE_ADDON_IMAGE_LAYERS: {
      return $$state.merge({
        addons: $$state.get('addons').merge({ selectedAddonImageLayers: action.addonImageLayers }),
      });
    }
    case CustomizationConstants.SET_ADDON_BASE_LAYER: {
      return $$state.merge({
        addons: $$state.get('addons').merge({ baseSelected: action.baseSelected }),
      });
    }
    case CustomizationConstants.SET_STYLE_ADDON_OPTIONS: {
      return $$state.merge({
        addons: $$state.get('addons').merge({ addonOptions: action.addonOptions }),
      });
    }
    default: {
      return $$state;
    }
  }
}
