/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { assign } from 'lodash';
import win from './polyfills/windowPolyfill';

// Transforms
import { transformBridesmaidColors } from './transforms/bridesmaid';

// Components
import BridesmaidsFilterApp from './BridesmaidsFilterApp';
import BridesmaidsFilterResultsApp from './BridesmaidsFilterResultsApp';
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
    $$bridesmaidsFilterColors: transformBridesmaidColors(win.BridesmaidsFilterData.colors),
    $$bridesmaidsFilterSilhouettes: win.BridesmaidsFilterData.silhouettes.options,
    $$bridesmaidsFilterLengths: win.BridesmaidsFilterData.lengths.options,
    $$bridesmaidsFilterTopDetails: win.BridesmaidsFilterData.top_details.options,
  };
}

cleanData = assign({}, cleanData, {
  $$bridesmaidsFilterState,
});


const store = AppStore(cleanData);

// DRESS FILTER (BRIDESMAIDS)
const BridesmaidsFilterAppComponent = <Provider store={store}><BridesmaidsFilterApp /></Provider>;
renderComponent(BridesmaidsFilterAppComponent, 'bridesmaids-filter-root');

// DRESS FILTER RESULTS (BRIDESMAIDS)
// eslint-disable-next-line
const BridesmaidsFilterResultsAppComponent = <Provider store={store}><BridesmaidsFilterResultsApp /></Provider>;
renderComponent(BridesmaidsFilterResultsAppComponent, 'bridesmaids-filter-results-root');

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