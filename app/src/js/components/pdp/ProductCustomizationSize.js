/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { find } from 'lodash';
import classnames from 'classnames';

// Constants
import {
  CM_TO_INCHES,
  US_SIZES,
  AU_SIZES,
  INCH_SIZES,
  MIN_CM,
  MAX_CM,
  UNITS,
} from '../../constants/ProductConstants';
import ModalConstants from '../../constants/ModalConstants';

// Actions
import CustomizationActions from '../../actions/CustomizationActions';
import ModalActions from '../../actions/ModalActions';

// UI Components
import ProductCustomization from './ProductCustomization';
import Select from '../form/Select';
import Input from '../form/Input';
import RadioToggle from '../form/RadioToggle';
import Button from '../generic/Button';

// CSS
import '../../../css/components/ProductCustomizationSize.scss';

function stateToProps(state) {
  const productDefaultFabrics = state.$$productState.get('productDefaultFabrics');
  const productSecondaryFabrics = state.$$productState.get('productSecondaryFabrics');
  return {
    isUSSiteVersion: state.$$appState.get('siteVersion').toLowerCase() === 'usa',
    hasFabrics: !productDefaultFabrics.isEmpty() || !productSecondaryFabrics.isEmpty(),
    productCustomizationDrawer: state.$$customizationState.get('productCustomizationDrawer'),
    temporaryMeasurementMetric: state.$$customizationState.get('temporaryMeasurementMetric'),
    temporaryHeightValue: state.$$customizationState.get('temporaryHeightValue'),
    temporaryDressSize: state.$$customizationState.get('temporaryDressSize'),
    heightError: state.$$customizationState.get('heightError'),
    sizeError: state.$$customizationState.get('sizeError'),
  };
}

function dispatchToProps(dispatch) {
  const {
    changeCustomizationDrawer,
    setSizeProfileError,
    updateMeasurementMetric,
    updateHeightSelection,
    updateDressSizeSelection,
  } = bindActionCreators(CustomizationActions, dispatch);


  const modalActions = bindActionCreators(ModalActions, dispatch);

  return {
    changeCustomizationDrawer,
    setSizeProfileError,
    updateMeasurementMetric,
    updateHeightSelection,
    updateDressSizeSelection,
    activateModal: modalActions.activateModal,
  };
}


class ProductCustomizationStyle extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleDrawerSelection(productCustomizationDrawer) {
    this.props.changeCustomizationDrawer({ productCustomizationDrawer });
  }

  hasHeightError({ temporaryHeightValue, temporaryMeasurementMetric }) {
    return (
     !(temporaryHeightValue && temporaryMeasurementMetric) || // Not Present
     (temporaryMeasurementMetric === UNITS.CM &&
     (temporaryHeightValue < MIN_CM || temporaryHeightValue > MAX_CM))
    );
  }

  validateSizeSelection({ temporaryHeightValue, temporaryMeasurementMetric }) {
    const { setSizeProfileError, temporaryDressSize } = this.props;
    const errors = { heightError: false, sizeError: false };

    if (this.hasHeightError({
      temporaryHeightValue, temporaryMeasurementMetric },
    ) || !temporaryDressSize) {
      if (this.hasHeightError(
        { temporaryHeightValue, temporaryMeasurementMetric },
      )) {
        errors.heightError = true;
      }

      if (!temporaryDressSize) { errors.sizeError = true; }
      setSizeProfileError(errors);
      return false;
    }

    setSizeProfileError(errors);
    return true;
  }

  /**
   * Handler for changes of CM metric
   * @param  {Number|String} value
   */
  handleCMChange({ value }) {
    const { heightError, updateHeightSelection } = this.props;
    const numVal = parseInt(value, 10);

    if (typeof numVal === 'number' && !Number.isNaN(numVal)) {
      if (heightError) { // Only validate if there is an error
        this.validateSizeSelection({
          temporaryHeightValue: numVal,
          temporaryMeasurementMetric: UNITS.CM,
        });
      }
      updateHeightSelection({
        temporaryHeightValue: numVal,
        temporaryMeasurementMetric: UNITS.CM,
      });
    }
  }

  /**
   * Handles for changes of INCH metric
   * @param  {Object} {option} - Select dropdown's option chosen
   */
  handleInchChange({ option }) {
    const { updateHeightSelection, heightError } = this.props;
    const selection = INCH_SIZES[option.id];

    if (selection) {
      const inches = (selection.ft * 12) + selection.inch;
      if (heightError) {
        this.validateSizeSelection({
          temporaryHeightValue: inches,
          temporaryMeasurementMetric: UNITS.INCH,
        });
      }
      updateHeightSelection({
        temporaryHeightValue: inches,
      });
    }
  }

  /**
   * Handles the toggling of a metric switch
   * @param  {String} {value} (CM|INCH)
   */
  handleMetricSwitch({ value }) {
    const { updateMeasurementMetric } = this.props;
    updateMeasurementMetric({ temporaryMeasurementMetric: value });
    this.handleUnitConversionUpdate(value);
  }

  /**
   * Converts unit values on the fly
   * @param  {String} value (CM|INCH)
   */
  handleUnitConversionUpdate(value) { // value
    const { temporaryHeightValue } = this.props;
    if (value === UNITS.CM && temporaryHeightValue) { // CM selected
      const newVal = Math.round(temporaryHeightValue * CM_TO_INCHES);
      this.handleCMChange({
        value: newVal,
      });
    } else if (value === UNITS.INCH && temporaryHeightValue) { // INCH selected
      const totalInches = Math.round(temporaryHeightValue / CM_TO_INCHES);
      const option = find(INCH_SIZES, { totalInches });

      this.handleInchChange({
        option: {
          id: option ? option.id : null,
        },
      });
    }
  }

  handleDressSizeSelection(s) {
    return () => {
      this.props.updateDressSizeSelection({ temporaryDressSize: s });
    };
  }

  handleViewSizeGuideClick() {
    this.props.activateModal({ modalId: ModalConstants.SIZE_GUIDE_MODAL });
  }

  /**
   * Helper method to generate normal option for Select
   * @param  {Number} i
   * @param  {Number} ft
   * @param  {Number} inch
   * @return {Node} defaultOption
   */
  defaultInchOption(i, ft, inch) {
    return (
      <div>
        <span className="amt">{ft}</span>
        <span className="metric">ft</span>
        <span className="amt amt--last">{inch}</span>
        <span className="metric">in</span>
      </div>
    );
  }

  /**
   * Generates the inches options for the Select dropdown
   * @return {Object} options
   */
  generateInchesOptions() {
    return INCH_SIZES.map(({ ft, inch, totalInches }, i) => ({
      id: i,
      name: this.defaultInchOption(i, ft, inch),
      meta: totalInches,
      active: totalInches === this.props.temporaryHeightValue,
    }));
  }

  render() {
    const {
      hasFabrics,
      hasNavItems,
      productCustomizationDrawer,
      isUSSiteVersion,
      temporaryDressSize,
      temporaryMeasurementMetric,
      temporaryHeightValue,
      heightError,
      sizeError,
    } = this.props;
    const SIZES = isUSSiteVersion ? US_SIZES : AU_SIZES;

    return (
      <ProductCustomization
        hasFabrics={hasFabrics}
        hasNavItems={hasNavItems}
        handleDrawerSelection={this.handleDrawerSelection}
        productCustomizationDrawer={productCustomizationDrawer}
      >
        <div className="ProductCustomizationSize__layout-container u-center u-mt--normal u-mb--huge">
          <div className="u-mb--big">
            <h3 className="h4 u-mb--small">
              Let’s make it fit.
            </h3>
            <p className="h6 ProductCustomizationSize__sub-heading">
              Just tell us your height and size, and we&apos;ll take care of the tailoring.
            </p>
          </div>

          <div className="ProductCustomizationSize__height u-mb--normal">
            <p
              className={classnames(
                'h6 u-mb-xs u-text-align--left',
                {
                  'u-color-red': heightError,
                },
              )}
            >
              What's your height?
            </p>
            <div className="grid-noGutter">
              <div className="col-8">
                { temporaryMeasurementMetric === UNITS.INCH ?
                  <Select
                    id="height-option-in"
                    className="sort-options"
                    error={heightError}
                    inlineMeta={heightError ? 'Please select your height' : null}
                    options={this.generateInchesOptions()}
                    onChange={this.handleInchChange}
                  /> :
                  <Input
                    id="height-option-cm"
                    type="number"
                    error={heightError}
                    inlineMeta={heightError ? 'Please enter a valid height' : null}
                    focusOnMount
                    onChange={this.handleCMChange}
                    defaultValue={temporaryHeightValue}
                  />
                }
              </div>

              <div className="col">
                <RadioToggle
                  id="metric"
                  value={temporaryMeasurementMetric}
                  options={[
                    { value: UNITS.INCH },
                    { label: 'cm', value: UNITS.CM },
                  ]}
                  onChange={this.handleMetricSwitch}
                />
              </div>
            </div>

          </div>

          <div>
            <p className="h6 u-text-align-left u-mb-xs">What&apos;s your size?</p>
            <div className="ProductCustomizationSize__size grid-12-spaceBetween">
              { SIZES.map(s => (
                <div key={s} className="col-3">
                  <Button
                    tertiary
                    tall
                    selected={s === temporaryDressSize}
                    text={isUSSiteVersion ? `US ${s}` : `AU ${s}`}
                    handleClick={this.handleDressSizeSelection(s)}
                  />
                </div>
              ))}
            </div>
            { sizeError ?
              <div className="ProductCustomizationSize__size-error-text">
                <p className="p u-color-red u-text-align-left u-mb--small u-mt-small">
                  Please select a size
                </p>
              </div>
              : null
            }
            <div className="grid-noGutter">
              <div className="col-12">
                <p
                  className="link link--static u-text-align-left"
                  onClick={this.handleViewSizeGuideClick}
                >
                  View Size Guide
                </p>
              </div>
            </div>
          </div>
        </div>
      </ProductCustomization>
    );
  }
}

ProductCustomizationStyle.propTypes = {
  // Passed Props
  hasNavItems: PropTypes.bool.isRequired,
  // Redux Props
  activateModal: PropTypes.func.isRequired,
  hasFabrics: PropTypes.bool.isRequired,
  productCustomizationDrawer: PropTypes.string.isRequired,
  isUSSiteVersion: PropTypes.bool.isRequired,
  temporaryDressSize: PropTypes.number,
  temporaryMeasurementMetric: PropTypes.string,
  temporaryHeightValue: PropTypes.number,
  heightError: PropTypes.bool,
  sizeError: PropTypes.bool,
  // Redux Actions
  changeCustomizationDrawer: PropTypes.func.isRequired,
  setSizeProfileError: PropTypes.func.isRequired,
  updateMeasurementMetric: PropTypes.func.isRequired,
  updateDressSizeSelection: PropTypes.func.isRequired,
  updateHeightSelection: PropTypes.func.isRequired,
};

ProductCustomizationStyle.defaultProps = {
  hasNavItems: true,
  selectedColorId: '',
  temporaryDressSize: null,
  temporaryMeasurementMetric: null,
  temporaryHeightValue: null,
  heightError: false,
  sizeError: false,
};


export default connect(stateToProps, dispatchToProps)(ProductCustomizationStyle);
