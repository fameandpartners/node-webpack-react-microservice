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
const hydrated = (typeof window === 'object') ? window.__data : {
  // const hydrated = {
  $$appState: {
    sideMenuOpen: true,
  },
  $$productState: {
    productTitle: 'Escala Dress',
  },
};
const store = AppStore(hydrated);

const component = <Provider store={store}><App {...hydrated} /></Provider>;
ReactDOM.render(
  component,
  document.getElementById('root'),
);
