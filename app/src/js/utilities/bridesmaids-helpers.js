// import request from 'superagent';

// // polyfills
// import win from '../polyfills/windowPolyfill';

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

  const colors = data.table.default || [];

  return colors.map((c) => {
    const optionValue = c.option_value;
    const optionValueVal = optionValue.value || '';
    const hasPatternImage = optionValueVal ? optionValueVal.indexOf('.') > -1 : false;
    const cfPath = process.env.CLOUDFRONT_BASE_PATH || 'https://dekbm9314em3c.cloudfront.net';
    const ASSET_BASE_PATH = '/assets/product-color-images';

    return {
      id: optionValue.id,
      name: optionValue.name,
      presentation: optionValue.presentation,
      hexValue: hasPatternImage ? '' : optionValueVal,
      patternUrl: hasPatternImage ? `${cfPath}${ASSET_BASE_PATH}/${optionValueVal}` : '',
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

export function sendFilterRequest(data) {
  /**
   * EXPECTED OBJECT:
   *  {
   *    selectedColor: 'Charcoal',
   *    selectedSilhouette: 'Column',
   *    selectedLength: 'Knee',
   *    selectedTopDetails: ['Strappy', 'Open Neckline'],
   *  }
   */

  const filterParamsObj = {
    selectedColor: data.selectedColor.presentation,
    selectedSilhouette: data.selectedSilhouette.name,
    selectedLength: data.selectedLength.name,
    selectedTopDetails: data.selectedTopDetails.map(i => i.name),
  };

  console.group('sendFilterRequest()');
  console.log(filterParamsObj);
  console.groupEnd();

  // const csrf = win.document.querySelector('meta[name="csrf-token"]');
  // const token = csrf ? csrf.content : '';

  // return request
  //   .post('SOME/API')
  //   .send(filterParamsObj)
  //   .set('X-CSRF-Token', token)
  //   .set('Accept', 'application/json');
}
