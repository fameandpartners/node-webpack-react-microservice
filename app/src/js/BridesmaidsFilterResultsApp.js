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


// // Configure Error Tracking
// Raven
//   .config('https://bc3111a59f064fbba31becef25d2fb7c@sentry.io/88252')
//   .install();

function stateToProps({ $$bridesmaidsFilterState, $$modalState }) {
  const modalOpen = $$modalState.get('shouldAppear');
  return {
    lockBody: modalOpen,
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

  componentWillUpdate(nextProps) {
    if (nextProps.shouldChangeFilterPage) {
      loadFilteredResultsPage(nextProps.bridesmaidsFilterObj);
    }
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

  render() {
    const {
      filteredDresses,
    } = this.state;

    const {
      activateModal,
      lockBody,
    } = this.props;

    return (
      <div className="__react_root__">
        <div className={`FlashSaleListApp Root__wrapper ${lockBody ? 'FlashSaleApp--scroll-lock' : ''}`}>
          <div className="FlashSaleBanner__wrapper grid-center-middle">
            Here's Your Exclusive Collection
          </div>
          <BridesmaidsFilterHeader />
          <div className="grid-12-noGutter layout-container">
            <div className="col-12">
              <BridesmaidsProductGrid products={filteredDresses} />
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
  bridesmaidsFilterObj: PropTypes.object.isRequired,
  lockBody: PropTypes.bool.isRequired,
  hydrateFiltersFromURL: PropTypes.func.isRequired,
};

// eslint-disable-next-line
export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(BridesmaidsFilterResultsApp));
