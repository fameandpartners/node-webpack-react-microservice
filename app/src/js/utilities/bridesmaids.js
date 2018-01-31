import { find, uniq } from 'lodash';
import querystring from 'query-string';

import win from '../polyfills/windowPolyfill';
import { lengthNames } from '../constants/BDCustomizationConstants';
import { formatCents } from './accounting';
import { EXPRESS_MAKING_PRICE_CENTS } from '../constants/ProductConstants';

// Array of customizationIds
export function removeLengthIdsFromCustomizationIds(customizationIds = []) {
  const lengthNameKeys = Object.keys(lengthNames);
  return customizationIds.filter(
    id => lengthNameKeys.indexOf(id) === -1,
  );
}

// Array of Customization Objects
export function removeLengthFromAddons(addons) {
  const lengthNameKeys = Object.keys(lengthNames);
  return addons.filter(
    addon => lengthNameKeys.indexOf(addon.id) === -1,
  );
}

function filterSelectedAddons(addonOptions, selectedCustomizationDetails) {
  return addonOptions
    .filter(a => selectedCustomizationDetails.indexOf(a.id) > -1)
    .map(a => ({
      id: a.id,
      description: a.description,
      centsTotal: a.centsTotal,
    }));
}

export function calculateBDSubTotal({
  colorCentsTotal = 0,
  productCentsBasePrice = 0,
  selectedAddonOptions = [],
  expressMakingSelected = false,
}, currencySymbol = '$') {
  const expressMakingCharge = expressMakingSelected ? EXPRESS_MAKING_PRICE_CENTS : 0;
  const customizationStyleCents = selectedAddonOptions
    .reduce((prev, curr) => prev + parseInt(curr.centsTotal, 10), 0);

  return formatCents(
    (parseInt(colorCentsTotal, 10)
    + customizationStyleCents
    + productCentsBasePrice
    + expressMakingCharge),
    0,
    (currencySymbol || ''),
  );
}

function stringifySortCustomizationCodes(customizationIds) {
  const filteredCustomizations = removeLengthIdsFromCustomizationIds(customizationIds);
  if (filteredCustomizations && filteredCustomizations.length) {
    return uniq(removeLengthIdsFromCustomizationIds(customizationIds).sort()).join('-');
  }

  return 'default';
}

export function reduceCustomizationSelectionPrice({ selectedAddonOptions }) {
  return `+${formatCents(
    selectedAddonOptions.reduce(
      (subTotal, c) =>
      subTotal + parseInt(c.price.money.fractional, 10), 0),
      0,
    )}`;
}

export function retrieveBDSelectedAddonOptions(addonOptions, selectedCustomizationDetails) {
  return addonOptions.filter(a => selectedCustomizationDetails.indexOf(a.id) > -1);
}


export function addonSelectionDisplayText({ selectedAddonOptions }) {
  const filteredAddonSelections = removeLengthFromAddons(selectedAddonOptions);
  if (filteredAddonSelections.length === 1) { // One customization
    return `${filteredAddonSelections[0].description} +${formatCents(parseInt(filteredAddonSelections[0].centsTotal, 10), 0)}`;
  } else if (filteredAddonSelections.length > 1) { // Multiple customizations
    return `${filteredAddonSelections.length} Additions ${reduceCustomizationSelectionPrice({ selectedAddonOptions: filteredAddonSelections })}`;
  }
  return null;
}

export function generateCustomizationImage({
  colorCode,
  customizationIds,
  imgSizeStr = '142x142',
  length = 'maxi',
  side = 'front',
  sku = null,
}) {
  const BASE_URL = '//d1h7wjzwtdym94.cloudfront.net/renders/composites';
  const SKU = sku;
  const IMG_SIZE = imgSizeStr;
  const SIDE = side;
  const CODE_NAME = stringifySortCustomizationCodes(customizationIds);
  const LENGTH = length.toLowerCase();
  const COLOR_CODE = colorCode; // color code mapping NOT id

  // We are trying to make a string such as the one below
  // assets.fameandpartners.com/renders/composites
  // /fp-js1007-102/142x142/a5-b21-t64-cheeky-front-0002.png
  return `${BASE_URL}/${SKU}/${IMG_SIZE}/${CODE_NAME}-${LENGTH}-${SIDE}-${COLOR_CODE}.png`;
}

export function extractAndWhitelistQueryStringBDCustomizations(colors, lengths) {
  const queryStringCustomizations = {
    color: colors[0],
    length: [],
  };

  if (!win.isMockWindow && win.location.search) {
    const lengthKeys = Object.keys(lengths);
    const parsed = querystring.parse(win.location.search);
    // COLOR
    const { presentation } = find(colors, { presentation: parsed.color });

    // Length
    const foundLengthKey = lengthKeys.find(k => lengths[k] === parsed.length);
    const length = lengths[foundLengthKey] || lengths[lengthKeys[0]];

    return {
      color: presentation,
      length,
    };
  }

  return queryStringCustomizations;
}

export function pushFiltersToUrl({ color, id, length }) {
  const query = querystring.stringify({
    color,
    length,
  });
  // win.location.search = query;
  win.history.replaceState(null, '', `${id}?${query}`);
}

export function bdAccumulateCustomizationSelections({
  $$bdCustomizationState,
  $$customizationState,
  $$productState,
}) {
  const defaultColors = $$productState.get('productDefaultColors').toJS();
  const productId = $$productState.get('productId');
  const productTitle = $$productState.get('productTitle');
  // const productImage = $$productState.get('productImages').get(0).get('bigImg');
  const productCentsBasePrice = $$productState.get('productCentsBasePrice');
  const colorPresentation = $$bdCustomizationState.get('selectedBDCustomizationColor');
  const color = defaultColors.find(c => c.presentation === colorPresentation);
  const selectedCustomizationDetails = $$bdCustomizationState.get('selectedCustomizationDetails').toJS();
  const addonOptions = $$customizationState.get('addons').get('addonOptions').toJS();
  const addons = filterSelectedAddons(addonOptions, selectedCustomizationDetails);
  const selectedDressSize = $$customizationState.get('selectedDressSize');
  const selectedHeightValue = $$customizationState.get('selectedHeightValue');
  const selectedMeasurementMetric = $$customizationState.get('selectedMeasurementMetric');

  const expressMaking = $$customizationState.get('expressMakingSelected');
  let expressMakingID = null;
  if (expressMaking) {
    expressMakingID = $$productState.get('makingOptionId');
  }

  return {
    productId,
    // productImage,
    productTitle,
    productCentsBasePrice,
    color,
    addons,
    selectedDressSize,
    selectedHeightValue,
    selectedMeasurementMetric,
    expressMaking,
    expressMakingID,
  };
}

export default {
  calculateBDSubTotal,
  extractAndWhitelistQueryStringBDCustomizations,
  bdAccumulateCustomizationSelections,
  pushFiltersToUrl,
  retrieveBDSelectedAddonOptions,
};
