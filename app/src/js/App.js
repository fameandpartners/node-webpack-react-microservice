import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';

// App Components
import SideMenu from './components/shared/SideMenu';
import AppMain from './components/pdp/AppMain';
import OnboardingModal from './components/onboarding/OnboardingModal';
import ProductFabricModal from './components/pdp/ProductFabricModal';
import ColorSelectionModal from './components/pdp/ColorSelectionModal';

// Global Styles
import '../css/global/variables.scss';
import '../css/reset.scss';
import '../css/gridlex.scss';
import '../css/helpers.scss';
import '../css/layout.scss';
import '../css/typography.scss';
import '../css/components/App.scss';

function stateToProps(state) {
  const sideMenuOpen = state.$$appState.get('sideMenuOpen');
  const modalOpen = state.$$modalState.get('shouldAppear');
  const cartDrawerOpen = state.$$cartState.get('cartDrawerOpen');
  const colorDrawerOpen = state.$$productState.get('colorDrawerOpen');

  return {
    lockBody: sideMenuOpen || modalOpen || cartDrawerOpen || colorDrawerOpen,
  };
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    autoBind(this);
  }

  render() {
    const { lockBody } = this.props;
    return (
      <div className={`App ${lockBody ? 'App--scroll-lock' : ''}`}>
        <SideMenu />
        <AppMain />
        <OnboardingModal />
        <ProductFabricModal />
        <ColorSelectionModal />
      </div>
    );
  }
}

App.propTypes = {
  lockBody: PropTypes.bool.isRequired,
};

export default connect(stateToProps)(App);
