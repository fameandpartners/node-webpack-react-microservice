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
import ShareModal from './components/pdp/ShareModal';
import StyleSelectionModal from './components/pdp/StyleSelectionModal';
import SizeModals from './components/pdp/SizeModals';
import AfterpayModal from './components/pdp/AfterpayModal';
import LoadingSpinner from './components/generic/LoadingSpinner';

// Utilities
import { extractAndWhitelistQueryStringCustomizations } from './utilities/BOM';
import { removeLengthIdsFromCustomizationIds } from './utilities/bridesmaids';

// Services
import BDService from './services/BDService';

// Actions
import * as AppActions from './actions/AppActions';
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
    $$productDefaultColors: state.$$productState.get('productDefaultColors'),
    $$productSecondaryColors: state.$$productState.get('productSecondaryColors'),
    $$addonOptions: state.$$customizationState.get('addons').get('addonOptions'),
    lockBody: (sideMenuOpen || modalOpen || cartDrawerOpen || customizationDrawerOpen),
    // Necessary for Incompatabilities Call
    productId: state.$$productState.get('productId'),
    customizationIds: state.$$bdCustomizationState.get('selectedCustomizationDetails').toJS(),
    isLoading: state.$$bdCustomizationState.get('incompatabilitiesLoading'),
    availableLengths: state.$$bdCustomizationState.get('availableBDCustomizationLengths').toJS(),
  };
}

function dispatchToProps(dispatch) {
  const { setShareableQueryParams } = bindActionCreators(AppActions, dispatch);
  const {
    selectProductColor,
    updateCustomizationStyleSelection,
  } = bindActionCreators(CustomizationActions, dispatch);
  const {
    setBDIncompatabilities,
    setBDIncompatabilitiesLoading,
  } = bindActionCreators(BDActions, dispatch);


  return {
    selectProductColor,
    setBDIncompatabilities,
    setShareableQueryParams,
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
    }).then((res) => {
      setBDIncompatabilities({ incompatabilities: res.body.incompatible_ids });
      setBDIncompatabilitiesLoading({ isLoading: false });
    });
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
    if (win && win.fixBody) {
      win.fixBody(this.props.lockBody);
    }
  }

  componentDidMount() {
    this.checkForIncompatabilities();
  }

  render() {
    const { lockBody } = this.props;
    const { isLoading } = this.props;
    return (
      <div className="__react_root__">
        { isLoading ? <LoadingSpinner /> :
        <div className={`BridesmaidApp Root__wrapper ${lockBody ? 'BridesmaidApp--scroll-lock' : ''}`}>
          <BDCustomizationDrawer />
          <BDAppMain />
          <OnboardingModal />
          <ProductFabricModal />
          <BDColorSelectionModal />
          <BDCustomizationSelectionModal />
          <ShareModal />
          <StyleSelectionModal />
          <SizeModals />
          <AfterpayModal />
        </div>
        }
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
BridesmaidApp.propTypes = {
  lockBody: PropTypes.bool.isRequired,
  $$addonOptions: ImmutablePropTypes.list.isRequired,
  $$productDefaultColors: ImmutablePropTypes.list.isRequired,
  $$productSecondaryColors: ImmutablePropTypes.list.isRequired,
  selectedColor: PropTypes.object.isRequired,
  selectProductColor: PropTypes.func.isRequired,
  setShareableQueryParams: PropTypes.func.isRequired,
  updateCustomizationStyleSelection: PropTypes.func.isRequired,
  // Necessary for incompat Call
  productId: PropTypes.string.isRequired,
  customizationIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  setBDIncompatabilities: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  setBDIncompatabilitiesLoading: PropTypes.func.isRequired,
  availableLengths: PropTypes.object,
};

BridesmaidApp.defaultProps = {
  availableLengths: null,
  isLoading: false,

};

export default connect(stateToProps, dispatchToProps)(BridesmaidApp);
