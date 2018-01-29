/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autobind from 'react-autobind';
import { assign } from 'lodash';
import { serializeObjectIntoQueryParams } from '../../utilities/BOM';
import win from '../../polyfills/windowPolyfill';

// Actions
import * as CollectionFilterSortActions from '../../actions/CollectionFilterSortActions';

// Libraries
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

// Components
import Select from '../form/Select';
import Button from '../generic/Button';
// Constants

// CSS
import '../../../css/components/CollectionFilter.scss';


function stateToProps({ $$collectionFilterSortState }) {
    // Which part of the Redux global state does our component want to receive as props?
  if ($$collectionFilterSortState) {
    const collectionFilterSortState = $$collectionFilterSortState.toJS();
    return {
      temporaryFilters: collectionFilterSortState.temporaryFilters,
      filters: assign({},
        {
          order: collectionFilterSortState.order,
          fastMaking: collectionFilterSortState.fastMaking,
          selectedColors: collectionFilterSortState.selectedColors,
          selectedSizes: collectionFilterSortState.selectedSizes,
          selectedDressLengths: collectionFilterSortState.selectedDressLengths,
          page: collectionFilterSortState.page,
        },
        //   // Include temporary filters if we are in a drawer
        //   (props.isDrawerLayout) ? collectionFilterSortState.temporaryFilters : {},
      ),
    };
  }
  return {};
}
function dispatchToProps(dispatch) {
  return bindActionCreators(CollectionFilterSortActions, dispatch);
}


class CollectionFilterSort extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  applyFilters(newTemporaryFilters) {
    const { filters } = this.props;
    const queryObj = {
      sort: newTemporaryFilters.sort,
      color: filters.selectedColors,
      length: filters.selectedDressLengths,
      size: filters.selectedSizes,
    };
    const serializedParams = serializeObjectIntoQueryParams(queryObj);
    win.location = `${win.location.origin}${win.location.pathname}?${serializedParams}`;
  }

  /**
   * FILTER/SORT Action Handlers
   **********************************
   */

  handleSortSelection({ option }) {
    const { temporaryFilters } = this.props;
    const newTemporaryFilters = assign({}, temporaryFilters, {
      sort: option.value,
    });
    this.applyFilters(newTemporaryFilters);
  }

  handleMobileSortSelection(option) {
    return () => {
      this.handleSortSelection({ option });
    };
  }


  buildMobileCollectionSort(options) {
    return (
      <div className="grid-middle">
        <ul className="u-center u-mt--normal">
          {options.map(opt => (
            <Button
              className="u-mt-small"
              secondary
              text={opt.name}
              handleClick={this.handleMobileSortSelection(opt)}
            />
          ))}
        </ul>
      </div>
    );
  }

  buildDestkopCollectionSort(options) {
    return (
      <div className="CollectionSort">
        <Select
          id="sort-option"
          className="sort-options"
          options={options}
          onChange={this.handleSortSelection}
        />
      </div>
    );
  }

  buildCollectionSort() {
    const { breakpoint, temporaryFilters } = this.props;
    const SORT_OPTIONS = [
      {
        id: 0,
        name: 'Price Low to High',
        value: 'asc',
        active: temporaryFilters.sort !== 'desc',
      },
      {
        id: 1,
        name: 'Price High to Low',
        value: 'desc',
        active: temporaryFilters.sort === 'desc',
      },
    ];

    if (breakpoint === 'mobile' || breakpoint === 'tablet') {
      return this.buildMobileCollectionSort(SORT_OPTIONS);
    }

    return this.buildDestkopCollectionSort(SORT_OPTIONS);
  }


  render() {
    return (
      <div>
        { this.buildCollectionSort() }
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
CollectionFilterSort.propTypes = {
  breakpoint: PropTypes.string.isRequired,
  filters: PropTypes.object.isRequired,
  temporaryFilters: PropTypes.object.isRequired,
};

export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(CollectionFilterSort));
