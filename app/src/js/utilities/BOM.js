import queryString from 'query-string';
import { find } from 'lodash';
import { QUERY_PARAMS } from '../constants/AppConstants';

// polyfills
import win from '../polyfills/windowPolyfill';

export function extractAndWhitelistQueryStringCustomizations(colors, addonOptions) {
  const queryStringCustomizations = {
    color: colors[0],
    customizations: [],
  };

  if (!win.isMockWindow && win.location.search) {
    const parsed = queryString.parse(win.location.search);

    // COLOR
    const foundColor = (parsed[QUERY_PARAMS.color])
      ? find(colors, { id: parseInt(parsed[QUERY_PARAMS.color], 10) })
      : null;
    queryStringCustomizations.color = foundColor || colors[0];

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
