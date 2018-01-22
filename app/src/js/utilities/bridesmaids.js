function filterSelectedAddons(addonOptions, selectedCustomizationDetails) {
  return addonOptions
    .filter(a => selectedCustomizationDetails.indexOf(a.id) > -1)
    .map(a => ({
      id: a.id,
      description: a.description,
      centsTotal: a.centsTotal,
    }));
}

function stringifySortCustomizationCodes(customizationIds) {
  if (customizationIds && customizationIds.length) {
    return customizationIds.sort().join('-');
  }

  return 'default';
}

export function retrieveBDSelectedAddonOptions(addonOptions, selectedCustomizationDetails) {
  return addonOptions.filter(a => selectedCustomizationDetails.indexOf(a.id) > -1);
}

export function generateCustomizationImage({
  sku = null,
  customizationIds,
  imgSizeStr = '142x142',
  length = 'maxi',
  colorCode = '000',
}) {
  const BASE_URL = 'assets.fameandpartners.com/renders';
  const SKU = sku;
  const IMG_SIZE = imgSizeStr;
  const SIDE = 'front';
  const CODE_NAME = stringifySortCustomizationCodes(customizationIds);
  const LENGTH = length;
  const COLOR_CODE = colorCode;

  // We are trying to make a string such as the one below
  // assets.fameandpartners.com/renders/fp_1265/800x800/front-default-maxi-000.png
  return `${BASE_URL}/${SKU}/${IMG_SIZE}/${SIDE}-${CODE_NAME}-${LENGTH}-${COLOR_CODE}.png`;
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
  bdAccumulateCustomizationSelections,
  retrieveBDSelectedAddonOptions,
};
