import {
  lengthNames,
} from '../constants/BDCustomizationConstants';

export function transformBridesmaidColors(colorsData) {
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

export function determineSelectedLengthStr(selectedCustomizationsArr) {
  let matchStr = '';
  selectedCustomizationsArr.forEach((customizationId) => {
    if (Object.keys(lengthNames).indexOf(customizationId) > -1) { // we have an L customization
      matchStr = lengthNames[customizationId];
    }
  });

  return matchStr;
}

export function transformBridesmaidIncompatabilities(productJSON) {
  if (
    productJSON.available_options
    && productJSON.available_options.table.customizations
    && productJSON.available_options.table.customizations.table.incompatabilities
  ) {
    return productJSON.available_options.table.customizations.table.incompatabilities.map(i => i);
  }
  return [];
}


export default {
  transformBridesmaidColors,
  determineSelectedLengthStr,
  transformBridesmaidColors,
  transformBridesmaidIncompatabilities,
};
