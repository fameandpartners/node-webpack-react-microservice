// import { assign, find } from 'lodash';

function transformBridesmaidColors(colorsData) {
  const colorValArray = colorsData;
  return colorValArray.map((c) => {
    const colorHex = c.color_hex || '';
    const hasPatternImage = colorHex ? colorHex.indexOf('.') > -1 : false;
    const cfPath = process.env.CLOUDFRONT_BASE_PATH || 'https://dekbm9314em3c.cloudfront.net';
    const ASSET_BASE_PATH = '/assets/product-color-images';

    return {
      id: c.color_id,
      // name: optionValue.name,
      presentation: c.color_name,
      hexValue: hasPatternImage ? '' : colorHex,
      patternUrl: hasPatternImage ? `${cfPath}${ASSET_BASE_PATH}/${colorHex}` : '',
    };
  });
}

export default {
  transformBridesmaidColors,
};
