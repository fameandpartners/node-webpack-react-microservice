import BridesmaidsFilterConstants from '../constants/BridesmaidsFilterConstants';

// eslint-disable-next-line
export function hydrateFiltersFromURL(queryObj) {
  return {
    type: BridesmaidsFilterConstants.HYDRATE_FILTERS_FROM_URL,
    queryObj,
  };
}
