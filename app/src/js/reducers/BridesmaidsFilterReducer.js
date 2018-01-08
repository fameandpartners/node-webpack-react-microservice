import Immutable from 'immutable';
import BridesmaidsFilterConstants from '../constants/BridesmaidsFilterConstants';

export const $$initialState = Immutable.fromJS({

  temporaryColor: {
    id: 82,
    name: 'champagne',
    presentation: 'Champagne',
    hexValue: '#EFE4DC',
    patternUrl: '',
  },
  temporarySilhouette: {
    id: 2,
    name: 'Column',
    description: 'Slim-fitting with a straight narrow shape',
    image: 'http://via.placeholder.com/175x400',
  },
  temporaryLength: {
    id: 5,
    name: 'Ankle',
    image: 'http://via.placeholder.com/125x300',
  },
  temporaryTopDetails: [
    {
      id: 3,
      name: 'Open Neckline',
      image: 'http://via.placeholder.com/150x200',
    },
    {
      id: 4,
      name: 'Shoulder Coverage',
      image: 'http://via.placeholder.com/150x200',
    },
  ],
});

export default function BridesmaidsFilterReducer($$state = $$initialState, action = null) {
  switch (action.type) {

    // COLOR
    case BridesmaidsFilterConstants.SELECT_FILTER_COLOR: {
      if (action.selectedColor) {
        return $$state.merge({
          temporaryColor: action.selectedColor,
          selectedColor: action.selectedColor,
        });
      }
      return $$state.merge({ temporaryColor: action.temporaryColor });
    }

    // SILHOUETTE
    case BridesmaidsFilterConstants.SELECT_FILTER_SILHOUETTE: {
      if (action.selectedSilhouette) {
        return $$state.merge({
          temporarySilhouette: action.selectedSilhouette,
          selectedSilhouette: action.selectedSilhouette,
        });
      }
      return $$state.merge({ temporarySilhouette: action.temporarySilhouette });
    }

    // LENGTH
    case BridesmaidsFilterConstants.SELECT_FILTER_LENGTH: {
      if (action.selectedLength) {
        return $$state.merge({
          temporaryLength: action.selectedLength,
          selectedLength: action.selectedLength,
        });
      }
      return $$state.merge({ temporaryLength: action.temporaryLength });
    }

    // TOP DETAILS
    case BridesmaidsFilterConstants.UPDATE_FILTER_TOP_DETAILS: {
      if (action.selectedTopDetails) {
        return $$state.merge({
          temporaryTopDetails: action.selectedTopDetails,
          selectedTopDetails: action.selectedTopDetails,
        });
      }
      return $$state.merge({ temporaryTopDetails: action.temporaryTopDetails });
    }

    default: {
      return $$state;
    }
  }
}
