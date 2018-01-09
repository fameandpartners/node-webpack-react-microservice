import Immutable from 'immutable';
import BridesmaidsFilterConstants from '../constants/BridesmaidsFilterConstants';

export const $$initialState = Immutable.fromJS({
  selectedColor: null,
  selectedSilhouette: null,
  selectedLength: null,
  selectedTopDetails: [],
});

export default function BridesmaidsFilterReducer($$state = $$initialState, action = null) {
  switch (action.type) {

    // COLOR
    case BridesmaidsFilterConstants.SELECT_FILTER_COLOR: {
      return $$state.merge({ selectedColor: action.selectedColor });
    }

    // SILHOUETTE
    case BridesmaidsFilterConstants.SELECT_FILTER_SILHOUETTE: {
      return $$state.merge({ selectedSilhouette: action.selectedSilhouette });
    }

    // LENGTH
    case BridesmaidsFilterConstants.SELECT_FILTER_LENGTH: {
      return $$state.merge({ selectedLength: action.selectedLength });
    }

    // TOP DETAILS
    case BridesmaidsFilterConstants.UPDATE_FILTER_TOP_DETAILS: {
      return $$state.merge({ selectedTopDetails: action.selectedTopDetails });
    }

    default: {
      return $$state;
    }
  }
}
