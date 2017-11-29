/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autobind from 'react-autobind';
import { assign, find } from 'lodash';
import pluralize from 'pluralize';
import win from '../../polyfills/windowPolyfill';

// Actions
import * as CollectionFilterSortActions from '../../actions/CollectionFilterSortActions';

// Libraries
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';
import { hasLegacyInstance } from '../../utilities/CollectionFilterSortUtilities';

// Components
import ExpandablePanelItem from './ExpandablePanelItem';
import Button from '../generic/Button';

// Constants
import CollectionFilterSortConstants from '../../constants/CollectionFilterSortConstants';

// CSS
import '../../../css/components/CollectionFilter.scss';

const { PRICES, FILTER_DEFAULTS } = CollectionFilterSortConstants;

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
          selectedPrices: collectionFilterSortState.selectedPrices,
          selectedShapes: collectionFilterSortState.selectedShapes,
          selectedStyles: collectionFilterSortState.selectedStyles,
        },
            // Include temporary filters if we are in a drawer
            (props.isDrawerLayout) ? collectionFilterSortState.temporaryFilters : {},
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
    const {
        applyTemporaryFilters,
        setTemporaryFilters,
        temporaryFilters,
      } = this.props;
    return () => {
      applyTemporaryFilters(temporaryFilters);
      setTemporaryFilters({});
      this.props.updateExternalLegacyFilters(temporaryFilters);
      if (hasLegacyInstance()) { win.ProductCollectionFilter__Instance.toggleFilters(false); }
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
        isDrawerLayout,
        filters,
        setSelectedColors,
        setTemporaryFilters,
        temporaryFilters,
        updateExternalLegacyFilters,
      } = this.props;
    const newColors = this.addOrRemoveFrom(filters.selectedColors, name);

    if (isDrawerLayout) { // mobile, temporary setting
      setTemporaryFilters(assign({}, temporaryFilters, {
        selectedColors: newColors,
      }));
    } else {
      setSelectedColors(newColors);
      updateExternalLegacyFilters({ selectedColors: newColors });
    }
  }

  updatePrice(newPrices) {
    const {
        isDrawerLayout,
        setSelectedPrices,
        setTemporaryFilters,
        temporaryFilters,
        updateExternalLegacyFilters,
      } = this.props;

    if (isDrawerLayout) { // mobile, temporary setting
      setTemporaryFilters(assign({}, temporaryFilters, {
        selectedPrices: newPrices,
      }));
    } else {
      setSelectedPrices(newPrices);
      updateExternalLegacyFilters({ selectedPrices: newPrices });
    }
  }

  handlePriceSelection(id) {
    const { filters } = this.props;
    return () => {
      const newPrices = this.addOrRemoveFrom(filters.selectedPrices, id).sort();
      this.updatePrice(newPrices);
    };
  }

  updateStyles(newStyles) {
    const {
        isDrawerLayout,
        setSelectedStyles,
        setTemporaryFilters,
        temporaryFilters,
      } = this.props;

    if (isDrawerLayout) { // mobile version
      setTemporaryFilters(assign({}, temporaryFilters, {
        selectedStyles: newStyles,
      }));
    } else {
      setSelectedStyles(newStyles);
      this.props.updateExternalLegacyFilters({
        selectedStyles: newStyles,
      });
    }
  }

  handleDressSizeSelection({ value }) {
    console.log('handling dress size selection', value);
  }

  handleStyleSelection(style) {
    return () => {
      const styleId = style.permalink;
      const newStyles = this.addOrRemoveFrom(this.props.filters.selectedStyles, styleId).sort();
      this.updateStyles(newStyles);
    };
  }

  handleShapeSelection(shapeId) {
    return () => {
      const newShapes = this.addOrRemoveFrom(this.props.filters.selectedShapes, shapeId).sort();
      this.updateShapes(newShapes);
    };
  }


  handleFastMaking() {
    const {
        filters,
        isDrawerLayout,
        setFastMaking,
        setTemporaryFilters,
        temporaryFilters,
      } = this.props;
    const { fastMaking } = filters;
    const newFastMaking = { fastMaking: !fastMaking };

    return () => {
      if (isDrawerLayout) {
        setTemporaryFilters(assign({}, temporaryFilters, newFastMaking));
      } else {
        setFastMaking(!fastMaking);
        this.props.updateExternalLegacyFilters(newFastMaking);
      }
    };
  }


  /**
   * RENDERERS
   * ***************************************************
   */
  buildSizeOption(size) {
    // selected = s === temporaryDressSize
    return (
      <div key={size.id} className="col-3">
        <Button
          tertiary
          tall
          text={`US ${size.value}`}
          handleClick={this.handleDressSizeSelection(size)}
        />
      </div>
    );
  }

  buildColorOption(color) {
    const { selectedColors } = this.props.filters;
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
    // checked={selectedShapes.indexOf(shape) > -1}
    return (
      <label
        key={`length-${dressLength.id}`}
        className="col-6 ExpandablePanel__option ExpandablePanel__listColumn" name="dress-length"
        htmlFor={`dress-length-${dressLength.id}`}
      >
        <input
          onChange={this.handleShapeSelection(dressLength)}
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

  generateSelectedItemSpan(id, presentation, category = 'elem') {
    return (
      <span key={`${category}-${id}`} className="ExpandablePanel__selectedItem">{presentation}</span>
    );
  }

  generateColorSummary(selectedColorNames) {
    const selectedColors = selectedColorNames.map(name =>
        find(this.props.$$colors.toJS(), { name }),
      );
    const selectedCount = selectedColors.length;

    if (selectedCount === 0) {
      return (this.generateSelectedItemSpan('all', 'All Colors', 'color'));
    }

    return (this.generateSelectedItemSpan('colors-selected', pluralize('Color', selectedCount, true), 'color'));
  }

  generatePriceSummary(selectedPriceIds) {
    const selectedPrices = selectedPriceIds.map(id => find(PRICES, { id }));
    if (PRICES.length === selectedPriceIds.length || selectedPriceIds.length === 0) { // All
      return (this.generateSelectedItemSpan('all', 'All Prices', 'price'));
    }

    if (selectedPrices.length === 1 ||
      (selectedPrices.length === 2 && selectedPrices.indexOf(PRICES[1]) < 0)) { // Individual Elems
      return selectedPrices.map(p => this.generateSelectedItemSpan(p.id, p.presentation));
    }

      // Combined pricing
    const combinedSelectedPrices = selectedPrices.reduce((acc, c) => acc.concat(c.range), []);
    return this.generateSelectedItemSpan(
        'combined',
        `$${Math.min(...combinedSelectedPrices)} - $${Math.max(...combinedSelectedPrices)}`,
      );
  }

  render() {
    const {
      $$colors,
      $$dressLengths,
      $$sizes,
      isDrawerLayout,
      filters,
    } = this.props;

    return (
      <div className="CollectionFilterSort">
        <div className="FilterSort">
          <div className="ExpandablePanel--wrapper">
            <div className="ExpandablePanel__heading">
              <span className="ExpandablePanel__mainTitle">{isDrawerLayout ? 'Filter' : 'Filter by'}</span>
            </div>

            <ExpandablePanelItem
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
              isActive
              openedByDefault
              itemGroup={(
                <div>
                  <div className="ExpandablePanel__name">
                    Color
                  </div>
                  <div className="ExpandablePanel__selectedOptions">
                    {this.generateColorSummary(filters.selectedColors)}
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
                      $$dressLengths.toJS().map(size => this.buildDressLengths(size))
                    }
                  </div>
                </div>
              </div>
            )}
          />

          {isDrawerLayout ?
            <div className="ExpandablePanel__action">
              <div className="ExpandablePanel__filterTriggers--cancel-apply">
                <a
                  onClick={this.handleFilterCancel()}
                  className="ExpandablePanel__btn ExpandablePanel__btn--secondary"
                >
                    Cancel
                </a>
                <a onClick={this.handleFilterApply()} className="ExpandablePanel__btn">Apply</a>
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
  applyTemporaryFilters: PropTypes.func.isRequired,
  clearAllCollectionFilters: PropTypes.func.isRequired,
  setFastMaking: PropTypes.func.isRequired,
  setSelectedColors: PropTypes.func.isRequired,
  setSelectedPrices: PropTypes.func.isRequired,
  setSelectedShapes: PropTypes.func.isRequired,
  setSelectedStyles: PropTypes.func.isRequired,
  setTemporaryFilters: PropTypes.func.isRequired,
  updateExternalLegacyFilters: PropTypes.func.isRequired,
};

export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(CollectionFilterSort));
