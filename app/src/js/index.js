/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Components
import App from './App';
import HeaderWrapper from './components/shared/header/HeaderWrapper';

// CSS
import '../css/index.scss';

// Store
import AppStore from './stores/AppStore';

// polyfills
import win from './polyfills/windowPolyfill';

// import { transformProductJSON } from './utilities/pdp';

function renderComponent(Component, idSelectorStr) {
  const el = document.getElementById(idSelectorStr);
  console.log('idSelectorStr');
  console.log('el', el);
  if (el) {
    ReactDOM.render(
      Component,
      el,
    );
  }
}


/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
// MAIN PDP
console.log('win.__data', win.__data);
const pdpData = {};
const store = AppStore(pdpData);
const AppComponent = <Provider store={store}><App /></Provider>;
renderComponent(AppComponent, 'react-pdp');

// HEADER
const HeaderComponent = <Provider store={store}><HeaderWrapper /></Provider>;
renderComponent(HeaderComponent, 'react-header');

// FOOTER

// SIDE CART

if (module.hot) {
  module.hot.accept('./App.js', () => {
    /* eslint-disable global-require */
    const NextRootContainer = require('./App.js');
    const AppNode = (<Provider store={store}><NextRootContainer /></Provider>);
    renderComponent(AppNode, 'react-pdp');
  });
}
