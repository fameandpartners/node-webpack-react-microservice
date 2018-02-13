import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import qs from 'qs';
import { bindActionCreators } from 'redux';

// // Sentry Error Tracking
// import Raven from 'raven-js';

// Libraries
import Resize from './decorators/Resize';
import PDPBreakpoints from './libs/PDPBreakpoints';

// Actions
import * as BridesmaidsFilterActions from './actions/BridesmaidsFilterActions';
import * as ModalActions from './actions/ModalActions';

// Assets
// ???

// Global Styles
import '../css/global/variables.scss';
import '../css/reset.scss';
import '../css/gridlex.scss';
import '../css/helpers.scss';
import '../css/typography.scss';
import '../css/layout.scss';
import '../css/animations.scss';
import '../css/components/FlashSale.scss';

// Utilities
import win from './polyfills/windowPolyfill';
import {
  // transformFilterColors,
  // transformFilterSilhouettes,
  // transformFilterLengths,
  // transformFilterTopDetails,
  loadFilteredResultsPage,
  getFilteredResults,
} from './utilities/bridesmaids-helpers';

// Constants
// ???

// Components
import BridesmaidsProductGrid from './components/bridesmaids/BridesmaidsProductGrid';
import BridesmaidsFilterHeader from './components/bridesmaids/BridesmaidsFilterHeader';
// import BridesmaidsColorSelect from './components/bridesmaids/BridesmaidsColorSelect';
// import BridesmaidsSilhouetteSelect from './components/bridesmaids/BridesmaidsSilhouetteSelect';
// import BridesmaidsLengthSelect from './components/bridesmaids/BridesmaidsLengthSelect';
// import BridesmaidsTopDetailSelect from './components/bridesmaids/BridesmaidsTopDetailSelect';
// import ErrorMessage from './components/generic/ErrorMessage';
import BridesmaidsFilterModal from './components/bridesmaids/bridesmaids-filter-modal/BridesmaidsFilterModal';

// CSS
import '../css/components/BridesmaidsFilterResultsApp.scss';
import '../css/components/SuperCollection.scss';


// // Configure Error Tracking
// Raven
//   .config('https://bc3111a59f064fbba31becef25d2fb7c@sentry.io/88252')
//   .install();

function stateToProps({ $$bridesmaidsFilterState, $$modalState }) {
  const modalOpen = $$modalState.get('shouldAppear');
  const $$selectedLength = $$bridesmaidsFilterState.get('selectedLength');
  const $$selectedColor = $$bridesmaidsFilterState.get('selectedColor');
  return {
    bridesmaidsColors: $$bridesmaidsFilterState.get('$$bridesmaidsFilterColors').toJS(),
    lockBody: modalOpen,
    selectedColor: $$selectedColor ? $$selectedColor.toJS() : {},
    selectedLength: $$selectedLength ? $$selectedLength.toJS() : {},
    shouldChangeFilterPage: $$bridesmaidsFilterState.get('shouldChangeFilterPage'),
    bridesmaidsFilterObj: $$bridesmaidsFilterState.toJS(),
  };
}

function dispatchToProps(dispatch) {
  const actions = bindActionCreators(BridesmaidsFilterActions, dispatch);
  const modalActions = bindActionCreators(ModalActions, dispatch);
  return {
    activateModal: modalActions.activateModal,
    hydrateFiltersFromURL: actions.hydrateFiltersFromURL,
  };
}

class BridesmaidsFilterResultsApp extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      filteredDresses: [],
    };
  }

  componentDidMount() {
    const queryParams = win.location.search;
    const hasSearchQueryParams = !!queryParams;

    if (hasSearchQueryParams) {
      const parsedQueryObj = qs.parse(queryParams.slice(1));

      getFilteredResults(queryParams).end((err, res) => {
        // eslint-disable-next-line
        console.log('getFilteredResults()', res.body.bridesmaid);
        this.setState({
          filteredDresses: res.body.bridesmaid,
        });
      });

      this.props.hydrateFiltersFromURL({
        selectedColor: parsedQueryObj.selectedColor || '',
        selectedSilhouette: parsedQueryObj.selectedSilhouette || '',
        selectedLength: parsedQueryObj.selectedLength || '',
        selectedTopDetails: parsedQueryObj.selectedTopDetails || [],
      });
    } else {
      // eslint-disable-next-line
      console.log('NO QUERY PARAMS PRESENT IN URL!');
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.shouldChangeFilterPage) {
      loadFilteredResultsPage(nextProps.bridesmaidsFilterObj);
    }
  }

  componentDidUpdate() {
    if (win && win.fixBody) {
      win.fixBody(this.props.lockBody);
    }
  }

  render() {
    const {
      filteredDresses,
    } = this.state;

    const {
      activateModal,
      bridesmaidsColors,
      lockBody,
      selectedColor,
      selectedLength,
    } = this.props;

    const heroImagePath = 'https://s3.amazonaws.com/fandp-web-production-marketing/custom-dresses/bridesmaid/hero-tiles/hero-filter-result';
    const imagePathDesktop = `${heroImagePath}.jpg`;
    const imagePathTablet = `${heroImagePath}--tablet.jpg`;
    const imagePathMobile = `${heroImagePath}--mobile.jpg`;

    return (
      <div className="__react_root__">
        <div className={`FlashSaleListApp Root__wrapper ${lockBody ? 'u-scroll-lock' : ''}`}>
          <div className="BridesmaidsHeader">
            <div className="BridesmaidsHeader__heroTile u-overlay-area">
              <picture>
                <source srcSet={imagePathDesktop} media="(min-width: 1025px)" />
                <source srcSet={imagePathTablet} media="(min-width: 577px) and (max-width: 1024px)" />
                <source srcSet={imagePathMobile} media="(max-width: 576px)" />
                <img
                  src={imagePathDesktop}
                  srcSet={imagePathDesktop}
                  alt="Buy custom bridesmaid dresses"
                  className="BridesmaidsHeader__heroTileImg u-overlay-area__media"
                />
              </picture>
            </div>
            <div className="BridesmaidsHeader__ctaWrapper u-overlay-area__overlay">
              <div className="grid grid-noGutter BridesmaidsHeader__grid">
                <div className="col-4_md-6_sm-6_xs-12" data-push-left="off-1_md-0_sm-0_xs-0">
                  <span className="SuperCollection-Header--cta">
                    <h1 className="BridesmaidsHeader__heading BridesmaidsHeader__heading--filterResult">
                      Here's <em className="u-italicize">your <br />exclusive</em> collection.
                    </h1>
                    <h2 className="BridesmaidsHeader__subheading BridesmaidsHeader__subheading--filterResult">
                      We tailored it for you.
                    </h2>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <BridesmaidsFilterHeader />
          <div className="grid-12-noGutter layout-container">
            <div className="col-12">
              <BridesmaidsProductGrid
                bridesmaidsColors={bridesmaidsColors}
                products={filteredDresses}
                selectedColor={selectedColor}
                selectedLength={selectedLength}
              />
            </div>
          </div>
        </div>
        <BridesmaidsFilterModal
          activateModal={activateModal}
        />
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
BridesmaidsFilterResultsApp.propTypes = {
  // Redux
  activateModal: PropTypes.func.isRequired,
  bridesmaidsColors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    presentation: PropTypes.string,
    hexValue: PropTypes.string,
    patternUrl: PropTypes.string,
  })).isRequired,
  bridesmaidsFilterObj: PropTypes.object.isRequired,
  lockBody: PropTypes.bool.isRequired,
  hydrateFiltersFromURL: PropTypes.func.isRequired,
  selectedColor: PropTypes.object.isRequired,
  selectedLength: PropTypes.object.isRequired,
};

// eslint-disable-next-line
export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(BridesmaidsFilterResultsApp));
