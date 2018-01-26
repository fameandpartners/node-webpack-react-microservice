import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Sentry Error Tracking
import Raven from 'raven-js';

// Components
import BDAppMain from './components/bridesmaid_pdp/BDAppMain';
import BDCustomizationDrawer from './components/bridesmaid_pdp/BDCustomizationDrawer';
import OnboardingModal from './components/onboarding/OnboardingModal';
import ProductFabricModal from './components/pdp/ProductFabricModal';
import BDColorSelectionModal from './components/bridesmaid_pdp/BDColorSelectionModal';
import BDCustomizationSelectionModal from './components/bridesmaid_pdp/BDCustomizationSelectionModal';
import BDShareModal from './components/bridesmaid_pdp/BDShareModal';
import StyleSelectionModal from './components/pdp/StyleSelectionModal';
import SizeModals from './components/pdp/SizeModals';
import AfterpayModal from './components/pdp/AfterpayModal';

// Utilities
import {
  extractAndWhitelistQueryStringBDCustomizations,
  removeLengthIdsFromCustomizationIds,
} from './utilities/bridesmaids';

// Services
import BDService from './services/BDService';

// Actions
import * as BDActions from './actions/BDActions';
import * as CustomizationActions from './actions/CustomizationActions';

// Polyfills
import win from './polyfills/windowPolyfill';

// Global Styles
import '../css/global/variables.scss';
import '../css/reset.scss';
import '../css/gridlex.scss';
import '../css/helpers.scss';
import '../css/typography.scss';
import '../css/layout.scss';
import '../css/animations.scss';
import '../css/components/BridesmaidApp.scss';

// Configure Error Tracking
Raven
  .config('https://bc3111a59f064fbba31becef25d2fb7c@sentry.io/88252')
  .install();


function stateToProps(state) {
  const sideMenuOpen = state.$$appState.get('sideMenuOpen');
  const modalOpen = state.$$modalState.get('shouldAppear');
  const cartDrawerOpen = state.$$cartState.get('cartDrawerOpen');
  const customizationDrawerOpen = state.$$bdCustomizationState.get('bdProductCustomizationDrawerOpen');

  return {
    selectedColor: state.$$customizationState.get('selectedColor'),
    availableBDCustomizationLengths: state.$$bdCustomizationState.get('availableBDCustomizationLengths').toJS(),
    $$productDefaultColors: state.$$productState.get('productDefaultColors'),
    $$productSecondaryColors: state.$$productState.get('productSecondaryColors'),
    $$addonOptions: state.$$customizationState.get('addons').get('addonOptions'),
    lockBody: (sideMenuOpen || modalOpen || cartDrawerOpen || customizationDrawerOpen),
    // Necessary for Incompatabilities Call
    productId: state.$$productState.get('productId'),
    customizationIds: state.$$bdCustomizationState.get('selectedCustomizationDetails').toJS(),
    availableLengths: state.$$bdCustomizationState.get('availableBDCustomizationLengths').toJS(),
  };
}

function dispatchToProps(dispatch) {
  const {
    selectProductColor,
    updateCustomizationStyleSelection,
  } = bindActionCreators(CustomizationActions, dispatch);
  const {
    setBDIncompatabilities,
    setBDIncompatabilitiesLoading,
    setBDColor,
    setBDLength,
  } = bindActionCreators(BDActions, dispatch);


  return {
    selectProductColor,
    setBDIncompatabilities,
    setBDColor,
    setBDLength,
    updateCustomizationStyleSelection,
    setBDIncompatabilitiesLoading,
  };
}

class BridesmaidApp extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    autoBind(this);
  }

  checkForIncompatabilities() {
    const {
      availableLengths,
      customizationIds,
      productId,
      setBDIncompatabilities,
      setBDIncompatabilitiesLoading,
    } = this.props;
    const lengthKeys = Object.keys(availableLengths);
    const length = availableLengths[customizationIds.find(
      id => lengthKeys.indexOf(id) > -1,
    )];
    setBDIncompatabilitiesLoading({ isLoading: true });
    BDService.getBridesmaidsIncompatabilities({
      length,
      customizationIds: removeLengthIdsFromCustomizationIds(customizationIds),
      productId,
    })
    .then(({ body, error }) => {
      if (error) {
        console.log('perform some error handling');
      }
      setBDIncompatabilities({
        temporaryCustomizationCombinationId: body.id,
        incompatabilities: body.incompatible_ids,
      });
      setBDIncompatabilitiesLoading({ isLoading: false });
    })
    .catch(() => {
      setBDIncompatabilitiesLoading({ isLoading: false });
    });
  }

  componentWillMount() {
    const {
      availableBDCustomizationLengths,
      $$productDefaultColors,
      setBDColor,
      setBDLength,
    } = this.props;
    // HYDRATION OF COLOR SELECTION AND CUSTOMIZATIONS FROM QUERY PARAMS
    // ONLY ON CLIENT SIDE
    if (!win.isMockWindow) {
      const { color, length } = extractAndWhitelistQueryStringBDCustomizations(
        $$productDefaultColors.toJS(),
        availableBDCustomizationLengths,
      );

      if (color) {
        setBDColor({ selectedBDCustomizationColor: color });
      }

      if (length) {
        setBDLength({ selectedBDCustomizationLength: length });
      }
    }
  }


  componentDidMount() {
    this.checkForIncompatabilities();
  }

  componentDidUpdate() {
    if (win && win.fixBody) {
      win.fixBody(this.props.lockBody);
    }
  }

  render() {
    const { lockBody } = this.props;
    return (
      <div className="__react_root__">
        <div className={`BridesmaidApp Root__wrapper ${lockBody ? 'BridesmaidApp--scroll-lock' : ''}`}>
          <BDCustomizationDrawer />
          <BDAppMain />
          <OnboardingModal />
          <ProductFabricModal />
          <BDColorSelectionModal />
          <BDCustomizationSelectionModal />
          <BDShareModal currentURL={win.location.href} />
          <StyleSelectionModal />
          <SizeModals />
          <AfterpayModal />
        </div>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
BridesmaidApp.propTypes = {
  lockBody: PropTypes.bool.isRequired,
  availableBDCustomizationLengths: PropTypes.object.isRequired,
  $$productDefaultColors: ImmutablePropTypes.list.isRequired,
  // Necessary for incompat Call
  productId: PropTypes.number.isRequired,
  customizationIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  setBDIncompatabilitiesLoading: PropTypes.func.isRequired,
  availableLengths: PropTypes.object,
  // Redux Funcs
  setBDIncompatabilities: PropTypes.func.isRequired,
  setBDColor: PropTypes.func.isRequired,
  setBDLength: PropTypes.func.isRequired,
};

BridesmaidApp.defaultProps = {
  availableLengths: null,
  lockBody: false,
};

export default connect(stateToProps, dispatchToProps)(BridesmaidApp);
