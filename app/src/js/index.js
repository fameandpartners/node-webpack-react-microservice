/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import '../css/index.scss';

// Store
import AppStore from './stores/AppStore';

function renderApp(Component) {
  ReactDOM.render(
    Component,
    document.getElementById('root'),
  );
}

// WARN: This can not go in production, it is just to show how hydration works
// eslint-disable-next-line
// const hydrated = (typeof window === 'object') ? window.__data : {
const hydrated = {
  $$appState: {
    // sideMenuOpen: true,
    currentURL: 'https://www.fameandpartners.com/',
  },
  $$productState: {
    productImage: 'https://d1msb7dh8kb0o9.cloudfront.net/spree/products/32710/original/usp1040-burgundy-1.jpg?1478188086',
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
    productDefaultColors: [
      {
        id: 'pretty-pink',
        name: 'Pretty Pink',
        hexValue: '#F7DBE9',
        patternUrl: null,
      },
      {
        id: 'red',
        name: 'Red',
        hexValue: '#E01B1B',
        patternUrl: null,
      },
    ],
    productSecondaryColorCentsPrice: 1600,
    productSecondaryColors: [
      {
        id: 'aqua',
        name: 'Aqua',
        hexValue: '#F7DBE9',
        patternUrl: null,
      },
      {
        id: 'black',
        name: 'Black',
        hexValue: '#000000',
        patternUrl: null,
      },
      {
        id: 'blush',
        name: 'Blush',
        hexValue: '#F9DAD8',
        patternUrl: null,
      },
      {
        id: 'bright-yellow',
        name: 'Bright Yellow',
        hexValue: '#fcf751',
        patternUrl: null,
      },
      {
        id: 'burgandy',
        name: 'Burgundy',
        hexValue: '#77202F',
        patternUrl: null,
      },
      {
        id: 'candy-pink',
        name: 'Candy Pink',
        hexValue: '#ff99ff',
        patternUrl: null,
      },
      {
        id: 'champange',
        name: 'Champagne',
        hexValue: '#F9DAD8',
        patternUrl: null,
      },
      {
        id: 'cobalt-blue',
        name: 'Cobalt Blue',
        hexValue: '#012D60',
        patternUrl: null,
      },
      {
        id: 'emerald-green',
        name: 'Emerald Green',
        hexValue: '#009875',
        patternUrl: null,
      },
      {
        id: 'black',
        name: 'Black',
        hexValue: '#000000',
        patternUrl: null,
      },
      {
        id: 'blush',
        name: 'Blush',
        hexValue: '#F9DAD8',
        patternUrl: null,
      },
      {
        id: 'bright-yellow',
        name: 'Bright Yellow',
        hexValue: '#fcf751',
        patternUrl: null,
      },
      {
        id: 'burgandy',
        name: 'Burgundy',
        hexValue: '#77202F',
        patternUrl: null,
      },
      {
        id: 'candy-pink',
        name: 'Candy Pink',
        hexValue: '#ff99ff',
        patternUrl: null,
      },
      {
        id: 'champange',
        name: 'Champagne',
        hexValue: '#F9DAD8',
        patternUrl: null,
      },
      {
        id: 'cobalt-blue',
        name: 'Cobalt Blue',
        hexValue: '#012D60',
        patternUrl: null,
      },
      {
        id: 'emerald-green',
        name: 'Emerald Green',
        hexValue: '#009875',
        patternUrl: null,
      },
    ],
    productId: '209gug902',
    productCentsBasePrice: 21000,
    productTitle: 'Escala Dress',
    productDescription: 'Low effort, high contrast. The Jo is a heavy georgette gown featuring a contrasting pink bow at the front, criss-cross back straps, and a side split. It has an invisible zipper.',
    selectedColor: {
      id: '2096a',
      centsTotal: 1200,
      name: 'Black',
      hexValue: '#000000',
    },
    selectedCustomizations: [
      {
        id: 'customa49',
        description: 'Adds laces to back strap',
        centsTotal: 1400,
      },
      {
        id: 'customa69',
        description: 'Puts bow on back',
        centsTotal: 1900,
      },
    ],
    modelDescription: 'Our model wears a US 0 and is 5’9”',
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
