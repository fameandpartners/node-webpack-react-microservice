import queryString from 'query-string';
import { find } from 'lodash';
import { QUERY_PARAMS } from '../constants/AppConstants';

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

export default {
  extractAndWhitelistQueryStringCustomizations,
};
