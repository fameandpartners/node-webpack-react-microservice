/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autobind from 'react-autobind';
import { assign } from 'lodash';

// Actions
import * as CollectionFilterSortActions from '../../actions/CollectionFilterSortActions';

// Libraries
import win from '../../polyfills/windowPolyfill';
import { hasLegacyInstance } from '../../utilities/CollectionFilterSortUtilities';
import { serializeObjectIntoQueryParams } from '../../utilities/BOM';

// Components
import ExpandablePanelItem from './ExpandablePanelItem';
import Button from '../generic/Button';

// Constants
import CollectionFilterSortConstants from '../../constants/CollectionFilterSortConstants';

// CSS
import '../../../css/components/CollectionFilter.scss';

const { FILTER_DEFAULTS } = CollectionFilterSortConstants;

function stateToProps({ $$collectionFilterSortState }, props) {
  console.log('$$collectionFilterSortState', $$collectionFilterSortState.toJS());
    // Which part of the Redux global state does our component want to receive as props?
  if ($$collectionFilterSortState) {
    const collectionFilterSortState = $$collectionFilterSortState.toJS();
    return {
          // Immutable Defaults
      $$colors: $$collectionFilterSortState.get('$$colors'),
      $$dressLengths: $$collectionFilterSortState.get('$$dressLengths'),
      $$sizes: $$collectionFilterSortState.get('$$sizes'),
          // Mutable props
      isDrawerLayout: props.isDrawerLayout,
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
      temporaryFilters: collectionFilterSortState.temporaryFilters,
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

    /**
     * IMMUTABLE Removes option in array if present, adds to end if not
     * @param  {Array} selectedOptions
     * @param  {String} val
     * @return {Array} new array of values
     */
  addOrRemoveFrom(selectedOptions, changeOption) {
    let newSelections = [];
    const selectedOptionIndex = selectedOptions.indexOf(changeOption);
    if (selectedOptionIndex > -1) {
      newSelections = [
        ...selectedOptions.slice(0, selectedOptionIndex),
        ...selectedOptions.slice(selectedOptionIndex + 1),
      ];
    } else {
      newSelections = selectedOptions.concat(changeOption);
    }
    return newSelections;
  }

    /**
     * Reaches into legacy application to control toggling of mobile filters
     * Ugly. I know. But this is how we sprinkle in react components with prexisting framework
     */
  handleFilterCancel() {
    return () => {
      if (hasLegacyInstance()) {
        this.props.setTemporaryFilters({});
        win.ProductCollectionFilter__Instance.toggleFilters();
      }
    };
  }

  handleFilterApply() {
    const { filters, temporaryFilters } = this.props;
    return () => {
      const queryObj = {
        page: filters.page,
        sort: filters.sort,
        color: temporaryFilters.selectedColors,
        length: temporaryFilters.selectedDressLengths,
        size: temporaryFilters.selectedDressSize,
      };
      const serializedParams = serializeObjectIntoQueryParams(queryObj);
      win.location = `${win.location.origin}${win.location.pathname}?${serializedParams}`;
    };
  }

    /**
     * FILTER/SORT Action Handlers
     **********************************
     */
  handleClearAll() {
    const {
        clearAllCollectionFilters,
        isDrawerLayout,
        setTemporaryFilters,
        updateExternalLegacyFilters,
      } = this.props;

    if (isDrawerLayout) {
      setTemporaryFilters(FILTER_DEFAULTS);
    } else {
      clearAllCollectionFilters();
      updateExternalLegacyFilters(FILTER_DEFAULTS);
    }
  }

  handleColorSelection({ name }) {
    const {
        setTemporaryFilters,
        temporaryFilters,
      } = this.props;
    const newColors = this.addOrRemoveFrom(temporaryFilters.selectedColors, name);

    setTemporaryFilters(assign({}, temporaryFilters, {
      selectedColors: newColors,
    }));
  }

  handleDressSizeSelection({ value }) {
    return () => {
      const {
        setTemporaryFilters,
        temporaryFilters,
      } = this.props;

      setTemporaryFilters(assign({}, temporaryFilters, {
        selectedDressSize: value,
      }));
    };
  }

  handleDressLengthSelection(dressLength) {
    return () => {
      const { setTemporaryFilters, temporaryFilters } = this.props;
      const newDressLengths = this.addOrRemoveFrom(temporaryFilters.selectedDressLengths, dressLength.id).sort();
      setTemporaryFilters(assign({}, temporaryFilters, {
        selectedDressLengths: newDressLengths,
      }));
    };
  }


  /**
   * RENDERERS
   * ***************************************************
   */
  buildSizeOption(size) {
    const { temporaryFilters } = this.props;
    return (
      <div key={size.id} className="col-3">
        <Button
          tertiary
          tall
          selected={size.id === temporaryFilters.selectedDressSize}
          text={`US ${size.value}`}
          handleClick={this.handleDressSizeSelection(size)}
        />
      </div>
    );
  }

  buildColorOption(color) {
    const { selectedColors } = this.props.temporaryFilters;
    const { name, id } = color;
    const inverse = name.toLowerCase().indexOf('white') > -1 ? 'inverse' : '';
    return (
      <label htmlFor={`color-${name}`} key={`color-${id}`} className="ExpandablePanel__option ExpandablePanel__listColumn">
        <input
          id={`color-${name}`}
          type="checkbox"
          value={name}
          checked={selectedColors.indexOf(name) > -1}
          onChange={this.handleColorSelection.bind(this, color)}
        />
        <span className="ExpandablePanel__optionColorFallback" />
        <span className={`ExpandablePanel__optionCheck--rounded ExpandablePanel__optionCheck--tick ${inverse} color-${name}`} />
        <span className="ExpandablePanel__optionName">{name}</span>
      </label>
    );
  }

  buildDressLengths(dressLength) {
    const { temporaryFilters } = this.props;
    const { selectedDressLengths = [] } = temporaryFilters;
    return (
      <label
        key={`length-${dressLength.id}`}
        className="col-6 ExpandablePanel__option ExpandablePanel__listColumn" name="dress-length"
        htmlFor={`dress-length-${dressLength.id}`}
      >
        <input
          checked={selectedDressLengths.indexOf(dressLength.value) > -1}
          onChange={this.handleDressLengthSelection(dressLength)}
          data-all="false"
          id={`dress-length-${dressLength.id}`}
          name={`dress-length-${dressLength.id}`}
          type="checkbox"
          value={dressLength.value}
        />
        <span className="checkboxBlackBg__check">
          <span className="ExpandablePanel__optionName">{dressLength.name}</span>
        </span>
      </label>
    );
  }

  //
  // generatePriceSummary(selectedPriceIds) {
  //   const selectedPrices = selectedPriceIds.map(id => find(PRICES, { id }));
  //   if (PRICES.length === selectedPriceIds.length || selectedPriceIds.length === 0) { // All
  //     return (this.generateSelectedItemSpan('all', 'All Prices', 'price'));
  //   }
  //
  //   if (selectedPrices.length === 1 ||
  //     (selectedPrices.length === 2 && selectedPrices.indexOf(PRICES[1]) < 0)) { // Individual Elems
  //     return selectedPrices.map(p => this.generateSelectedItemSpan(p.id, p.presentation));
  //   }
  //
  //     // Combined pricing
  //   const combinedSelectedPrices = selectedPrices.reduce((acc, c) => acc.concat(c.range), []);
  //   return this.generateSelectedItemSpan(
  //       'combined',
  //       `$${Math.min(...combinedSelectedPrices)} - $${Math.max(...combinedSelectedPrices)}`,
  //     );
  // }

  render() {
    const {
      $$colors,
      $$dressLengths,
      $$sizes,
      isDrawerLayout,
    } = this.props;

    return (
      <div className="CollectionFilterSort">
        <div className="FilterSort">
          <div className="ExpandablePanel--wrapper">
            <div className="ExpandablePanel__heading">
              <span className="ExpandablePanel__mainTitle">{isDrawerLayout ? 'Filter' : 'Filter by'}</span>
            </div>

            <ExpandablePanelItem
              forceOpen
              isActive
              openedByDefault
              itemGroup={(
                <div>
                  <div className="ExpandablePanel__name">
                    Size
                  </div>
                </div>
              )}
              revealedContent={(
                <div
                  className="ExpandablePanel__listOptions ExpandablePanel__listOptions--panelColors clearfix"
                >
                  <div className="ExpandablePanel__listTwoColumns">
                    <div className="ProductCustomizationSize__size grid-12-spaceBetween">
                      {
                        $$sizes.toJS().map(size => this.buildSizeOption(size))
                      }
                    </div>
                  </div>
                </div>
              )}
            />

            <ExpandablePanelItem
              forceOpen
              isActive
              openedByDefault
              itemGroup={(
                <div>
                  <div className="ExpandablePanel__name">
                    Color
                  </div>
                  <div className="ExpandablePanel__selectedOptions">
                    clear all
                  </div>
                </div>
              )}
              revealedContent={(
                <div
                  className="ExpandablePanel__listOptions ExpandablePanel__listOptions--panelColors clearfix"
                >
                  <div className="ExpandablePanel__listTwoColumns">
                    {
                      $$colors.toJS().map(c => this.buildColorOption(c))
                    }
                  </div>
                </div>
              )}
            />
          </div>

          <ExpandablePanelItem
            forceOpen
            isActive
            openedByDefault
            itemGroup={(
              <div>
                <div className="ExpandablePanel__name">
                  Length
                </div>
              </div>
            )}
            revealedContent={(
              <div
                className="ExpandablePanel__listOptions ExpandablePanel__listOptions--panelColors clearfix"
              >
                <div>
                  <div className="ProductCustomizationSize__size grid-12-spaceBetween">
                    {
                      $$dressLengths.toJS().map(dressLength => this.buildDressLengths(dressLength))
                    }
                  </div>
                </div>
              </div>
            )}
          />

          {!isDrawerLayout ?
            <div className="ExpandablePanel__action">
              <div className="ExpandablePanel__filterTriggers--cancel-apply">
                <a
                  onClick={this.handleFilterCancel()}
                  className="link link--static u-mr--small"
                >
                    Cancel
                </a>
                <a
                  onClick={this.handleFilterApply()}
                  className="link link--static"
                >
                  Apply
                </a>
              </div>
            </div> : null
            }
        </div>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
CollectionFilterSort.propTypes = {
  // breakpoint: PropTypes.string,
  isDrawerLayout: PropTypes.bool.isRequired,
  $$colors: PropTypes.object.isRequired,
  $$dressLengths: PropTypes.object.isRequired,
  $$sizes: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  temporaryFilters: PropTypes.object.isRequired,

    // Redux Actions
  clearAllCollectionFilters: PropTypes.func.isRequired,
  setTemporaryFilters: PropTypes.func.isRequired,
  updateExternalLegacyFilters: PropTypes.func.isRequired,
};

export default connect(stateToProps, dispatchToProps)(CollectionFilterSort);
