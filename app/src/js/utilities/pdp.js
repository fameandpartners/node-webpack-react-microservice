import { formatCents } from './accounting';
import { UNITS } from '../constants/ProductConstants';

export function calculateSubTotal({
  colorCentsTotal = 0,
  productCentsBasePrice = 0,
  selectedAddonOptions = [],
}) {
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

export function sizingDisplayText({
  selectedHeightValue,
  selectedMeasurementMetric,
  selectedDressSize }) {
  let sizingInformation = null;

  if (selectedHeightValue && selectedDressSize) {
    if (selectedMeasurementMetric === UNITS.INCH) {
      // INCH
      const ft = Math.floor(selectedHeightValue / 12);
      const inch = selectedHeightValue % 12;
      sizingInformation = `${ft}ft ${inch}in / ${selectedDressSize}`;
    } else {
      // CM
      sizingInformation = `${selectedHeightValue} ${selectedMeasurementMetric.toLowerCase()} / ${selectedDressSize}`;
    }
  }
  return sizingInformation;
}

export function reduceCustomizationSelectionPrice({ selectedAddonOptions }) {
  return `+${formatCents(
    selectedAddonOptions.reduce(
      (subTotal, c) =>
      subTotal + parseInt(c.price.money.fractional, 10), 0),
      0,
    )}`;
}

export function addonSelectionDisplayText({ selectedAddonOptions }) {
  if (selectedAddonOptions.length === 1) { // One customization
    return `${selectedAddonOptions[0].description} +${formatCents(parseInt(selectedAddonOptions[0].centsTotal, 10), 0)}`;
  } else if (selectedAddonOptions.length > 1) { // Multiple customizations
    return `${selectedAddonOptions.length} Additions ${reduceCustomizationSelectionPrice({ selectedAddonOptions })}`;
  }
  return null;
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

export function transformProductDefaultColors({ colors = {} }) {
  const defaultColors = colors.table.default || [];
  // "created_at": String,
  // "id": Number,
  // "image_content_type": null,
  // "image_file_name": null,
  // "image_file_size": null,
  // "name": String,
  // "option_type_id": Number,
  // "position": Number,
  // "presentation": String,
  // "updated_at": String,
  // "use_in_customisation": Boolean,
  // "value": String
  //   ****** into ******
  // ArrayOf({
  //   id: Number,
  //   name: String,
  //   presentation: String,
  //   hexValue: String,
  //   patternUrl: String,
  // })
  return defaultColors.map((c) => {
    const optionValue = c.option_value;
    return {
      id: optionValue.id,
      name: optionValue.name,
      presentation: optionValue.presentation,
      hexValue: optionValue.value,
      patternUrl: 'this-does-not-exist-yet.png',
    };
  });
}

export function transformProductSecondaryColors({ colors = {} }) {
  const secondaryColors = colors.table.extra || [];
  // "created_at": String,
  // "id": Number,
  // "image_content_type": null,
  // "image_file_name": null,
  // "image_file_size": null,
  // "name": String,
  // "option_type_id": Number,
  // "position": Number,
  // "presentation": String,
  // "updated_at": String,
  // "use_in_customisation": Boolean,
  // "value": String
  //   ****** into ******
  // ArrayOf({
  //   id: Number,
  //   name: String,
  //   presentation: String,
  //   hexValue: String,
  //   patternUrl: String,
  // })
  return secondaryColors.map((c) => {
    const optionValue = c.option_value;
    return {
      id: optionValue.id,
      name: optionValue.name,
      presentation: optionValue.presentation,
      hexValue: optionValue.value,
      patternUrl: 'this-does-not-exist-yet.png',
    };
  });
}

export function transformProductId({ id = 'dress-id' }) {
  //   "id": Number,
  //   ****** into ******
  //   id: Number,
  return id;
}

export function transformProductImages(images) {
  //   "id": Number,
  //   "url": String,
  //   "url_product": String,
  //   "color_id": 25,
  //   "height": Number,
  //   "width": Number,
  //   "alt": String
  //   ****** into ******
  //   id: Number,
  //   colorId: Number,
  //   smallImg: String,
  //   bigImg: String
  //   height: Number
  //   width: Number
  //   position: Number
  return images.map(i => ({
    id: i.id,
    colorId: i.color_id,
    smallImg: i.url_product,
    bigImg: i.url,
    height: i.height,
    width: i.width,
    position: i.position,
  }));
}

export default {
  addonSelectionDisplayText,
  calculateSubTotal,
  sizingDisplayText,
  reduceCustomizationSelectionPrice,
  // Transforms
  transformProductId,
  transformProductImages,
};
