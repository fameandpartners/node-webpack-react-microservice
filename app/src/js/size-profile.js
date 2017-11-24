/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';

// CSS
import '../css/index.scss';

// Store
import AppStore from './stores/AppStore';

// polyfills
import win from './polyfills/windowPolyfill';

// ************************************************
//                                                *
//                  REMOVE!!!                      *
//                                                  *
// ***************************************************

import productJSON from '../mock/product.json';
import { transformProductJSON } from './utilities/pdp';

const isDev = process.env.NODE_ENV === 'development';

function renderApp(Component) {
  ReactDOM.render(
    Component,
    document.getElementById('webpack-size-profile'),
  );
}

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
const pdpData = win
                  ? isDev
                  ? transformProductJSON(productJSON)
                  : win.__data
                  : null;

const store = AppStore(pdpData);

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