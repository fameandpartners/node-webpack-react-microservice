import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
// import qs from 'qs';
import { bindActionCreators } from 'redux';

// // Sentry Error Tracking
// import Raven from 'raven-js';

// Libraries
import Resize from './decorators/Resize';
import PDPBreakpoints from './libs/PDPBreakpoints';

// Actions
import * as BridesmaidsFilterActions from './actions/BridesmaidsFilterActions';

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
// import win from './polyfills/windowPolyfill';
import {
  transformFilterColors,
  transformFilterSilhouettes,
  transformFilterLengths,
  transformFilterTopDetails,
  loadFilteredResultsPage,
} from './utilities/bridesmaids-helpers';

// Constants
// ???

// Components
import BridesmaidsColorSelect from './components/bridesmaids/BridesmaidsColorSelect';
import BridesmaidsSilhouetteSelect from './components/bridesmaids/BridesmaidsSilhouetteSelect';
import BridesmaidsLengthSelect from './components/bridesmaids/BridesmaidsLengthSelect';
import BridesmaidsTopDetailSelect from './components/bridesmaids/BridesmaidsTopDetailSelect';
import EmailCapture from './components/generic/EmailCapture';
import ErrorMessage from './components/generic/ErrorMessage';

// CSS
import '../css/components/BridesmaidsFilterApp.scss';


// // Configure Error Tracking
// Raven
//   .config('https://bc3111a59f064fbba31becef25d2fb7c@sentry.io/88252')
//   .install();


function stateToProps({ $$bridesmaidsFilterState }) {
  const filterColors = transformFilterColors(
    $$bridesmaidsFilterState.get('$$bridesmaidsFilterColors').toJS(),
  );
  const filterSilhouettes = transformFilterSilhouettes(
    $$bridesmaidsFilterState.get('$$bridesmaidsFilterSilhouettes').toJS(),
  );
  const filterLengths = transformFilterLengths(
    $$bridesmaidsFilterState.get('$$bridesmaidsFilterLengths').toJS(),
  );
  const filterTopDetails = transformFilterTopDetails(
    $$bridesmaidsFilterState.get('$$bridesmaidsFilterTopDetails').toJS(),
  );

  const selectedColor = $$bridesmaidsFilterState.get('selectedColor');
  const selectedSilhouette = $$bridesmaidsFilterState.get('selectedSilhouette');
  const selectedLength = $$bridesmaidsFilterState.get('selectedLength');
  const selectedTopDetails = $$bridesmaidsFilterState.get('selectedTopDetails');

  return {
    lockBody: false,
    filterColors,
    filterSilhouettes,
    filterLengths,
    filterTopDetails,
    // TO-DO: just pass these down to their respective components
    selectedColorId: selectedColor ? selectedColor.get('id') : null,
    selectedSilhouetteId: selectedSilhouette ? selectedSilhouette.get('id') : null,
    selectedLengthId: selectedLength ? selectedLength.get('id') : null,
    selectedTopDetails: selectedTopDetails ? selectedTopDetails.toJS() : null,

    // temp. (given the above)
    bridesmaidsFilterObj: $$bridesmaidsFilterState.toJS(),
  };
}

function dispatchToProps(dispatch) {
  const actions = bindActionCreators(BridesmaidsFilterActions, dispatch);
  return {
    hydrateFiltersFromURL: actions.hydrateFiltersFromURL,
  };
}

class BridesmaidsFilterApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attemptedFormSubmit: false,
    };

    autobind(this);
  }

  // componentWillMount() {
  //   /**
  //    * NOTE:
  //    *   Do we still need something like this for the
  //    *   bridesmaids filter?
  //    */

  //   const queryParams = win.location.search;
  //   const parsedQueryObj = qs.parse(queryParams.slice(1));

  //   this.setState({
  //     productsCurrentPage: Number(parsedQueryObj.page) || this.props.page,
  //   eslint-disable-next-line
  //     totalPages: this.props.pageDresses.length ? Number(this.props.pageDresses[0].total_pages) : this.props.page,
  //   });
  // }

  // componentDidMount() {
  //   const queryParams = win.location.search;
  //   const hasSearchQueryParams = !!queryParams;

  //   if (hasSearchQueryParams) {
  //     const parsedQueryObj = qs.parse(queryParams.slice(1));
  //     this.props.hydrateFiltersFromURL({
  //       page: parsedQueryObj.page,
  //       sort: parsedQueryObj.sort || 'asc',
  //       selectedColors: parsedQueryObj.color || [],
  //       selectedSizes: parsedQueryObj.size,
  //       selectedDressLengths: parsedQueryObj.length || [],
  //     });
  //   }
  // }

  handleFilterSelectionSubmit() {
    const {
      /* eslint-disable react/prop-types */
      selectedColorId,
      selectedSilhouetteId,
      selectedLengthId,
      selectedTopDetails,
      bridesmaidsFilterObj,
      /* eslint-enable react/prop-types */
    } = this.props;

    this.setState({
      attemptedFormSubmit: true,
    });

    // TO-DO: seriously? ...fix this
    if (selectedColorId && selectedSilhouetteId && selectedLengthId && selectedTopDetails) {
      console.log('FORM READY TO SUBMIT');
      loadFilteredResultsPage(bridesmaidsFilterObj);
    } else {
      console.log('INCOMPLETE FILTER SELECTIONS');
    }
  }

  render() {
    const {
      breakpoint,
      lockBody,
      filterColors,
      filterSilhouettes,
      filterLengths,
      filterTopDetails,
      /* eslint-disable react/prop-types */
      selectedColorId,
      selectedSilhouetteId,
      selectedLengthId,
      selectedTopDetails,
      /* eslint-enable react/prop-types */
    } = this.props;

    const {
      attemptedFormSubmit,
    } = this.state;

    return (
      <div className="__react_root__">
        <div className={`FlashSaleListApp Root__wrapper ${lockBody ? 'FlashSaleApp--scroll-lock' : ''}`}>
          <div className="FlashSaleBanner__wrapper">
            { breakpoint === 'mobile' || breakpoint === 'tablet'
              ? (
                <h1>
                  Find the <em>Perfect</em> Dress
                </h1>
              )
              : (
                <h1>
                  Create Your Own Custom Dress Collection
                </h1>
              )
            }
          </div>
          <div className="grid-12-noGutter layout-container">
            <h2>Choose your color</h2>
            <div className="col-12">
              <BridesmaidsColorSelect
                filterColors={filterColors}
              />
              <ErrorMessage
                displayCondition={attemptedFormSubmit && !selectedColorId}
                message="Please select a dress color."
              />
            </div>
            <h2>Choose your silhouette</h2>
            <div className="col-12">
              <BridesmaidsSilhouetteSelect
                filterSilhouettes={filterSilhouettes}
              />
              <ErrorMessage
                displayCondition={attemptedFormSubmit && !selectedSilhouetteId}
                message="Please select a dress silhouette."
              />
            </div>
            <div className="col-12">
              <h2>Choose your length</h2>
              <BridesmaidsLengthSelect
                filterLengths={filterLengths}
              />
              <ErrorMessage
                displayCondition={attemptedFormSubmit && !selectedLengthId}
                message="Please select a dress length."
              />
            </div>
            <div className="col-12">
              <h2>Choose the top details you like</h2>
              <BridesmaidsTopDetailSelect
                filterTopDetails={filterTopDetails}
              />
              <ErrorMessage
                displayCondition={attemptedFormSubmit && (selectedTopDetails.length < 1)}
                message="Please select at least one dress top detail."
              />
            </div>
          </div>
          <div className="grid-12">
            <div className="BridesmaidsFilterAppEmailCapture__wrapper col-12">
              <h2>
                <em>Your Collection</em> is waiting.
                <br />
                Enter your email to get access.
              </h2>
              <EmailCapture
                className="u-text-align--left"
                service="bronto"
              />
              <a
                onClick={() => this.handleFilterSelectionSubmit()}
                className="u-cursor--pointer"
              >
                Just take me to my Tailor-Made Market
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BridesmaidsFilterApp.propTypes = {
  // Decorator
  breakpoint: PropTypes.string.isRequired,
  // Redux
  lockBody: PropTypes.bool.isRequired,
  // Redux Functions
  // hydrateFiltersFromURL: PropTypes.func.isRequired,
  filterColors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    hexValue: PropTypes.string,
    patternUrl: PropTypes.string,
  })).isRequired,
  filterSilhouettes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
  })).isRequired,
  filterLengths: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
  })).isRequired,
  filterTopDetails: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
  })).isRequired,
};

export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(BridesmaidsFilterApp));
