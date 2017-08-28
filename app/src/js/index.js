/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { assign } from 'lodash';
import App from './App';

// CSS
import '../css/index.scss';

// MOCK JSON
import productJSON from '../mock/product.json';

// Transforms
import {
  transformProductCentsBasePrice,
  transformProductComplementaryProducts,
  transformProductCurrency,
  transformProductDefaultColors,
  transformProductDescription,
  transformProductSecondaryColors,
  transformProductSecondaryColorsCentsPrice,
  transformProductFabric,
  transformProductGarmentInformation,
  transformProductId,
  transformProductImages,
  transformProductPreCustomizations,
  transformProductModelDescription,
  transformProductTitle,
} from './utilities/pdp';

// Store
import AppStore from './stores/AppStore';

function renderApp(Component) {
  ReactDOM.render(
    Component,
    document.getElementById('root'),
  );
}

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

function transformAddons() {
  const addons = productJSON.product.available_options.table.addons;
  const allCustomizations = productJSON.product.available_options.table.customizations.table.all;
  return assign({}, {
      // Marry previous customizations to addons
    addonLayerImages: addons.layer_images,
    selectedAddonImageLayers: [],
    addonOptions: allCustomizations.map(
        (ao, i) => {
          const mappedImageLayer = addons.layer_images.find(img => (img.bit_array[i] ? img : null));
          return assign({}, {
            id: ao.table.id,
            description: ao.table.name,
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

const productState = {
  currency: transformProductCurrency(productJSON.product),
  complementaryProducts: transformProductComplementaryProducts(),
  fabric: transformProductFabric(productJSON.product),
  garmentCareInformation: transformProductGarmentInformation(),
  preCustomizations: transformProductPreCustomizations(),
  productCentsBasePrice: transformProductCentsBasePrice(productJSON.product),
  productDescription: transformProductDescription(productJSON.product),
  productDefaultColors: transformProductDefaultColors(productJSON.product),
  productSecondaryColors: transformProductSecondaryColors(productJSON.product),
  productSecondaryColorsCentsPrice: transformProductSecondaryColorsCentsPrice(productJSON.product),
  productId: transformProductId(productJSON.product),
  productImages: transformProductImages(productJSON.images),
  modelDescription: transformProductModelDescription(productJSON.product),
  productTitle: transformProductTitle(productJSON.product),
};

// WARN: This can not go in production, it is just to show how hydration works
// eslint-disable-next-line
// const hydrated = (typeof window === 'object') ? window.__data : {
const hydrated = {
  $$appState: {
    // sideMenuOpen: true,
    currentURL: 'https://www.fameandpartners.com/',
  },
  $$productState: productState,
  $$customizationState: {
    addons: transformAddons(),
    selectedColor: productState.productDefaultColors[0],
    temporaryColor: productState.productDefaultColors[0],
  },
};
const store = AppStore(hydrated);

const component = <Provider store={store}><App /></Provider>;
renderApp(component);


if (module.hot) {
  module.hot.accept('./App.js', () => {
    /* eslint-disable global-require */
    const NextRootContainer = require('./App.js');
    const AppNode = (<Provider store={store}><NextRootContainer /></Provider>);
    renderApp(AppNode);
  });
}
