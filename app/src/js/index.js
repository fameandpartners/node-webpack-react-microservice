/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import win from './polyfills/windowPolyfill';

// Components
import App from './App'; // Current Pdp, poor name

// CSS
import '../css/index.scss';

// Store
import AppStore from './stores/AppStore';
import { renderDefaultComponents } from './basic-elements';

// Utilities
import { transformProductJSON } from './utilities/pdp';

function renderComponent(Component, idSelectorStr) {
  const el = document.getElementById(idSelectorStr);
  if (el) {
    ReactDOM.render(
      Component,
      el,
    );
  }
}

// MAIN PDP
// const pdpData = win.__data ? transformProductJSON(win.__data) : {};
// eslint-disable-next-line
const cleanData = win.__data;
// eslint-disable-next-line
const untransformedData = win.__untransformedData || {};
const pdpData = cleanData || transformProductJSON(untransformedData);
const store = AppStore(pdpData);
const AppComponent = <Provider store={store}><App /></Provider>;
renderComponent(AppComponent, 'root');

renderDefaultComponents(renderComponent, store);

if (module.hot) {
  module.hot.accept('./App.js', () => {
    /* eslint-disable global-require */
    const NextRootContainer = require('./App.js');
    const AppNode = (<Provider store={store}><NextRootContainer /></Provider>);
    renderComponent(AppNode, 'react-pdp');
  });
}
