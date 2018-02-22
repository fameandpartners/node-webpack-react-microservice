/* eslint-disable max-len */
/* eslint-disable no-throw-literal */
import { assign, find } from 'lodash';
import { formatCents } from './accounting';
import { UNITS, EXPRESS_MAKING_PRICE_CENTS } from '../constants/ProductConstants';
import { sizeProfilePresence } from './pdpValidations';

export function calculateSubTotal({
  colorCentsTotal = 0,
  productCentsBasePrice = 0,
  selectedAddonOptions = [],
  expressMakingSelected = false,
}, currencySymbol = '$') {
  const expressMakingCharge = expressMakingSelected ? EXPRESS_MAKING_PRICE_CENTS : 0;
  const customizationStyleCents = selectedAddonOptions
    .reduce((prev, curr) => prev + parseInt(curr.centsTotal, 10), 0);

  return formatCents(
    (parseInt(colorCentsTotal, 10) + customizationStyleCents + productCentsBasePrice + expressMakingCharge),
    0,
    (currencySymbol || ''),
  );
}

export function retrieveSelectedAddonOptions(addonOptions, selectedStyleCustomizations) {
  return addonOptions.filter(a => selectedStyleCustomizations.indexOf(a.id) > -1);
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
  selectedDressSize,
  auSite }) {
  let sizingInformation = null;

  const REGION = auSite ? 'AU' : 'US';

  if (sizeProfilePresence(selectedDressSize, selectedHeightValue)) {
    if (selectedMeasurementMetric === UNITS.INCH) {
      // INCH
      const ft = Math.floor(selectedHeightValue / 12);
      const inch = selectedHeightValue % 12;
      sizingInformation = `${ft}ft ${inch}in / ${REGION} ${selectedDressSize}`;
    } else {
      // CM
      sizingInformation = `${selectedHeightValue} ${selectedMeasurementMetric.toLowerCase()} / ${REGION} ${selectedDressSize}`;
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
  const productImage = $$productState.get('productImages').get(0).get('bigImg');
  const productCentsBasePrice = $$productState.get('productCentsBasePrice');
  const color = $$customizationState.get('selectedColor').toJS();
  const selectedStyleCustomizations = $$customizationState.get('selectedStyleCustomizations').toJS();
  const addonOptions = $$customizationState.get('addons').get('addonOptions').toJS();
  const addons = filterSelectedAddons(addonOptions, selectedStyleCustomizations);
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
    productImage,
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

// ************* DATA MODEL TRANSFORMS ******************* //
// ******************************************************* //
function generateDefaultCode(length) {
  const code = [];
  for (let i = 0; i < length; i += 1) {
    code.push('*');
  }
  return code;
}

function computeLayerCode(url, sentinel, length = 4) {
  // [ID]-base-??
  // Example "1038-base-01.png"
  // We want to parse this and have computed a code for each file name
  // 1038-base-01.png will create [1, 1, *, *]
  // 1038-base-23.png will create [*, *, 1, 1]
  // 1038-base.png will create    [*, *, *, *]
  const defaultCode = generateDefaultCode(length);
  const filename = url.substring(url.lastIndexOf('/') + 1);
  const rgxp = new RegExp(`${sentinel}-(.*).png`, 'g');
  const matches = rgxp.exec(filename);

  if (matches && matches[1]) {
    matches[1].split('').forEach(i => defaultCode[i] = '1');
  }
  return defaultCode;
}

export function transformAddons(productJSON) {
  const addons = productJSON.product.available_options.table.addons;
  const allCustomizations = productJSON.product.available_options.table.customizations.table.all;

  if (addons) { // NEW CAD SYSTEM, We have layers to our cads
    return assign({}, {
      // Marry previous customizations to addons
      addonLayerImages: addons.layer_images,
      selectedAddonImageLayers: [],
      addonOptions: allCustomizations.map(
        (ao, i) => {
          let mappedImageLayer = null;
          for (let j = 0; j < addons.layer_images.length; j += 1) {
            if (addons.layer_images[j].bit_array[i]) {
              mappedImageLayer = addons.layer_images[j];
            }
          }

          return assign({}, {
            id: ao.table.id,
            description: ao.table.name,
            group: ao.table.group,
            position: mappedImageLayer ? mappedImageLayer.position : '',
            price: ao.table.display_price,
            centsTotal: parseInt(ao.table.display_price.money.fractional, 10),
            img: mappedImageLayer ? mappedImageLayer.url : '',
            active: false,
          });
        },
      ),
      baseImages: addons.base_images,
      baseSelected: null,
      addonsLayersComputed: addons.layer_images.map(({ url }) => computeLayerCode(url, 'layer')),
      addonsBasesComputed: addons.base_images.map(({ url }) => computeLayerCode(url, 'base')),
    });
  }

  return {
    // Building LegacyCADS in the same manner
    isLegacyCADCustomizations: true,
    addonOptions: allCustomizations.map(ao => assign({}, {
      id: ao.table.id,
      description: ao.table.name,
      group: ao.table.group,
      position: ao.table.position,
      price: ao.table.display_price,
      centsTotal: parseInt(ao.table.display_price.money.fractional, 10),
      img: ao.table.image,
    })),
  };
}

export function transformProductCentsBasePrice({ prices = {} }) {
  // "original_amount": String,
  //   ****** into ******
  // productCentsBasePrice: Number
  // })
  const productCentsBasePrice = parseInt(prices.original_amount, 10) * 100;
  return productCentsBasePrice;
}

export function transformProductCurrency({ prices = {} }) {
  // "currency": String,
  //   ****** into ******
  // currency: String
  // })
  return prices.currency;
}

export function transformProductComplementaryProducts({ complementary_products: complementaryProducts = [] }) {
  // UNKNOWN
  //   ****** into ******
  // centsPrice: Number,
  // smallImg: String,
  // productId: String,
  // productTitle: String,
  // url: String,
  // })

  return complementaryProducts.map(item => ({
    centsPrice: (parseInt(item.price.price.amount, 10) * 100),
    smallImg: item.product.product.image_link,
    productId: item.product.product.id,
    productTitle: item.product.product.name,
    url: item.product.product.relative_url_path,
  }));
}

function removeCommaWhiteSpace(word) {
  return word.replace(/ +,/g, ', ');
}

export function transformProductDescription({ description }) {
  // "description": String,
  //   ****** into ******
  // productDescription: String
  // })
  return removeCommaWhiteSpace(description);
}

export function transformProductColors(data, key) {
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

  const colors = data.product.colors.table[key] || [];
  let price = 0;

  if (key === 'extra') {
    price = data.product.colors.table.default_extra_price.price.amount;
    price = (parseInt(price, 10) * 100);
  }

  return colors.map((c) => {
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
      centsTotal: price,
    };
  });
}

export function transformProductSecondaryColorsCentsPrice({ colors = {} }) {
  const extraPrice = colors.table.default_extra_price.price || {};
  // amount: String,
  // currency: String,
  // id: Number|Null
  // variant_id: Number|Null
  //   ****** into ******
  // productSecondaryColorsCentsPrice: Number
  const productSecondaryColorsCentsPrice = parseInt(extraPrice.amount, 10) * 100;
  return productSecondaryColorsCentsPrice;
}

export function transformProductFabric({ fabric }) {
  console.warn('NEED BACKEND FABRIC IMG');
  //   "fabric": String,
  //   ****** into ******
  //   {
  //    id: Number,
  //    img: String,
  //    name: String,
  //    description: String,
  //   }
  return {
    id: 'does-not-exist-yet',
    img: 'does-not-exist-yet.png',
    name: 'does-not-exist-yet',
    description: fabric || (
      '<p>Main: 100% polyester heavy georgette</p>' +
      '<p>Contrast: 97% polyester, 3% spandex matte stretch satin</p>' +
      '<p>Lining: 100% polyester heavy georgette</p>' +
      '<p> Due to dyeing process, product hue may look slightly different from image.</p>'
    ),
  };
}

export function transformProductGarmentInformation() {
  //   "garment_care": null, // CURRENTLY NOT PASSED
  //   ****** into ******
  //   garmentCareInformation: String
  return 'Professional dry-clean only.\nSee label for further details.';
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

export function transformProductPreCustomizations() {
  console.warn('NEED BACKEND PRECUSTOMIZATIONS');
  //   UNKNOWN: Will need data from backend
  //   ****** into ******
  //   preCustomizations: arrayOf({
  //     id: Number|String,
  //     smallImg: String,
  //     description: String,
  //     selectedCustomizations: String (Potentially URL)
  //   })
  const preCustomizations = [
    {
      id: 'a0',
      smallImg: 'bs.co/a0.jpg',
      description: 'For cocktail',
      selectedCustomizations: {},
    },
    {
      id: 'a1',
      smallImg: 'bs.co/a1.jpg',
      description: 'For office',
      selectedCustomizations: {},
    },
    {
      id: 'a2',
      smallImg: 'bs.co/a2.jpg',
      description: 'For day',
      selectedCustomizations: {},
    },
  ];
  return preCustomizations;
}

export function transformProductModelDescription(productJSON) {
  const fit = productJSON.product && productJSON.product.fit
    ? productJSON.product.fit : '';
  //   "fit": String,
  //   ****** into ******
  //   modelDescription: String,
  const modelDescription = removeCommaWhiteSpace(fit);
  return modelDescription;
}

export function transformProductTitle({ name }) {
  //   "name": Number,
  //   ****** into ******
  //   title: String,
  const title = name;
  return title;
}

export function transformProductSizeChart({ sizeChart }) {
  const sizes = sizeChart;
  return sizes;
}

export function transformProductMakingOptionId({ making_option_id: making }) {
  return making;
}

export function transformProductFastMaking({ fast_making: fastMaking }) {
  return fastMaking;
}

export function transformDeliveryCopy({ delivery_period: deliveryPeriod }) {
  return deliveryPeriod;
}

export function transformProductSiteVersion({ siteVersion }) {
  return siteVersion;
}

function selectMeasurementMetric({ siteVersion = 'usa' }) {
  let measurementMetric = 'inch';

  if (siteVersion.toLowerCase() === 'australia') {
    measurementMetric = 'cm';
  }
  return measurementMetric;
}

function selectDefaultColor({ color_id: colorId, color_name: colorName }, colors) {
  const foundColor = find(colors, { id: colorId });
  return foundColor || colors[0];
}

export function transformSKU({ sku }) {
  if (typeof sku !== 'string') {
    return false;
  }
  return sku.toUpperCase();
}

export function transformProductJSON(productJSON) {
  let productState;
  let customizationState;
  try {
    if (productJSON.product) {
      productState = {
        currency: transformProductCurrency(productJSON.product),
        complementaryProducts: transformProductComplementaryProducts(productJSON.product),
        deliveryCopy: transformDeliveryCopy(productJSON.product),
        fabric: transformProductFabric(productJSON.product),
        fastMaking: transformProductFastMaking(productJSON.product),
        garmentCareInformation: transformProductGarmentInformation(),
        preCustomizations: transformProductPreCustomizations(),
        productCentsBasePrice: transformProductCentsBasePrice(productJSON.product),
        productDescription: transformProductDescription(productJSON.product),
        productDefaultColors: transformProductColors(productJSON, 'default'),
        productSecondaryColors: transformProductColors(productJSON, 'extra'),
        productSecondaryColorsCentsPrice: transformProductSecondaryColorsCentsPrice(productJSON.product),
        productId: transformProductId(productJSON.product),
        productImages: transformProductImages(productJSON.images),
        productTitle: transformProductTitle(productJSON.product),
        isActive: productJSON.product.is_active,
        makingOptionId: transformProductMakingOptionId(productJSON.product),
        modelDescription: transformProductModelDescription(productJSON),
        siteVersion: transformProductSiteVersion(productJSON),
        sizeChart: transformProductSizeChart(productJSON),
        sku: transformSKU(productJSON.product),
      };
    } else {
      productState = {};
    }
  } catch (e) {
    throw ({ e, message: 'Product state has incorrect parameters' });
  }


  try {
    if (productJSON.product) {
      const measurementMetric = selectMeasurementMetric(productJSON);
      const selectedColor = selectDefaultColor(productJSON.product, productState.productDefaultColors);
      customizationState = {
        addons: transformAddons(productJSON),
        selectedColor,
        temporaryColor: selectedColor,
        temporaryMeasurementMetric: measurementMetric,
        selectedMeasurementMetric: measurementMetric,
      };
    } else {
      customizationState = {};
    }
  } catch (e) {
    throw ({ e, message: 'Customization State has incorrect params' });
  }

  console.log('SUCCESSFULLY transformed data and is now hydrating app');
  return {
    $$appState: {
      siteVersion: productJSON.siteVersion,
    },
    $$productState: productState,
    $$customizationState: customizationState,
  };
}

export default {
  addonSelectionDisplayText,
  calculateSubTotal,
  sizingDisplayText,
  reduceCustomizationSelectionPrice,
  // Transforms
  transformAddons,
  transformProductCentsBasePrice,
  transformProductComplementaryProducts,
  transformProductCurrency,
  transformProductColors,
  transformProductDescription,
  transformProductSecondaryColorsCentsPrice,
  transformProductFabric,
  transformProductGarmentInformation,
  transformProductId,
  transformProductImages,
  transformProductPreCustomizations,
  transformProductModelDescription,
  transformProductTitle,
  transformProductJSON,
};
