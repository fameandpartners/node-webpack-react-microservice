import request from 'superagent';
import { serializeObjectIntoQueryParams } from '../utilities/BOM';

// polyfills
import win from '../polyfills/windowPolyfill';

export function transformFilterColors(data) {
  /**
   *  INPUT:
   *   [{
   *    "created_at": String,
   *    "id": Number,
   *    "image_content_type": null,
   *    "image_file_name": null,
   *    "image_file_size": null,
   *    "name": String,
   *    "option_type_id": Number,
   *    "position": Number,
   *    "presentation": String,
   *    "updated_at": String,
   *    "use_in_customisation": Boolean,
   *    "value": String
   *   }]
   *
   *  OUTPUT:
   *   [{
   *    id: Number,
   *    name: String,
   *    presentation: String,
   *    hexValue: String,
   *    patternUrl: String
   *   }]
   */

  const colors = data || [];

  return colors.map((c) => {
    const hasPatternImage = c.patternUrl ? c.patternUrl.indexOf('.') > -1 : false;
    const cfPath = process.env.CLOUDFRONT_BASE_PATH || 'https://dekbm9314em3c.cloudfront.net';
    const ASSET_BASE_PATH = '/assets/product-color-images';

    return {
      id: c.id,
      name: c.name,
      presentation: c.presentation,
      hexValue: hasPatternImage ? '' : c.hexValue,
      patternUrl: hasPatternImage ? `${cfPath}${ASSET_BASE_PATH}/${c.patternUrl}` : '',
    };
  });
}

export function transformFilterSilhouettes(data) {
  return data.options;
}

export function transformFilterLengths(data) {
  return data.options;
}

export function transformFilterTopDetails(data) {
  return data.options;
}

export function loadFilteredResultsPage(data) {
  /**
   * EXPECTED OBJECT:
   *  {
   *    selectedColor: string,
   *    selectedSilhouette: string,
   *    selectedLength: string,
   *    selectedTopDetails: [string]
   *  }
   */

  const filterParamsObj = {
    selectedColor: data.selectedColor.presentation,
    selectedSilhouette: data.selectedSilhouette.name,
    selectedLength: data.selectedLength.name,
    selectedTopDetails: data.selectedTopDetails.map(i => i.name),
  };

  const queryString = serializeObjectIntoQueryParams(filterParamsObj);
  const pathToLoad = `${win.location.origin}/bridesmaids/dresses?${queryString}`;

  win.location = pathToLoad;
}

export function getFilteredResults(searchParams) {
  const csrf = win.document.querySelector('meta[name="csrf-token"]');
  const token = csrf ? csrf.content : '';

  return request
    .get(`/api/v1/bridesmaids${searchParams}`)
    .set('X-CSRF-Token', token)
    .set('Accept', 'application/json');
}
