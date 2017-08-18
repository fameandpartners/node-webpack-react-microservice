import Immutable from 'immutable';
import CustomizationConstants from '../constants/CustomizationConstants';
import { UNITS } from '../constants/PDPConstants';

export const $$initialState = Immutable.fromJS({
  // String ['COLOR_CUSTOMIZE', 'STYLE_CUSTOMIZE', 'SIZE_PROFILE']
  productCustomizationDrawer: CustomizationConstants.COLOR_CUSTOMIZE,

  // Bool
  productCustomizationDrawerOpen: false,

  // String ['cm', 'inch']
  temporaryMeasurementMetric: null,
  selectedMeasurementMetric: UNITS.INCH,

  // Number
  temporaryHeightId: null,
  selectedHeightId: null,

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

  // ObjectOf({
  //   id: String,
  //   description: String,
  // })
  selectedCustomizations: null,

  // ObjectOf({
  //   id: String,
  //   description: String,
  // })
  selectedSize: null,

  selectedStyleAddonOptions: [],

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
    case CustomizationConstants.SELECT_PRODUCT_COLOR: {
      return $$state.merge({
        selectedColor: action.color,
      });
    }
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
      if (action.selectedHeightId && action.selectedHeightValue) {
        return $$state.merge({
          selectedHeightId: action.selectedHeightId,
          selectedHeightValue: action.selectedHeightValue,
          temporaryHeightId: action.selectedHeightId,
          temporaryHeightValue: action.selectedHeightValue,
        });
      }
      return $$state.merge({
        temporaryHeightId: action.temporaryHeightId,
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
    default: {
      return $$state;
    }
  }
}
