import { uniq } from 'lodash';
import { lengthNames } from '../constants/BDCustomizationConstants';
import { formatCents } from './accounting';
import { EXPRESS_MAKING_PRICE_CENTS } from '../constants/ProductConstants';

export function removeLengthIdsFromCustomizationIds(customizationIds) {
  const lengthNameKeys = Object.keys(lengthNames);
  return customizationIds.filter(
    id => lengthNameKeys.indexOf(id) === -1,
  );
}

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
  if (customizationIds && customizationIds.length) {
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
    return `${filteredAddonSelections.length} Additions ${reduceCustomizationSelectionPrice({ filteredAddonSelections })}`;
  }
  return null;
}

export function generateCustomizationImage({
  sku = null,
  customizationIds,
  imgSizeStr = '142x142',
  length = 'maxi',
  colorCode = '0001',
}) {
  const BASE_URL = '//assets.fameandpartners.com/renders/composites';
  const SKU = sku;
  const IMG_SIZE = imgSizeStr;
  const SIDE = 'front';
  const CODE_NAME = stringifySortCustomizationCodes(customizationIds);
  const LENGTH = length.toLowerCase();
  const COLOR_CODE = '0001' || colorCode; // color code mapping NOT id

  // We are trying to make a string such as the one below
  // assets.fameandpartners.com/renders/fp_1265/800x800/front-default-maxi-000.png
  // assets.fameandpartners.com/renders/composites
  // /fp-js1007-102/142x142/a5-b21-t64-cheeky-front-0002.png
  return `${BASE_URL}/${SKU}/${IMG_SIZE}/${CODE_NAME}-${LENGTH}-${SIDE}-${COLOR_CODE}.png`;
}

export function bdAccumulateCustomizationSelections({
  $$bdCustomizationState,
  $$customizationState,
  $$productState,
}) {
  const productId = $$productState.get('productId');
  const productTitle = $$productState.get('productTitle');
  // const productImage = $$productState.get('productImages').get(0).get('bigImg');
  const productCentsBasePrice = $$productState.get('productCentsBasePrice');
  const color = $$customizationState.get('selectedColor').toJS();
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
  bdAccumulateCustomizationSelections,
  retrieveBDSelectedAddonOptions,
};
