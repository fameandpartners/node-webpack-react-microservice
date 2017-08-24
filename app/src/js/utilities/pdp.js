import { formatCents } from './accounting';

export function calculateSubTotal({
  colorCentsTotal = 0,
  productCentsBasePrice = 0,
  selectedAddonOptions = [],
}) {
  console.log('productCentsBasePrice', productCentsBasePrice);
  console.log('colorCentsTotal', colorCentsTotal);
  const customizationStyleCents = selectedAddonOptions
    .reduce((prev, curr) => prev + parseInt(curr.centsTotal, 10), 0);

  return formatCents(
    parseInt(colorCentsTotal, 10) + customizationStyleCents + productCentsBasePrice,
    0,
  );
}

function filterSelectedAddons(addonOptions, selectedStyleCustomizations) {
  return addonOptions
    .filter(a => selectedStyleCustomizations.indexOf(a.id) > -1)
    .map(a => ({
      id: a.id,
      description: a.description,
      centsTotal: a.centsTotal,
    }));
}

export function accumulateCustomizationSelections({ $$customizationState, $$productState }) {
  const productId = $$productState.get('productId');
  const productTitle = $$productState.get('productTitle');
  const productCentsBasePrice = $$productState.get('productCentsBasePrice');
  const color = $$customizationState.get('selectedColor').toJS();
  const selectedStyleCustomizations = $$customizationState.get('selectedStyleCustomizations').toJS();
  const addonOptions = $$customizationState.get('addons').get('addonOptions').toJS();
  const addons = filterSelectedAddons(addonOptions, selectedStyleCustomizations);

  return {
    productId,
    productTitle,
    productCentsBasePrice,
    color,
    addons,
  };
}

export default {
  calculateSubTotal,
};
