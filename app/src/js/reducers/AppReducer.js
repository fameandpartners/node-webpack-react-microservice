import Immutable from 'immutable';
import queryString from 'query-string';
import AppConstants, { QUERY_PARAMS } from '../constants/AppConstants';
import win from '../polyfills/windowPolyfill';

export const $$initialState = Immutable.fromJS({
  defaultValue: [],
  loadingId: null,
  gallerySlideActiveIndex: 0,
  siteVersion: 'us',
  sideMenuOpen: false,
  queryStr: null,
  queryParams: {
    [QUERY_PARAMS.color]: undefined,
    [QUERY_PARAMS.customizations]: undefined,
  },
});

function generateQueryParms(queryUpdateObj) {
  return queryString.stringify(queryUpdateObj);
}

function setURLQueryParams(queryStr) {
  if (win.history.pushState) {
    const baseUrl = `${win.location.protocol}//${win.location.host}${win.location.pathname}`;
    const baseQuery = queryStr ? `?${queryStr}` : '';
    const newUrl = baseUrl + baseQuery;
    win.history.replaceState({ path: newUrl }, '', newUrl);
  }
}

export default function AppReducer($$state = $$initialState, action = null) {
  switch (action.type) {
    case AppConstants.SET_SHAREABLE_QUERY_PARAMS: {
      const oldQueryParams = $$state.get('queryParams').toJS();
      const newQueryParams = {
        [QUERY_PARAMS.color]: action.color
          || oldQueryParams[QUERY_PARAMS.color],
        [QUERY_PARAMS.customizations]: action.customizations
          || oldQueryParams[QUERY_PARAMS.customizations],
      };
      const queryStr = generateQueryParms(newQueryParams);
      setURLQueryParams(queryStr);

      return $$state.merge({ queryParams: newQueryParams, queryStr });
    }
    case AppConstants.ACTIVATE_SIDE_MENU: {
      return $$state.merge({
        sideMenuOpen: action.sideMenuOpen,
      });
    }
    case AppConstants.SET_APP_LOADING_STATE: {
      return $$state.merge({
        loadingId: action.loadingId,
      });
    }
    case AppConstants.SET_GALLERY_SLIDE_ACTIVE_INDEX: {
      return $$state.merge({
        gallerySlideActiveIndex: action.index,
      });
    }
    default: {
      return $$state;
    }
  }
}
