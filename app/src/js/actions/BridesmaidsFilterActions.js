import BridesmaidsFilterConstants from '../constants/BridesmaidsFilterConstants';

export function hydrateFiltersFromURL(queryObj) {
  return {
    type: BridesmaidsFilterConstants.HYDRATE_FILTERS_FROM_URL,
    queryObj,
  };
}

export function selectFilterColor({ selectedColor, temporaryColor }) {
  return {
    type: BridesmaidsFilterConstants.SELECT_FILTER_COLOR,
    selectedColor,
    temporaryColor,
  };
}

export function selectFilterSilhouette({ selectedSilhouette, temporarySilhouette }) {
  return {
    type: BridesmaidsFilterConstants.SELECT_FILTER_SILHOUETTE,
    selectedSilhouette,
    temporarySilhouette,
  };
}

export function selectFilterLength({ selectedLength, temporaryLength }) {
  return {
    type: BridesmaidsFilterConstants.SELECT_FILTER_LENGTH,
    selectedLength,
    temporaryLength,
  };
}

export function updateFilterTopDetails({ selectedTopDetails, temporaryTopDetails }) {
  return {
    type: BridesmaidsFilterConstants.UPDATE_FILTER_TOP_DETAILS,
    selectedTopDetails,
    temporaryTopDetails,
  };
}

export default {
  hydrateFiltersFromURL,
  selectFilterColor,
  selectFilterSilhouette,
  selectFilterLength,
  updateFilterTopDetails,
};