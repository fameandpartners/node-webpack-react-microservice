/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import '../css/index.scss';

// Store
import AppStore from './stores/AppStore';

// WARN: This can not go in production, it is just to show how hydration works
// eslint-disable-next-line
// const hydrated = (typeof window === 'object') ? window.__data : {
const hydrated = {
  $$appState: {
    // sideMenuOpen: true,
  },
  $$productState: {
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
ReactDOM.render(
  component,
  document.getElementById('root'),
);
