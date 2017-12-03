import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import qs from 'qs';
import { bindActionCreators } from 'redux';

// Sentry Error Tracking
import Raven from 'raven-js';

// Libraries
import Resize from './decorators/Resize';
import PDPBreakpoints from './libs/PDPBreakpoints';

// Actions
import * as CollectionFilterSortActions from './actions/CollectionFilterSortActions';
import * as ModalActions from './actions/ModalActions';

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

// Constants
import ModalConstants from './constants/ModalConstants';

// Components
import CollectionFilter from './components/flash_sale/CollectionFilter';
import CollectionSort from './components/flash_sale/CollectionSort';
import FilterSortSelectionModal from './components/flash_sale/FilterSortSelectionModal';
import FlashSaleProductGrid from './components/flash_sale/FlashSaleProductGrid';
import FlashSalePagination from './components/flash_sale/FlashSalePagination';


// Configure Error Tracking
Raven
  .config('https://bc3111a59f064fbba31becef25d2fb7c@sentry.io/88252')
  .install();


function stateToProps({ $$flashSaleState }) {
  const pageDresses = $$flashSaleState.get('$$pageDresses').toJS();

  return {
    lockBody: false,
    pageDresses,
  };
}

function dispatchToProps(dispatch) {
  const { activateModal } = bindActionCreators(ModalActions, dispatch);
  const actions = bindActionCreators(CollectionFilterSortActions, dispatch);
  return {
    activateModal,
    hydrateFiltersFromURL: actions.hydrateFiltersFromURL,
  };
}

class FlashSaleListApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      productsCurrentPage: null,
    };

    autobind(this);
  }

  componentWillMount() {
    const queryParams = win.location.search;
    const parsedQueryObj = qs.parse(queryParams.slice(1));

    this.setState({
      productsCurrentPage: Number(parsedQueryObj.page),
    });
  }

  componentDidMount() {
    const queryParams = win.location.search;
    const hasSearchQueryParams = !!queryParams;

    if (hasSearchQueryParams) {
      const parsedQueryObj = qs.parse(queryParams.slice(1));
      this.props.hydrateFiltersFromURL({
        page: parsedQueryObj.page,
        sort: parsedQueryObj.sort,
        selectedColors: parsedQueryObj.color || [],
        selectedSizes: parsedQueryObj.size,
        selectedDressLengths: parsedQueryObj.length || [],
      });
    }
  }

  handleOpenFiltersClick() {
    this.props.activateModal({
      modalId: ModalConstants.FILTER_SELECTION_MODAL,
    });
  }

  handleOpenSortClick() {
    this.props.activateModal({
      modalId: ModalConstants.SORT_SELECTION_MODAL,
    });
  }

  render() {
    const {
      breakpoint,
      lockBody,
      pageDresses,
    } = this.props;

    const {
      productsCurrentPage,
    } = this.state;

    return (
      <div className="__react_root__">
        <div className={`FlashSaleListApp Root__wrapper ${lockBody ? 'FlashSaleApp--scroll-lock' : ''}`}>
          <div className="grid-12 layout-container">

            <div className="col-3_sm-12_lg-3">
              { breakpoint === 'mobile' || breakpoint === 'tablet'
                ? (
                  <div>
                    <a
                      className="link link--static"
                      onClick={this.handleOpenFiltersClick}
                    >
                      Open Filters
                    </a>
                  </div>
                )
                : <CollectionFilter />
              }
            </div>

            <div className="col-9_sm-12_lg-9">
              <div className="grid-12">
                <div className="col-12">
                  { breakpoint === 'mobile' || breakpoint === 'tablet'
                    ? (
                      <div>
                        <a
                          className="link link--static"
                          onClick={this.handleOpenSortClick}
                        >
                          Open Sort
                        </a>
                      </div>
                    )
                    : <CollectionSort />
                  }
                </div>
                <div className="col-12">
                  <FlashSaleProductGrid products={pageDresses} />
                </div>
              </div>
            </div>
            { productsCurrentPage ?
              (
                <div className="col-3" data-push-left="off-9">
                  <FlashSalePagination
                    page={productsCurrentPage}
                    totalItems={pageDresses.length}
                  />
                </div>
              ) : null
            }
          </div>
        </div>

        <FilterSortSelectionModal />
      </div>
    );
  }
}

FlashSaleListApp.propTypes = {
  // Decorator
  breakpoint: PropTypes.bool.isRequired,
  // Redux
  lockBody: PropTypes.bool.isRequired,
  // Redux Functions
  hydrateFiltersFromURL: PropTypes.func.isRequired,
  activateModal: PropTypes.func.isRequired,
  pageDresses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    images: PropTypes.array,
    original_price: PropTypes.number,
    current_price: PropTypes.number,
    size: PropTypes.string,
    color: PropTypes.string,
    permalink: PropTypes.string,
  })).isRequired,
};

export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(FlashSaleListApp));
