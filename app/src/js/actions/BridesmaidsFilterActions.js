import BridesmaidsFilterConstants from '../constants/BridesmaidsFilterConstants';

export function hydrateFiltersFromURL(queryObj) {
  return {
    type: BridesmaidsFilterConstants.HYDRATE_BRIDESMAID_FILTERS_FROM_URL,
    queryObj,
  };
}

export function bridesmaidShouldChangePage() {
  return {
    type: BridesmaidsFilterConstants.BRIDESMAID_SHOULD_CHANGE_PAGE,
  };
}

export function saveTemporaryFilterSelections() {
  return {
    type: BridesmaidsFilterConstants.BRIDESMAID_SAVE_TEMPORARY_FILTER_SELECTIONS,
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
  bridesmaidShouldChangePage,
  hydrateFiltersFromURL,
  selectFilterColor,
  selectFilterSilhouette,
  selectFilterLength,
  updateFilterTopDetails,
};
