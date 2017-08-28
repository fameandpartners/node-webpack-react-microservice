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
  transformProductDefaultColors,
  transformProductSecondaryColors,
  transformProductId,
  transformProductImages,
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
  const addons = {
    base_images: [
      {
        name: 'FP2573P_base-2.png',
        url: 'https://d1msb7dh8kb0o9.cloudfront.net/spree/products/1609/cads/1505/web/base-2.png?1500591595',
        position: 4,
        bit_array: [
          false,
          false,
          true,
          false,
        ],
      },
      {
        name: 'FP2573P_base.png',
        url: 'https://d1msb7dh8kb0o9.cloudfront.net/spree/products/1609/cads/1506/web/base-.png?1500591596',
        position: 5,
        bit_array: [
          false,
          false,
          false,
          false,
        ],
      },
    ],
    layer_images: [
      {
        name: 'FP2573P_layer-3.png',
        url: 'https://d1msb7dh8kb0o9.cloudfront.net/spree/products/1609/cads/1502/web/layer-3.png?1500591594',
        position: 1,
        bit_array: [
          false,
          false,
          false,
          true,
        ],
      },
      {
        name: 'FP2573P_layer-1.png',
        url: 'https://d1msb7dh8kb0o9.cloudfront.net/spree/products/1609/cads/1503/web/layer-1.png?1500591594',
        position: 2,
        bit_array: [
          false,
          true,
          false,
          false,
        ],
      },
      {
        name: 'FP2573P_layer-0.png',
        url: 'https://d1msb7dh8kb0o9.cloudfront.net/spree/products/1609/cads/1504/web/layer-0.png?1500591595',
        position: 3,
        bit_array: [
          true,
          false,
          false,
          false,
        ],
      },
    ],
  };
  const allCustomizations = [
    {
      table: {
        id: 4605,
        name: 'Change To Short Sleeves',
        image: 'logo_empty.png',
        display_price: {
          money: {
            fractional: '400.0',
            currency: {
              id: 'aud',
              priority: 4,
              iso_code: 'AUD',
              name: 'Australian Dollar',
              symbol: '$',
              alternate_symbols: [
                'A$',
              ],
              subunit: 'Cent',
              subunit_to_unit: 100,
              symbol_first: true,
              html_entity: '$',
              decimal_mark: '.',
              thousands_separator: ',',
              iso_numeric: '036',
            },
            bank: {
              rounding_method: null,
              rates: {},
              mutex: {},
            },
          },
          options: {
            with_currency: false,
            symbol_position: 'before',
            no_cents: false,
            decimal_mark: '.',
            thousands_separator: ',',
          },
        },
        position: 1,
      },
    },
    {
      table: {
        id: 4606,
        name: 'Raise Front Neckline',
        image: 'logo_empty.png',
        display_price: {
          money: {
            fractional: '900.0',
            currency: {
              id: 'aud',
              priority: 4,
              iso_code: 'AUD',
              name: 'Australian Dollar',
              symbol: '$',
              alternate_symbols: [
                'A$',
              ],
              subunit: 'Cent',
              subunit_to_unit: 100,
              symbol_first: true,
              html_entity: '$',
              decimal_mark: '.',
              thousands_separator: ',',
              iso_numeric: '036',
            },
            bank: {
              rounding_method: null,
              rates: {},
              mutex: {},
            },
          },
          options: {
            with_currency: false,
            symbol_position: 'before',
            no_cents: false,
            decimal_mark: '.',
            thousands_separator: ',',
          },
        },
        position: 2,
      },
    },
    {
      table: {
        id: 4607,
        name: 'Make Knee Length',
        image: 'logo_empty.png',
        display_price: {
          money: {
            fractional: '900.0',
            currency: {
              id: 'aud',
              priority: 4,
              iso_code: 'AUD',
              name: 'Australian Dollar',
              symbol: '$',
              alternate_symbols: [
                'A$',
              ],
              subunit: 'Cent',
              subunit_to_unit: 100,
              symbol_first: true,
              html_entity: '$',
              decimal_mark: '.',
              thousands_separator: ',',
              iso_numeric: '036',
            },
            bank: {
              rounding_method: null,
              rates: {},
              mutex: {},
            },
          },
          options: {
            with_currency: false,
            symbol_position: 'before',
            no_cents: false,
            decimal_mark: '.',
            thousands_separator: ',',
          },
        },
        position: 3,
      },
    },
    {
      table: {
        id: 4608,
        name: 'Add Separate Waist Tie',
        image: 'logo_empty.png',
        display_price: {
          money: {
            fractional: '900.0',
            currency: {
              id: 'aud',
              priority: 4,
              iso_code: 'AUD',
              name: 'Australian Dollar',
              symbol: '$',
              alternate_symbols: [
                'A$',
              ],
              subunit: 'Cent',
              subunit_to_unit: 100,
              symbol_first: true,
              html_entity: '$',
              decimal_mark: '.',
              thousands_separator: ',',
              iso_numeric: '036',
            },
            bank: {
              rounding_method: null,
              rates: {},
              mutex: {},
            },
          },
          options: {
            with_currency: false,
            symbol_position: 'before',
            no_cents: false,
            decimal_mark: '.',
            thousands_separator: ',',
          },
        },
        position: 4,
      },
    },
  ];
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
  complementaryProducts: [
    {
      centsPrice: 22900,
      smallImg: 'https://d1msb7dh8kb0o9.cloudfront.net/spree/products/37492/original/fprv1060-white-front.jpg?1499455161',
      productId: 'fprv1060',
      productTitle: 'The Laurel Dress',
      url: 'https://www.fameandpartners.com/dresses/dress-the-laurel-dress-1599?color=white',
    },
    {
      centsPrice: 26900,
      smallImg: 'https://d1msb7dh8kb0o9.cloudfront.net/spree/products/37428/original/fp2556-white-front.jpg?1499455106',
      productId: 'fp2556',
      productTitle: 'The Janette Dress',
      url: 'https://www.fameandpartners.com/dresses/dress-the-janette-dress-1598?color=white',
    },
  ],
  fabric: {
    id: 'poly-1234',
    smallImg: '',
    name: 'Silk',
    description: 'Medium Weight\nExcellent stretch and recovery\nMain: 97% cotton, 3% elastane cotton sateen\nLining: 65% cotton, 35% polyester poplin\nTrim: Nylon invisible zip with hook & eye closure',
  },
  garmentCareInformation: 'Professional dry-clean only.\nSee label for further details.',
  preCustomizations: [
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
  ],
  productDefaultColors: transformProductDefaultColors(productJSON.product),
  productSecondaryColors: transformProductSecondaryColors(productJSON.product),
  productId: transformProductId(productJSON.product),
  productImages: transformProductImages(productJSON.images),
  productCentsBasePrice: 21000,
  productTitle: 'Escala Dress',
  productDescription: 'Low effort, high contrast. The Jo is a heavy georgette gown featuring a contrasting pink bow at the front, criss-cross back straps, and a side split. It has an invisible zipper.',
  modelDescription: 'Our model wears a US 0 and is 5’9”',
};

// WARN: This can not go in production, it is just to show how hydration works
// eslint-disable-next-line
// const hydrated = (typeof window === 'object') ? window.__data : {
const hydrated = {
  $$appState: {
    // sideMenuOpen: true,
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
