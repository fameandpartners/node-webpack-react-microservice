import { formatCents } from './accounting';

export function calculateSubTotal({
  colorCentsTotal = 0,
  productCentsBasePrice = 0,
  selectedAddonOptions = [],
}) {
  console.log('productCentsBasePrice', productCentsBasePrice);
  console.log('colorCentsTotal', colorCentsTotal);
  const customizationStyleCents = selectedAddonOptions
    .reduce((prev, curr) => prev + parseInt(curr.price.money.fractional, 10), 0);

  return formatCents(
    parseInt(colorCentsTotal, 10) + customizationStyleCents + productCentsBasePrice,
    0,
  );
}

export default {
  calculateSubTotal,
};
