import BridesmaidsFilterConstants from '../constants/BridesmaidsFilterConstants';

export function hydrateFiltersFromURL(queryObj) {
  return {
    type: BridesmaidsFilterConstants.HYDRATE_FILTERS_FROM_URL,
    queryObj,
  };
}

export function selectProductColor({ selectedColor, temporaryColor }) {
  return {
    type: BridesmaidsFilterConstants.SELECT_PRODUCT_COLOR,
    selectedColor,
    temporaryColor,
  };
}

export default {
  hydrateFiltersFromURL,
  selectProductColor,
};
