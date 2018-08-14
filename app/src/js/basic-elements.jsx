/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import BlanketOverlay from './components/generic/BlanketOverlay';
import Header from './components/generic/Header';
import Cart from './components/generic/Cart';
import Footer from "./components/generic/Footer";

export function renderDefaultComponents(renderComponent, store) {
  // BLANKET
  const BlanketComponent = <Provider store={store}><BlanketOverlay /></Provider>;
  renderComponent(BlanketComponent, 'react-blanket');
  
  const HeaderComponent = <IntlProvider><Provider store={store}><Header /></Provider></IntlProvider>;
  renderComponent(HeaderComponent, 'react-header');

  // CART DRAWER
  const CartComponent = <IntlProvider><Provider store={store}><Cart /></Provider></IntlProvider>;
  renderComponent(CartComponent, 'react-cart');

  // FOOTER
  const FooterComponent = <IntlProvider><Provider store={store}><Footer /></Provider></IntlProvider>;
  renderComponent(FooterComponent, 'react-footer');
}

export default renderDefaultComponents;
