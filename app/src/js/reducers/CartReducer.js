import Immutable from 'immutable';
import CartConstants from '../constants/CartConstants';

export const $$initialState = Immutable.fromJS({
  // TODO: @elgrecode Each of these individual line items will have a generated CODE
  // that will be used to generate unique urls
  // ArrayOf({
  //   generatedId: ????
  //   productCentsBasePrice: Number,
  //   productTitle: String,
  //   color: ObjectOf({
  //     id: String,
  //     name: String,
  //     centsTotal: Number,
  //     hexValue: String
  //   }),
  //   addons: ObjectOf({
  //    ????????????
  //   },
  //   subTotal: Number,
  //   quantity: Number
  // })
  lineItems: [],
});

export default function CartReducer($$state = $$initialState, action = null) {
  switch (action.type) {
    case CartConstants.ADD_ITEM_TO_CART: {
      return $$state.merge({
        lineItems: $$state.get('lineItems').concat(action.lineItem),
      });
    }
    default: {
      return $$state;
    }
  }
}
