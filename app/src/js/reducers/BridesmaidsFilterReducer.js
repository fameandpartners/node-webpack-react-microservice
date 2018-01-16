import Immutable from 'immutable';
import { find } from 'lodash';
import BridesmaidsFilterConstants from '../constants/BridesmaidsFilterConstants';


export const $$initialState = Immutable.fromJS({
  selectedColor: null,
  selectedSilhouette: null,
  selectedLength: null,
  selectedTopDetails: [],

  // Init State, will not be touched post init
  $$bridesmaidsFilterColors: null,
  $$bridesmaidsFilterSilhouettes: null,
  $$bridesmaidsFilterLengths: null,
  $$bridesmaidsFilterTopDetails: null,
});

function findColorByPresentation(presentation, { $$state }) {
  const foundColor = find($$state.get('$$bridesmaidsFilterColors').toJS(), { presentation });
  return foundColor || null;
}

function findSilhoutteByName(name, { $$state }) {
  const foundSilhoutte = find($$state.get('$$bridesmaidsFilterSilhouettes').toJS(), { name });
  return foundSilhoutte || null;
}

function findLengthByName(name, { $$state }) {
  const foundLength = find($$state.get('$$bridesmaidsFilterLengths').toJS(), { name });
  return foundLength || null;
}

function findTopDetailsByName(topDetails, { $$state }) {
  let foundTopDetails = [];
  if (topDetails && topDetails.length) {
    topDetails.forEach((name) => {
      const foundDetail = find($$state.get('$$bridesmaidsFilterLengths').toJS(), { name });
      if (foundDetail) {
        foundTopDetails = foundTopDetails.concat(foundDetail);
      }
    });
  }

  return foundTopDetails;
}

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

    // HYDRATING SELECTED FILTERS
    case BridesmaidsFilterConstants.HYDRATE_BRIDESMAID_FILTERS_FROM_URL: {
      return $$state.merge({
        selectedColor: findColorByPresentation(action.queryObj.selectedColor, { $$state }),
        selectedSilhouette: findSilhoutteByName(action.queryObj.selectedSilhouette, { $$state }),
        selectedLength: findLengthByName(action.queryObj.selectedLength, { $$state }),
        selectedTopDetails: findTopDetailsByName(action.queryObj.selectedTopDetails, { $$state }),
      });
    }

    default: {
      return $$state;
    }
  }
}
