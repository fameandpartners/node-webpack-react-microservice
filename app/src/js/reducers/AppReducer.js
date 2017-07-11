import Immutable from 'immutable';
import AppConstants from '../constants/AppConstants';

export const $$initialState = Immutable.fromJS({
  cartDrawerOpen: false,
  defaultValue: [],
  sideMenuOpen: false,
});

export default function AppReducer($$state = $$initialState, action = null) {
  switch (action.type) {
    case AppConstants.ACTIVATE_CART_DRAWER: {
      return $$state.merge({
        cartDrawerOpen: action.cartDrawerOpen,
      });
    }
    case AppConstants.ACTIVATE_SIDE_MENU: {
      return $$state.merge({
        sideMenuOpen: action.sideMenuOpen,
      });
    }
    default: {
      return $$state;
    }
  }
}
