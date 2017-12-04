import Immutable from 'immutable';
import { assign } from 'lodash';

import FilterSortConstants from '../constants/CollectionFilterSortConstants';
import { updateExternalLegacyFilters } from '../utilities/CollectionFilterSortUtilities';

function generateSizes() {
  let sizes = [];
  for (let i = 0; i <= 22; i += 2) {
    sizes = sizes.concat({
      id: `size-${i}`,
      value: i,
    });
  }
  return sizes;
}

function generateDressLengths() {
  const lengths = [
    {
      id: 'mini',
      name: 'Mini',
      value: 'mini',
    },
    {
      id: 'midi',
      name: 'Midi',
      value: 'midi',
    },
    {
      id: 'knee',
      name: 'Knee',
      value: 'knee',
    },
    {
      id: 'ankle',
      name: 'Ankle',
      value: 'ankle',
    },
    {
      id: 'maxi',
      name: 'Maxi',
      value: 'maxi',
    },
  ];
  return lengths;
}

export const $$initialState = Immutable.fromJS({
  $$colors: [],
  $$dressLengths: generateDressLengths(),
  $$sizes: generateSizes(),
  $$bodyShapes: [],
  $$bodyStyles: [],
  fastMaking: false,
  page: 1,
  sort: 'newest',
  selectedColors: [],
  selectedDressSize: null,
  selectedDressLengths: [],
  selectedSizes: [],
  selectedPrices: [],
  selectedShapes: [],
  selectedStyles: [],
  temporaryFilters: {
    sort: 'newest',
    selectedColors: [],
    selectedDressSize: null,
    selectedDressLengths: [],
    selectedSizes: [],
    // temporaryFilters is populating the object with the same keys as normal filters,
    // it is a simple way to temporaily save filters without applying them via ajax call
    // fastMaking, order,
    // selectedColors,
    // selectedDressSize,
    // selectedDressLengths,
    // selectedPrices,
    // selectedShapes, etc..
  },
});

export default function CollectionFilterSortReducer($$state = $$initialState, action = null) {
  switch (action.type) {
    case FilterSortConstants.APPLY_TEMPORARY_FILTERS: {
      return $$state.merge(action.temporaryFilters);
    }
    case FilterSortConstants.CLEAR_ALL_COLLECTION_FILTERS: {
      return $$state.merge(FilterSortConstants.FILTER_DEFAULTS);
    }
    case FilterSortConstants.ORDER_PRODUCTS_BY: {
      return $$state.merge({
        order: action.order,
      });
    }
    case FilterSortConstants.SET_FAST_MAKING: {
      return $$state.merge({
        fastMaking: action.fastMaking,
      });
    }
    case FilterSortConstants.SET_SELECTED_COLORS: {
      return $$state.merge({
        selectedColors: action.selectedColors,
      });
    }
    case FilterSortConstants.SET_SELECTED_PRICES: {
      return $$state.merge({
        selectedPrices: action.selectedPrices,
      });
    }
    case FilterSortConstants.SET_SELECTED_SHAPES: {
      return $$state.merge({
        selectedShapes: action.selectedShapes,
      });
    }
    case FilterSortConstants.SET_SELECTED_STYLES: {
      return $$state.merge({
        selectedStyles: action.selectedStyles,
      });
    }
    case FilterSortConstants.SET_TEMPORARY_FILTERS: {
      return $$state.merge({
        temporaryFilters: action.temporaryFilters,
      });
    }
    case FilterSortConstants.HYDRATE_FILTERS_FROM_URL: {
      return $$state.merge(assign({},
        action.queryObj,
        { temporaryFilters: action.queryObj },
      ));
    }
    // NO MANIPULATION
    case FilterSortConstants.UPDATE_EXTERNAL_LEGACY_FILTERS: {
      const updatedFilters = $$state.merge(action.update);
      updateExternalLegacyFilters(updatedFilters.toJS());
      return $$state;
    }
    default: {
      return $$state;
    }
  }
}
