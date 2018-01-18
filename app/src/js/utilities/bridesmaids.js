function filterSelectedAddons(addonOptions, selectedCustomizationDetails) {
  return addonOptions
    .filter(a => selectedCustomizationDetails.indexOf(a.id) > -1)
    .map(a => ({
      id: a.id,
      description: a.description,
      centsTotal: a.centsTotal,
    }));
}

export function retrieveBDSelectedAddonOptions(addonOptions, selectedCustomizationDetails) {
  return addonOptions.filter(a => selectedCustomizationDetails.indexOf(a.id) > -1);
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
