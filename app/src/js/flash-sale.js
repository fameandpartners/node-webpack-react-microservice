/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import win from './polyfills/windowPolyfill';

// Components
import FlashSaleApp from './FlashSaleApp'; // Current Pdp, poor name

// Standard Components that will be included in old site
import BlanketOverlay from './components/generic/BlanketOverlay';
import HeaderWrapper from './components/shared/header/HeaderWrapper';
import SideMenu from './components/shared/side_menu/SideMenu';
import CartDrawer from './components/shared/cart/CartDrawer';
import Footer from './components/shared/Footer';

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

// MAIN PDP
// const pdpData = win.__data ? transformProductJSON(win.__data) : {};
// eslint-disable-next-line
const cleanData = win.__data;
const store = AppStore(cleanData);
const FlashSaleAppComponent = <Provider store={store}><FlashSaleApp /></Provider>;
renderComponent(FlashSaleAppComponent, 'flash-list-root');

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

// SIDE CART

if (module.hot) {
  module.hot.accept('./FlashSaleApp.js', () => {
    /* eslint-disable global-require */
    const NextRootContainer = require('./FlashSaleApp.js');
    const FlashSaleAppNode = (<Provider store={store}><NextRootContainer /></Provider>);
    renderComponent(FlashSaleAppNode, 'flash-list-root');
  });
}
