import Immutable from 'immutable';
import queryString from 'query-string';
import AppConstants from '../constants/AppConstants';
import win from '../polyfills/windowPolyfill';

export const $$initialState = Immutable.fromJS({
  defaultValue: [],
  siteVersion: 'us',
  sideMenuOpen: false,
  queryStr: null,
});

function generateQueryParms(queryUpdateObj) {
  console.log('queryUpdateObj', queryUpdateObj);
  const QUERY_PARAMS = AppConstants.QUERY_PARAMS;
  // Clean Query params
  return queryString.stringify(
    Object.keys(queryUpdateObj)
    .filter(key => QUERY_PARAMS[key]),
  );
}

function setQueryParams(queryStr) {
  if (win.history.pushState) {
    const newurl = `${win.location.protocol}//${win.location.host}${win.location.pathname}?${queryStr}`;
    win.history.pushState({ path: newurl }, '', newurl);
  }
}


export default function AppReducer($$state = $$initialState, action = null) {
  switch (action.type) {
    case AppConstants.SET_SHAREABLE_QUERY_PARAMS: {
      const queryStr = generateQueryParms(action);
      setQueryParams(queryStr);

      return $$state.merge({
        queryStr,
      });
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
