import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';

// Sentry Error Tracking
import Raven from 'raven-js';

// App Components
import SideMenu from './components/shared/side_menu/SideMenu';
import AppMain from './components/pdp/AppMain';
import CustomizationDrawer from './components/pdp/CustomizationDrawer';
import OnboardingModal from './components/onboarding/OnboardingModal';
import ProductFabricModal from './components/pdp/ProductFabricModal';
import ColorSelectionModal from './components/pdp/ColorSelectionModal';
import ShareModal from './components/pdp/ShareModal';
import ZoomModal from './components/pdp/ZoomModal';
import StyleSelectionModal from './components/pdp/StyleSelectionModal';
import SizeModals from './components/pdp/SizeModals';
import AfterpayModal from './components/pdp/AfterpayModal';

// polyfills
import win from './polyfills/windowPolyfill';

// Global Styles
import '../css/global/variables.scss';
import '../css/reset.scss';
import '../css/gridlex.scss';
import '../css/helpers.scss';
import '../css/layout.scss';
import '../css/typography.scss';
import '../css/components/App.scss';

// Configure Error Tracking
Raven
  .config('https://bc3111a59f064fbba31becef25d2fb7c@sentry.io/88252')
  .install();


function stateToProps(state) {
  const sideMenuOpen = state.$$appState.get('sideMenuOpen');
  const modalOpen = state.$$modalState.get('shouldAppear');
  const cartDrawerOpen = state.$$cartState.get('cartDrawerOpen');
  const customizationDrawerOpen = state.$$customizationState.get('productCustomizationDrawerOpen');

  return {
    lockBody: (sideMenuOpen || modalOpen || cartDrawerOpen || customizationDrawerOpen),
  };
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    autoBind(this);
  }

  componentDidUpdate() {
    if (this.props.lockBody) {
      win.document.body.style.overflow = 'hidden';
    } else {
      win.document.body.style.overflow = 'visible';
    }
  }

  render() {
    const { lockBody } = this.props;
    return (
      <div className={`App Root__wrapper ${lockBody ? 'App--scroll-lock' : ''}`}>
        <SideMenu />
        <CustomizationDrawer />
        <AppMain />
        <OnboardingModal />
        <ProductFabricModal />
        <ColorSelectionModal />
        <ShareModal />
        <ZoomModal />
        <StyleSelectionModal />
        <SizeModals />
        <AfterpayModal />
      </div>
    );
  }
}

App.propTypes = {
  lockBody: PropTypes.bool.isRequired,
};

export default connect(stateToProps)(App);
