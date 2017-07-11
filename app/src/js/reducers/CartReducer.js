import Immutable from 'immutable';
import CartConstants from '../constants/CartConstants';

export const $$initialState = Immutable.fromJS({
  // ArrayOf({
  //   id: String,
  //   color: String,
  //   subTotal: Number,
  //   quanitty: Number
  // })
  lineItems: [],
});

export default function CartReducer($$state = $$initialState, action = null) {
  switch (action.type) {
    case CartConstants.ADD_ITEM_TO_CART: {
      return $$state.merge({
        lineItems: $$state.get('lineItems').concat(action.item),
      });
    }
    default: {
      return $$state;
    }
  }
}
