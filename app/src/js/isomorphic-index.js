/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import win from './polyfills/windowPolyfill';

// Components
import IsomorphicStarter from './IsomorphicStarter'; // Current Pdp, poor name

// CSS
import '../css/index.scss';

// Store
import AppStore from './stores/AppStore';

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
const IsomorphicStarterComponent = <Provider store={store}><IsomorphicStarter /></Provider>;
renderComponent(IsomorphicStarterComponent, 'root');


// SIDE CART
if (module.hot) {
  module.hot.accept('./IsomorphicStarter.js', () => {
    /* eslint-disable global-require */
    const NextRootContainer = require('./IsomorphicStarter.js');
    const AppNode = (<Provider store={store}><NextRootContainer /></Provider>);
    renderComponent(AppNode, 'react-pdp');
  });
}
