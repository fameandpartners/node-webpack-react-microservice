/* eslint-disable */
import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Sentry Error Tracking
import Raven from 'raven-js';

// Components
import ShoppingSpree from './components/shopping-spree/ShoppingSpree';
import SideMenu from './components/shared/side_menu/SideMenu';
import AppMain from './components/pdp/AppMain';
import CustomizationDrawer from './components/pdp/CustomizationDrawer';
import OnboardingModal from './components/onboarding/OnboardingModal';
import ProductFabricModal from './components/pdp/ProductFabricModal';
import ColorSelectionModal from './components/pdp/ColorSelectionModal';
import ShareModal from './components/pdp/ShareModal';
import ImageLightboxModal from './components/pdp/ImageLightboxModal';
import StyleSelectionModal from './components/pdp/StyleSelectionModal';
import SizeModals from './components/pdp/SizeModals';
import AfterpayModal from './components/pdp/AfterpayModal';

// Utilities
import { extractAndWhitelistQueryStringCustomizations } from './utilities/BOM';

// Actions
import * as AppActions from './actions/AppActions';
import * as CustomizationActions from './actions/CustomizationActions';

// Polyfills
import win from './polyfills/windowPolyfill';

// Global Styles
import '../css/global/variables.scss';
import '../css/reset.scss';
import '../css/gridlex.scss';
import '../css/helpers.scss';
import '../css/layout.scss';
import '../css/typography.scss';
import '../css/animations.scss';
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
    selectedColor: state.$$customizationState.get('selectedColor'),
    $$productDefaultColors: state.$$productState.get('productDefaultColors'),
    $$productSecondaryColors: state.$$productState.get('productSecondaryColors'),
    $$addonOptions: state.$$customizationState.get('addons').get('addonOptions'),
    lockBody: (sideMenuOpen || modalOpen || cartDrawerOpen || customizationDrawerOpen),
  };
}

function dispatchToProps(dispatch) {
  const { setShareableQueryParams } = bindActionCreators(AppActions, dispatch);
  const {
    selectProductColor,
    updateCustomizationStyleSelection,
  } = bindActionCreators(CustomizationActions, dispatch);

  return {
    selectProductColor,
    setShareableQueryParams,
    updateCustomizationStyleSelection,
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    autoBind(this);
  }

  componentWillMount() {
    // HYDRATION OF COLOR SELECTION AND CUSTOMIZATIONS FROM QUERY PARAMS
    // ONLY ON CLIENT SIDE
    if (!win.isMockWindow) {
      const {
      $$addonOptions,
      $$productDefaultColors,
      $$productSecondaryColors,
      selectedColor,
      selectProductColor,
      setShareableQueryParams,
      updateCustomizationStyleSelection,
    } = this.props;
      const { color, customizations } = extractAndWhitelistQueryStringCustomizations(
        selectedColor,
        $$productDefaultColors.toJS().concat($$productSecondaryColors.toJS()),
        $$addonOptions.toJS(),
      );

      if (color && color.id) {
        selectProductColor({ selectedColor: color });
      }

      if (customizations.length) {
        updateCustomizationStyleSelection({ selectedStyleCustomizations: customizations });
      }

      setShareableQueryParams({ color: color.id, customizations });
    }
  }

  componentDidUpdate() {
    if (this.props.lockBody) {
      win.document.body.style.overflow = 'hidden';
    } else {
      win.document.body.style.overflow = 'visible';
    }
  }

  loadShoppingSpree()
    {
        if( win.ShoppingSpreeData ) {
            return( <ShoppingSpree firebaseAPI={win.ShoppingSpreeData.firebaseAPI}
                    firebaseDatabase={win.ShoppingSpreeData.firebaseDatabase}/> );
        } else {
            return;            
        }
  }

  render() {
    const { lockBody } = this.props;
    return (
        <div className={`App Root__wrapper ${lockBody ? 'App--scroll-lock' : ''}`}>
        {this.loadShoppingSpree()}
        <SideMenu />
        <CustomizationDrawer />
        <AppMain />
        <OnboardingModal />
        <ProductFabricModal />
        <ColorSelectionModal />
        <ShareModal />
        <ImageLightboxModal />
        <StyleSelectionModal />
        <SizeModals />
        <AfterpayModal />
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
App.propTypes = {
  lockBody: PropTypes.bool.isRequired,
  $$addonOptions: ImmutablePropTypes.list.isRequired,
  $$productDefaultColors: ImmutablePropTypes.list.isRequired,
  $$productSecondaryColors: ImmutablePropTypes.list.isRequired,
  selectedColor: PropTypes.object.isRequired,
  selectProductColor: PropTypes.func.isRequired,
  setShareableQueryParams: PropTypes.func.isRequired,
  updateCustomizationStyleSelection: PropTypes.func.isRequired,
};

export default connect(stateToProps, dispatchToProps)(App);
