import Immutable from 'immutable';
import queryString from 'query-string';
import { assign } from 'lodash';
import AppConstants, { QUERY_PARAMS } from '../constants/AppConstants';
import win from '../polyfills/windowPolyfill';

export const $$initialState = Immutable.fromJS({
  defaultValue: [],
  siteVersion: 'us',
  sideMenuOpen: false,
  queryStr: null,
  queryParams: {},
});

function generateQueryParms(queryUpdateObj) {
  return queryString.stringify(queryUpdateObj);
}

function setURLQueryParams(queryStr) {
  if (win.history.pushState) {
    const newurl = `${win.location.protocol}//${win.location.host}${win.location.pathname}?${queryStr}`;
    // TODO: @elgrecode IF we don't want to add a history state we can use replaceState
    win.history.pushState({ path: newurl }, '', newurl);
  }
}

export default function AppReducer($$state = $$initialState, action = null) {
  switch (action.type) {
    case AppConstants.SET_SHAREABLE_QUERY_PARAMS: {
      const queryParams = assign({}, {
        [QUERY_PARAMS.color]: action.color,
        [QUERY_PARAMS.customizations]: action.customizations,
      });
      const queryStr = generateQueryParms(queryParams);
      setURLQueryParams(queryStr);
      return $$state.merge({ queryParams, queryStr });
    }
    case AppConstants.ACTIVATE_SIDE_MENU: {
      return $$state.merge({
        sideMenuOpen: action.sideMenuOpen,
      });
    }
    default: {
      return $$state;
    }
  }
}
