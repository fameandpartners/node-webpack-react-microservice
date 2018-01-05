/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { assign } from 'lodash';
import win from './polyfills/windowPolyfill';

// Components
import BridesmaidsFilterApp from './BridesmaidsFilterApp';
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
let $$bridesmaidsFilterState = {};

if (win.BridesmaidsFilterData) {
  $$bridesmaidsFilterState = {
    $$bridesmaidsFilterColors: win.BridesmaidsFilterData.colors,
    $$bridesmaidsFilterSilhouettes: win.BridesmaidsFilterData.silhouettes,
    $$bridesmaidsFilterLengths: win.BridesmaidsFilterData.lengths,
    $$bridesmaidsFilterTopDetails: win.BridesmaidsFilterData.top_details,
  };
}

cleanData = assign({}, cleanData, {
  $$bridesmaidsFilterState,
});


const store = AppStore(cleanData);

// DRESS FILTER (BRIDESMAIDS)
const BridesmaidsFilterAppComponent = <Provider store={store}><BridesmaidsFilterApp /></Provider>;
renderComponent(BridesmaidsFilterAppComponent, 'bridesmaids-filter-root');

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
