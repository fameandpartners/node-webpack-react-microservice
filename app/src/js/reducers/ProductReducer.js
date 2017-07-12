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
  // title: String,
  // bigImg: String
  // })
  customizations: [],

  // String
  currency: null,

  // ArrayOf({
  //   id: String,
  //   smallImg: String,
  //   descripition: String,
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
  //   centsTotal: Number,
  //   hexValue: String
  // })
  productColors: [],

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
  //   hexValue: String
  // })
  selectedColor: null,

  // ObjectOf({
  //   id: String,
  //   description: String,
  // })
  selectedCustomizations: null,
});

export default function AppReducer($$state = $$initialState, action = null) {
  switch (action.type) {
    case ProductConstants.SELECT_COLOR: {
      return $$state.merge({
        selectedColor: action.color,
      });
    }
    default: {
      return $$state;
    }
  }
}
