/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { assign } from 'lodash';
import win from './polyfills/windowPolyfill';

// Components
import BuySwatchApp from './BuySwatchApp';

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

// eslint-disable-next-line
let cleanData = win.__data || {};
let $$fabricSwatchState = {};

if (win.FabricSwatchData) {
  $$fabricSwatchState = {
    $$availableSwatches: win.FabricSwatchData.swatches,
  };
}

cleanData = assign({}, cleanData, {
  $$fabricSwatchState,
});


const store = AppStore(cleanData);
const SwatchAppComponent = <Provider store={store}><BuySwatchApp /></Provider>;
renderComponent(SwatchAppComponent, 'swatch-root');

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
  module.hot.accept('./BuySwatchApp.js', () => {
    /* eslint-disable global-require */
    const NextRootContainer = require('./BuySwatchApp.js');
    const AppNode = (<Provider store={store}><NextRootContainer /></Provider>);
    renderComponent(AppNode, 'react-swatch');
  });
}
