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

// Assets
import FlashSaleBannerImageDesktop from '../img/flash_sale/SampleSale-Banner-Desktop.jpg';
import FlashSaleBannerImageMobile from '../img/flash_sale/SampleSale-Banner-Mobile.jpg';

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
import Button from './components/generic/Button';

// CSS
import '../css/components/FlashSaleListApp.scss';

const FILTER_OPTIONS = {
  asc: 'Lowest to Highest',
  desc: 'Highest to Lowest',
  newest: 'Lowest To Highest',
};


// Configure Error Tracking
Raven
  .config('https://bc3111a59f064fbba31becef25d2fb7c@sentry.io/88252')
  .install();


function stateToProps({ $$collectionFilterSortState, $$flashSaleState }) {
  const pageDresses = $$flashSaleState.get('$$pageDresses').toJS();

  return {
    lockBody: false,
    pageDresses,
    sort: $$collectionFilterSortState.get('temporaryFilters').get('sort'),
    page: $$collectionFilterSortState.get('temporaryFilters').get('page'),
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
      totalPages: null,
    };

    autobind(this);
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

  componentWillMount() {
    const queryParams = win.location.search;
    const parsedQueryObj = qs.parse(queryParams.slice(1));

    this.setState({
      productsCurrentPage: Number(parsedQueryObj.page) || this.props.page,
      // eslint-disable-next-line
      totalPages: this.props.pageDresses.length ? Number(this.props.pageDresses[0].total_pages) : this.props.page,
    });
  }

  componentDidMount() {
    const queryParams = win.location.search;
    const hasSearchQueryParams = !!queryParams;

    if (hasSearchQueryParams) {
      const parsedQueryObj = qs.parse(queryParams.slice(1));
      this.props.hydrateFiltersFromURL({
        page: parsedQueryObj.page,
        sort: parsedQueryObj.sort || 'asc',
        selectedColors: parsedQueryObj.color || [],
        selectedSizes: parsedQueryObj.size,
        selectedDressLengths: parsedQueryObj.length || [],
      });
    }
  }


  render() {
    const {
      breakpoint,
      lockBody,
      pageDresses,
      sort,
    } = this.props;

    const {
      productsCurrentPage,
      totalPages,
    } = this.state;

    return (
      <div className="__react_root__">
        <div className={`FlashSaleListApp Root__wrapper ${lockBody ? 'FlashSaleApp--scroll-lock' : ''}`}>

          <div className="FlashSaleBanner__wrapper">
            <img
              className="FlashSaleBanner__image FlashSaleBanner__image--desktop"
              src={FlashSaleBannerImageDesktop} alt="40% off Sample Sale"
            />
            <img
              className="FlashSaleBanner__image FlashSaleBanner__image--mobile"
              src={FlashSaleBannerImageMobile} alt="40% off Sample Sale"
            />
          </div>

          <div className="grid-12-noGutter layout-container">

            <div className="col-3_sm-12_lg-3">
              { breakpoint === 'mobile' || breakpoint === 'tablet'
                ? (
                  <div>
                    <Button
                      className="u-mt-small"
                      secondary
                      text="Open Filters"
                      handleClick={this.handleOpenFiltersClick}
                    />
                  </div>
                )
                : <CollectionFilter />
              }
            </div>

            <div className="col-9_sm-12_lg-9 u-mt--normal layout-container">
              <div className="grid-12">
                <div className="col-12">
                  { breakpoint === 'mobile' || breakpoint === 'tablet'
                    ? (
                      <div>
                        <span
                          className="link"
                          onClick={this.handleOpenSortClick}
                        >
                          <span>
                            Sort By:&nbsp;
                            <span className="u-capitalize">
                              {FILTER_OPTIONS[sort]}
                            </span>
                          </span>
                        </span>
                      </div>
                    )
                    : <CollectionSort />
                  }
                </div>
                <div className="col-12">
                  <FlashSaleProductGrid products={pageDresses} />
                </div>
              </div>
              { pageDresses.length ?
                (
                  <FlashSalePagination
                    page={productsCurrentPage}
                    totalPages={totalPages}
                    totalItems={pageDresses.length}
                  />
                ) : null
              }
              { pageDresses.length < 96 ?
                <div className="grid-12">
                  <div className="col-12">
                    <div className="FlashSaleProduct__footerMessageWrapper u-mt--normal">
                      <span className="FlashSaleProduct__footerMessage">
                        Didn't find what you are looking for?
                        <br />
                        <a href="/dresses/best-sellers">
                          Shop Best Sellers
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
                :
                null
              }
            </div>
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
  page: PropTypes.number,
  sort: PropTypes.string,
};

FlashSaleListApp.defaultProps = {
  sort: 'Newest',
  page: 1,
};

export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(FlashSaleListApp));
