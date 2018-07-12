/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { assign } from 'lodash';
import win from './polyfills/windowPolyfill';

// Components
import FlashSaleApp from './FlashSaleApp'; // Current FLASH Product App,
import FlashSaleListApp from './FlashSaleListApp'; // FLASH List App

// CSS
import '../css/index.scss';

// Store
import AppStore from './stores/AppStore';
import { renderDefaultComponents } from './basic-elements';

function renderComponent(Component, idSelectorStr) {
  const el = document.getElementById(idSelectorStr);
  if (el) {
    ReactDOM.render(
      Component,
      el,
    );
  }
}

// FAKE PDP
// INITIALIZATIONS
// const pdpData = win.__data ? transformProductJSON(win.__data) : {};
// eslint-disable-next-line
let cleanData = win.__data || {};
let $$collectionFilterSortState = {};
let $$flashSaleState = {};

if (win.CollectionFilterData) {
  $$collectionFilterSortState = {
    $$colors: win.CollectionFilterData.colors,
    $$bodyShapes: win.CollectionFilterData.bodyShapes,
    $$bodyStyles: win.CollectionFilterData.bodyStyles,
  };
}

if (win.FlashSaleData || win.FlashSaleListData) {
  $$flashSaleState = {
    $$lineItem: win.FlashSaleData ? win.FlashSaleData.lineItem : null,
    $$pageDresses: win.FlashSaleListData ? win.FlashSaleListData.pageDresses : null,
  };
}

cleanData = assign({}, cleanData, {
  $$collectionFilterSortState,
  $$flashSaleState,
});


const store = AppStore(cleanData);
const FlashSaleAppComponent = <Provider store={store}><FlashSaleApp /></Provider>;
renderComponent(FlashSaleAppComponent, 'flash-product-root');

const FlashSaleListAppComponent = <Provider store={store}><FlashSaleListApp /></Provider>;
renderComponent(FlashSaleListAppComponent, 'flash-list-root');

renderDefaultComponents(renderComponent, store);

if (module.hot) {
  module.hot.accept('./FlashSaleApp.js', () => {
    /* eslint-disable global-require */
    const NextRootContainer = require('./FlashSaleApp.js');
    const FlashSaleAppNode = (<Provider store={store}><NextRootContainer /></Provider>);
    renderComponent(FlashSaleAppNode, 'flash-list-root');
  });
}
