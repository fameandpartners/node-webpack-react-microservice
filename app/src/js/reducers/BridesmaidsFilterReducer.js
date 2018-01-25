import Immutable from 'immutable';
import { find } from 'lodash';
import BridesmaidsFilterConstants from '../constants/BridesmaidsFilterConstants';


export const $$initialState = Immutable.fromJS({
  temporaryColor: null,
  selectedColor: null,

  temporarySilhouette: null,
  selectedSilhouette: null,

  temporaryLength: null,
  selectedLength: [],

  temporaryTopDetails: null,
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

function findSilhouetteByName(name, { $$state }) {
  const foundSilhouette = find($$state.get('$$bridesmaidsFilterSilhouettes').toJS(), { name });
  return foundSilhouette || null;
}

function findLengthByName(name, { $$state }) {
  const foundLength = find($$state.get('$$bridesmaidsFilterLengths').toJS(), { name });
  return foundLength || null;
}

function findTopDetailsByName(topDetails, { $$state }) {
  let foundTopDetails = [];
  if (topDetails && topDetails.length) {
    topDetails.forEach((name) => {
      const foundDetail = find($$state.get('$$bridesmaidsFilterTopDetails').toJS(), { name });
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
      if (action.selectedColor) {
        return $$state.merge({ selectedColor: action.selectedColor });
      }

      return $$state.merge({ temporaryColor: action.temporaryColor });
    }

    // SILHOUETTE
    case BridesmaidsFilterConstants.SELECT_FILTER_SILHOUETTE: {
      if (action.selectedSilhoutte) {
        return $$state.merge({ selectedSilhouette: action.selectedSilhouette });
      }

      return $$state.merge({ temporarySilhouette: action.temporarySilhouette });
    }

    // LENGTH
    case BridesmaidsFilterConstants.SELECT_FILTER_LENGTH: {
      if (action.selectedLength) {
        return $$state.merge({ selectedLength: action.selectedLength });
      }

      return $$state.merge({ temporaryLength: action.temporaryLength });
    }

    // TOP DETAILS
    case BridesmaidsFilterConstants.UPDATE_FILTER_TOP_DETAILS: {
      if (action.selectedTopDetails) {
        return $$state.merge({ selectedTopDetails: action.selectedTopDetails });
      }

      return $$state.merge({ temporaryTopDetails: action.temporaryTopDetails });
    }

    // HYDRATING SELECTED FILTERS
    case BridesmaidsFilterConstants.HYDRATE_BRIDESMAID_FILTERS_FROM_URL: {
      const color = findColorByPresentation(action.queryObj.selectedColor, { $$state });
      const silhouette = findSilhouetteByName(action.queryObj.selectedSilhouette, { $$state });
      const length = findLengthByName(action.queryObj.selectedLength, { $$state });
      const details = findTopDetailsByName(action.queryObj.selectedTopDetails, { $$state });

      return $$state.merge({
        temporaryColor: color,
        selectedColor: color,
        temporarySilhouette: silhouette,
        selectedSilhouette: silhouette,
        temporaryLength: length,
        selectedLength: length,
        temporaryTopDetails: details,
        selectedTopDetails: details,
      });
    }

    default: {
      return $$state;
    }
  }
}
