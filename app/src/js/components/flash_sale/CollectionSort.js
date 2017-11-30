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
          selectedDressSize: collectionFilterSortState.selectedDressSize,
          selectedDressLengths: collectionFilterSortState.selectedDressLengths,
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
      page: filters.page,
      sort: newTemporaryFilters.sort,
      color: filters.selectedColors,
      length: filters.selectedDressLengths,
      size: filters.selectedDressSize,
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

  buildCollectionSort() {
    const SORT_OPTIONS = [
      {
        id: 0,
        name: 'Prices Low to High',
        value: 'asc',
        active: true,
      },
      {
        id: 1,
        name: 'Prices High to Low',
        value: 'desc',
      },
    ];


    return (
      <Select
        id="sort-option"
        className="sort-options"
        options={SORT_OPTIONS}
        onChange={this.handleSortSelection}
      />
    );
  }


  render() {
    return (
      <div className="CollectionSort">
        { this.buildCollectionSort() }
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
CollectionFilterSort.propTypes = {
  filters: PropTypes.object.isRequired,
  temporaryFilters: PropTypes.object.isRequired,
};

export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(CollectionFilterSort));
