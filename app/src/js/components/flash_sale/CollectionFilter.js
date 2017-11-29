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
import { cleanCapitalizeWord } from '../../utilities/TextFormatting';
import { hasLegacyInstance } from '../../utilities/CollectionFilterSortUtilities';

// Components
import ExpandablePanelItem from './ExpandablePanelItem';

// Constants
import CollectionFilterSortConstants from '../../constants/CollectionFilterSortConstants';

// CSS
import '../../../css/components/CollectionFilter.scss';

const { PRICES, FILTER_DEFAULTS } = CollectionFilterSortConstants;

function stateToProps({ $$collectionFilterSortState }, props) {
  console.log('state', $$collectionFilterSortState.toJS());
    // Which part of the Redux global state does our component want to receive as props?
  if ($$collectionFilterSortState) {
    const collectionFilterSortState = $$collectionFilterSortState.toJS();
    return {
          // Immutable Defaults
      $$colors: $$collectionFilterSortState.get('$$colors'),
      $$bodyShapes: $$collectionFilterSortState.get('$$bodyShapes'),
      $$bodyStyles: $$collectionFilterSortState.get('$$bodyStyles'),
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

    this.trackSelection('COLLECTION_COLOR_FILTER_SELECTION', name);
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
      this.trackSelection('COLLECTION_PRICE_FILTER_SELECTION', id);
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

  handleStyleSelection(style) {
    return () => {
      const styleId = style.permalink;
      const newStyles = this.addOrRemoveFrom(this.props.filters.selectedStyles, styleId).sort();
      this.trackSelection('COLLECTION_STYLE_FILTER_SELECTION', styleId);
      this.updateStyles(newStyles);
    };
  }

  updateShapes(newShapes) {
    const {
        $$bodyShapes,
        isDrawerLayout,
        setSelectedShapes,
        setTemporaryFilters,
        temporaryFilters,
        updateExternalLegacyFilters,
      } = this.props;
    if (isDrawerLayout) { // mobile, temporary setting
      setTemporaryFilters(assign({}, temporaryFilters, {
        selectedShapes: newShapes,
      }));
    } else {
      setSelectedShapes(newShapes);
      updateExternalLegacyFilters({
        selectedShapes: newShapes.length === $$bodyShapes.toJS().length
            ? []
            : newShapes,
      });
    }
  }

  handleShapeSelection(shapeId) {
    return () => {
      const newShapes = this.addOrRemoveFrom(this.props.filters.selectedShapes, shapeId).sort();
      this.trackSelection('COLLECTION_BODYSHAPE_FILTER_SELECTION', shapeId);
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

        // this.trackSelection('COLLECTION_FASTMAKING_FILTER_SELECTION', !fastMaking);
    };
  }


    /**
     * RENDERERS
     * ***************************************************
     */
  buildColorOption(color) {
    const { selectedColors } = this.props.filters;
    console.log('selectedColors', selectedColors);
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

  buildShapeOptions(shape) {
    const { selectedShapes } = this.props.filters;
    return (
      <label htmlFor={`shape-${shape}`} key={`shape-${shape}`} className="ExpandablePanel__option ExpandablePanel__listColumn" name="shape">
        <input
          id={`shape-${shape}`}
          onChange={this.handleShapeSelection(shape)}
          checked={selectedShapes.indexOf(shape) > -1}
          data-all="false"
          name={`shape-${shape}`}
          type="checkbox"
          value={shape}
        />
        <span className="checkboxBlackBg__check">
          <span className="ExpandablePanel__optionName">{cleanCapitalizeWord(shape, ['_'])}</span>
        </span>
      </label>
    );
  }

  buildStyleOptions(style) {
    const { selectedStyles } = this.props.filters;
    return (
      <label htmlFor={`style-${style.permalink}`} key={`style-${style.permalink}`} className="ExpandablePanel__option ExpandablePanel__listColumn" name="style">
        <input
          onChange={this.handleStyleSelection(style)}
          checked={selectedStyles.indexOf(style.permalink) > -1}
          data-all="false"
          id={`style-${style.permalink}`}
          name={`style-${style.permalink}`}
          type="checkbox"
          value={style.name}
        />
        <span className="checkboxBlackBg__check">
          <span className="ExpandablePanel__optionName">{style.name}</span>
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

  generateShapeSummary() {
    const { $$bodyShapes, filters } = this.props;
    const selectedCount = filters.selectedShapes.length;

    if (selectedCount === $$bodyShapes.toJS().length || selectedCount === 0) { // All
      return (this.generateSelectedItemSpan('all', 'All Shapes', 'shape'));
    }

    return (this.generateSelectedItemSpan('shapes-selected', pluralize('Shape', selectedCount, true), 'bodyshapes'));
  }

  generateStyleSummary() {
    const { $$bodyStyles, filters } = this.props;
    const selectedCount = filters.selectedStyles.length;
    if (selectedCount === $$bodyStyles.toJS().length || selectedCount === 0) { // All
      return (this.generateSelectedItemSpan('all', 'All Styles', 'style'));
    }

    return (this.generateSelectedItemSpan('styles-selected', pluralize('Style', selectedCount, true), 'styles'));
  }


  render() {
    const {
      $$bodyShapes,
      $$bodyStyles,
      $$colors,
      isDrawerLayout,
      filters,
    } = this.props;

    console.log('$$colors', $$colors);

    return (
      <div className="CollectionFilterSort">
        <div className="FilterSort">
          <div className="ExpandablePanel--wrapper">
            <div className="ExpandablePanel__heading">
              <span className="ExpandablePanel__mainTitle">{isDrawerLayout ? 'Filter' : 'Filter by'}</span>
              <div className="ExpandablePanel__clearAllWrapper">
                <a
                  onClick={this.handleClearAll}
                  className="ExpandablePanel__clearAll js-trigger-clear-all-filters"
                >
                  Clear All
                </a>
              </div>
            </div>

            <ExpandablePanelItem
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

            <ExpandablePanelItem
              openedByDefault={!!filters.selectedStyles.length}
              itemGroup={(
                <div>
                  <div className="ExpandablePanel__name">
                                  Style
                              </div>
                  <div className="ExpandablePanel__selectedOptions">
                    {this.generateStyleSummary()}
                  </div>
                </div>
                          )}
              revealedContent={(
                <div className="ExpandablePanel__listOptions checkboxBlackBg clearfix">
                  <div className="ExpandablePanel__listTwoColumns">
                    {$$bodyStyles.toJS().map(this.buildStyleOptions)}
                  </div>
                </div>
                          )}
            />

            <ExpandablePanelItem
              openedByDefault={!!filters.selectedShapes.length}
              itemGroup={(
                <div>
                  <div className="ExpandablePanel__name">
                                  Bodyshape
                              </div>
                  <div className="ExpandablePanel__selectedOptions">
                    {this.generateShapeSummary()}
                  </div>
                </div>
                          )}
              revealedContent={(
                <div className="ExpandablePanel__listOptions checkboxBlackBg clearfix">
                  <div className="ExpandablePanel__listTwoColumns">
                    {$$bodyShapes.toJS().map(this.buildShapeOptions)}
                  </div>
                </div>
                          )}
            />

            <ExpandablePanelItem
              openedByDefault={!!filters.selectedPrices.length}
              itemGroup={(
                <div>
                  <div className="ExpandablePanel__name">
                                  Price
                              </div>
                  <div className="ExpandablePanel__selectedOptions">
                    {this.generatePriceSummary(filters.selectedPrices)}
                  </div>
                </div>
                          )}
              revealedContent={(
                <div className="ExpandablePanel__listOptions checkboxBlackBg clearfix">
                  <div>
                    {PRICES.map((p, i) => (
                      <label
                        htmlFor={`price-${p.id}}`}
                        key={`price-${p.id}`}
                        className="ExpandablePanel__option"
                        name="price"
                      >
                        <input
                          id={`price-${p.id}}`}
                          checked={filters.selectedPrices.indexOf(PRICES[i].id) > -1}
                          data-pricemin={p.range[0]}
                          data-pricemax={p.range[1]}
                          onChange={this.handlePriceSelection(p.id)}
                          name="price"
                          type="checkbox"
                          value={p.range[0]}
                        />
                        <span className="checkboxBlackBg__check">
                          <span className="ExpandablePanel__optionName">{p.presentation}</span>
                        </span>
                      </label>
                      ))}
                  </div>
                </div>
              )}
            />
          </div>

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
  $$bodyShapes: PropTypes.object.isRequired,
  $$bodyStyles: PropTypes.object.isRequired,
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
