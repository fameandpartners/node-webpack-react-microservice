import Immutable from 'immutable';
import FabricSwatchConstants from '../constants/FabricSwatchConstants';

export const $$initialState = Immutable.fromJS({
  $$availableSwatches: [],
  swatchOrder: [],
});

export default function FabricSwatchReducer($$state = $$initialState, action = null) {
  switch (action.type) {

    case FabricSwatchConstants.UPDATE_FABRIC_SWATCH_ORDER: {
      return $$state.merge({
        swatchOrder: action.swatchOrder,
      });
    }
    default: {
      return $$state;
    }
  }
}
