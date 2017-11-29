import queryString from 'query-string';
import { find } from 'lodash';
import { QUERY_PARAMS } from '../constants/AppConstants';
import qs from 'qs';

// polyfills
import win from '../polyfills/windowPolyfill';

export function extractAndWhitelistQueryStringCustomizations(defaultColor, colors, addonOptions) {
  const queryStringCustomizations = {
    color: defaultColor || colors[0],
    customizations: [],
  };

  if (!win.isMockWindow && win.location.search) {
    const parsed = queryString.parse(win.location.search);

    // COLOR
    let foundColor = null;
    if (parsed[QUERY_PARAMS.legacyColor]) { // LEGACY COLOR SYSTEM
      foundColor = find(colors, { name: parsed[QUERY_PARAMS.legacyColor] });
    } else if (parsed[QUERY_PARAMS.color]) { // NEW COLOR SYSTEM
      foundColor = find(colors, { id: parseInt(parsed[QUERY_PARAMS.color], 10) });
    }
    queryStringCustomizations.color = foundColor || defaultColor || colors[0];

    // CUSTOMIZATIONS
    const queryCustomizations = parsed[QUERY_PARAMS.customizations];
    const hasQueryCustomizations = !!queryCustomizations;
    if (hasQueryCustomizations) {
      const customizationQueryArr = (Array.isArray(queryCustomizations))
        ? queryCustomizations.map(c => parseInt(c, 10))
        : [parseInt(queryCustomizations, 10)];

      // Now we white list our queryStrCustomizations by acceptable addonOptions
      queryStringCustomizations.customizations =
        addonOptions
          .filter(ao => customizationQueryArr.indexOf(ao.id) > -1)
          .map(ao => ao.id);
    }
  }

  return queryStringCustomizations;
}

export function getUrlParameter(sParam) {
  if (win.isMockWindow) return '';
  const sPageURL = decodeURIComponent(win.location.search.substring(1));
  const sURLVariables = sPageURL.split('&');

  for (let i = 0; i < sURLVariables.length; i += 1) {
    const sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam) { return sParameterName[1]; }
  }
  return '';
}

export function decodeQueryParams() {
  const queryObj = {};
  const queryStrArr = decodeURIComponent(win.location.search.substring(1))
  .replace(/\+/g, ' ')
  .split('&');

  // Loop over each of the queries and build an object
  queryStrArr.forEach((query) => {
    const querySplit = query.split('=');
    let key = querySplit[0];
    const val = querySplit[1];
    key = key ? key.replace(/([^a-z0-9_]+)/gi, '') : undefined; // replace key with acceptable param name

    if (key && val) { // We have an acceptable query string format
      if (!queryObj[key]) { // No previous version
        queryObj[key] = val;
      } else if (Array.isArray(queryObj[key])) { // currently an array, add to it
        queryObj[key] = [...queryObj[key], val];
      } else {
        queryObj[key] = [queryObj[key], val]; // not an array, create one
      }
    }
  });

  return queryObj;
}

export function serializeObjectIntoQueryParams(obj) {
  return qs.stringify(obj);
}


export default {
  extractAndWhitelistQueryStringCustomizations,
};
