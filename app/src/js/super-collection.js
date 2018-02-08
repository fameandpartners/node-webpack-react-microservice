/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { assign } from 'lodash';
import win from './polyfills/windowPolyfill';

// Components
import SuperCollectionApp from './SuperCollectionApp';
import SuperCollectionPageApp from './SuperCollectionPageApp';

// Standard Components that will be included in old site
import BlanketOverlay from './components/generic/BlanketOverlay';
import HeaderWrapper from './components/shared/header/HeaderWrapper';
import SideMenu from './components/shared/side_menu/SideMenu';
import CartDrawer from './components/shared/cart/CartDrawer';
import Footer from './components/shared/Footer';

// Transforms
import { transformThemeCollection } from './transforms/theme';
import { transformBridesmaidColors } from './transforms/bridesmaid';

// CSS
import '../css/index.scss';

// Store
import AppStore from './stores/AppStore';

function renderComponent(Component, idSelectorStr) {
  const el = document.getElementById(idSelectorStr);
  if (el) {
    ReactDOM.render(
      Component,
      el,
    );
  }
}

// eslint-disable-next-line
let cleanData = win.__data || {};
let $$appState = {};
let $$bridesmaidsFilterState = {};
let $$superCollectionState = {};
let $$themeState = {};

if (win.SuperCollectionData) {
  $$superCollectionState = {
    $$orderedSections: win.SuperCollectionData.data.sections,
    $$header: win.SuperCollectionData.data.header,
    $$footer: win.SuperCollectionData.data.footer,
  };
}

if (win.ApplicationStateData) {
  $$appState = win.ApplicationStateData;
}

if (win.__themeData__) {
  const { collection, name, presentation } = transformThemeCollection(win.__themeData__, $$appState.currentSiteVersion);
  $$themeState = {
    collection,
    name,
  };
}

if (win.BridesmaidsFilterData) {
  $$bridesmaidsFilterState = {
    $$bridesmaidsFilterColors: transformBridesmaidColors(win.BridesmaidsFilterData.colors),
  };
}


cleanData = assign({}, cleanData, {
  $$appState,
  $$bridesmaidsFilterState,
  $$superCollectionState,
  $$themeState,
});

const store = AppStore(cleanData);
const SuperCollectionAppComponent = <Provider store={store}><SuperCollectionApp /></Provider>;
renderComponent(SuperCollectionAppComponent, 'super-collection-root');

const SuperCollectionPageAppComponent = <Provider store={store}><SuperCollectionPageApp /></Provider>;
renderComponent(SuperCollectionPageAppComponent, 'super-collection-page-root');

// BLANKET
const BlanketComponent = <Provider store={store}><BlanketOverlay /></Provider>;
renderComponent(BlanketComponent, 'react-blanket');

// HEADER
const HeaderComponent = <Provider store={store}><HeaderWrapper /></Provider>;
renderComponent(HeaderComponent, 'react-header');

// SIDE MENU
const SideMenuComponent = <Provider store={store}><SideMenu /></Provider>;
renderComponent(SideMenuComponent, 'react-menu');

// CART DRAWER
const CartDrawerComponent = <Provider store={store}><CartDrawer /></Provider>;
renderComponent(CartDrawerComponent, 'react-cart');

// FOOTER
const FooterComponent = <Provider store={store}><Footer /></Provider>;
renderComponent(FooterComponent, 'react-footer');

if (module.hot) {
  module.hot.accept('./SuperCollectionApp.js', () => {
    /* eslint-disable global-require */
    const NextRootContainer = require('./SuperCollectionApp.js');
    const AppNode = (<Provider store={store}><NextRootContainer /></Provider>);
    renderComponent(AppNode, 'super-collection-root');
  });
}
