import Immutable from 'immutable';
import CustomizationConstants from '../constants/CustomizationConstants';

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
});

export default function ProductReducer($$state = $$initialState, action = null) {
  switch (action.type) {
    case CustomizationConstants.ACTIVATE_COLOR_DRAWER: {
      return $$state.merge({
        productCustomizationDrawer: CustomizationConstants.COLOR_CUSTOMIZE,
        productCustomizationDrawerOpen: action.isActive,
      });
    }
    default: {
      return $$state;
    }
  }
}
