import Immutable from 'immutable';
import ProductConstants from '../constants/ProductConstants';

export const $$initialState = Immutable.fromJS({
  // Number
  basePrice: null,

  // ArrayOf({
  //   smallImg: String,
  //   productId: String,
  //   productLink: String
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
  // id: String,
  // meta: Object,
  // hexValue
  // })
  productColors: [],

  // String
  productDescription: null,

  // String
  productTitle: null,

  // ArrayOf({
  // smallImg: String,
  // bigImg: String
  // })
  productImages: [],

  // String
  modelDescription: null,

  //
});

export default function AppReducer($$state = $$initialState, action = null) {
  switch (action.type) {
    case ProductConstants.SELECT_COLOR: {
      return $$state.merge({
        sideMenuOpen: action.sideMenuOpen,
      });
    }
    default: {
      return $$state;
    }
  }
}
