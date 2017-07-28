import Immutable from 'immutable';
import ProductConstants from '../constants/ProductConstants';

export const $$initialState = Immutable.fromJS({

  // ArrayOf({
  //   centsPrice: Number
  //   smallImg: String,
  //   productId: String,
  //   productTitle: String,
  //   url: String,
  // })
  complementaryProducts: [],

  // ArrayOf({
  //   title: String,
  //   bigImg: String
  // })
  customizations: [],

  // String
  currency: null,

  // ObjectOf({
  //   id: String,
  //   smallImg: String,
  //   name: String,
  //   description: String,
  // })
  fabric: null,

  // String
  garmentCareInformation: null,

  // String ['COLOR_CUSTOMIZE', 'STYLE_CUSTOMIZE', 'SIZE_PROFILE']
  productCustomizationDrawer: null,

  // Bool
  productCustomizationDrawerOpen: null,


  // ArrayOf({
  //   id: String,
  //   smallImg: String,
  //   description: String,
  //   preSelectedCustomizations: {}
  // })
  preCustomizations: [],

  // String
  productId: null,

  // Number
  productCentsBasePrice: null,

  // ArrayOf({
  //   id: String,
  //   name: String,
  //   hexValue: String,
  //   patternUrl: String,
  // })
  productDefaultColors: [],

  // Number
  productSecondaryColorCentsPrice: null,

  // ArrayOf({
  //   id: String,
  //   name: String,
  //   hexValue: String,
  //   patternUrl: String,
  // })
  productSecondaryColors: [],

  // String
  productDescription: null,

  // String
  productTitle: null,

  // ArrayOf({
  //   smallImg: String,
  //   bigImg: String
  // })
  productImages: [],

  // String
  modelDescription: null,

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
});

export default function ProductReducer($$state = $$initialState, action = null) {
  switch (action.type) {
    case ProductConstants.ACTIVATE_COLOR_DRAWER: {
      return $$state.merge({
        productCustomizationDrawer: ProductConstants.COLOR_CUSTOMIZE,
        productCustomizationDrawerOpen: action.isActive,
      });
    }
    case ProductConstants.ACTIVATE_CUSTOMIZATION_DRAWER: {
      return $$state.merge({
        productCustomizationDrawerOpen: action.isActive,
      });
    }
    case ProductConstants.CHANGE_CUSTOMIZATION_DRAWER: {
      return $$state.merge({
        productCustomizationDrawer: action.productCustomizationDrawer,
      });
    }
    case ProductConstants.SELECT_PRODUCT_COLOR: {
      return $$state.merge({
        selectedColor: action.color,
      });
    }
    default: {
      return $$state;
    }
  }
}
