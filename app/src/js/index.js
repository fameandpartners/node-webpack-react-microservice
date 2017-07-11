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
    productTitle: 'Escala Dress',
    productDescription: 'Low effort, high contrast. The Jo is a heavy georgette gown featuring a contrasting pink bow at the front, criss-cross back straps, and a side split. It has an invisible zipper.',
    modelDescription: 'Our model wears a US 0 and is 5’9”',
  },
};
const store = AppStore(hydrated);

const component = <Provider store={store}><App /></Provider>;
ReactDOM.render(
  component,
  document.getElementById('root'),
);
