// import { assign, find } from 'lodash';

function transformBridesmaidColors(colorsData) {
  const colorValArray = colorsData.table.default;
  return colorValArray.map((c) => {
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

export default {
  transformBridesmaidColors,
};
