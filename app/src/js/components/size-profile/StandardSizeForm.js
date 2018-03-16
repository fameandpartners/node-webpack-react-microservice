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
import SizeProfileActions from '../../actions/SizeProfileActions';
import ModalActions from '../../actions/ModalActions';

// UI Components
import Select from '../form/Select';
import Input from '../form/Input';
import RadioToggle from '../form/RadioToggle';
import Button from '../generic/Button';

// CSS
import '../../../css/components/StandardSizeForm.scss';

function stateToProps(state) {
  return {
    isUSSiteVersion: state.$$appState.get('siteVersion').toLowerCase() === 'usa',
    temporaryMeasurementMetric: state.$$sizeProfileState.get('temporaryMeasurementMetric'),
    temporaryHeightValue: state.$$sizeProfileState.get('temporaryHeightValue'),
    temporaryDressSize: state.$$sizeProfileState.get('temporaryDressSize'),
    standardHeightError: state.$$sizeProfileState.get('standardHeightError'),
    standardSizeError: state.$$sizeProfileState.get('standardSizeError'),
  };
}

function dispatchToProps(dispatch) {
  const {
    setStandardSizeError,
    updateMeasurementMetric,
    updateHeightSelection,
    updateDressSizeSelection,
  } = bindActionCreators(SizeProfileActions, dispatch);

  const modalActions = bindActionCreators(ModalActions, dispatch);

  return {
    setStandardSizeError,
    updateMeasurementMetric,
    updateHeightSelection,
    updateDressSizeSelection,
    activateModal: modalActions.activateModal,
  };
}


class StandardSizeForm extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.props.validationHandler(this);
  }

  componentWillUnmount() {
    this.props.validationHandler(undefined);
  }

  isValid() {
    return this.validateSizeSelection({
      temporaryHeightValue: this.props.temporaryHeightValue,
      temporaryMeasurementMetric: this.props.temporaryMeasurementMetric,
    });
  }

  hasHeightError({ temporaryHeightValue, temporaryMeasurementMetric }) {
    return (
     !(temporaryHeightValue && temporaryMeasurementMetric) || // Not Present
     (temporaryMeasurementMetric === UNITS.CM &&
     (temporaryHeightValue < MIN_CM || temporaryHeightValue > MAX_CM))
    );
  }

  validateSizeSelection({ temporaryHeightValue, temporaryMeasurementMetric }) {
    const { setStandardSizeError, temporaryDressSize } = this.props;
    const errors = { standardHeightError: false, standardSizeError: false };

    if (this.hasHeightError({
      temporaryHeightValue, temporaryMeasurementMetric },
    ) || !temporaryDressSize) {
      if (this.hasHeightError(
        { temporaryHeightValue, temporaryMeasurementMetric },
      )) {
        errors.standardHeightError = true;
      }

      if (!temporaryDressSize) { errors.standardSizeError = true; }
      setStandardSizeError(errors);
      return false;
    }

    setStandardSizeError(errors);
    return true;
  }

  /**
   * Handler for changes of CM metric
   * @param  {Number|String} value
   */
  handleCMChange({ value }) {
    const { standardHeightError, updateHeightSelection } = this.props;
    const numVal = parseInt(value, 10);

    if (typeof numVal === 'number' && !Number.isNaN(numVal)) {
      if (standardHeightError) { // Only validate if there is an error
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
    const { updateHeightSelection, standardHeightError } = this.props;
    const selection = INCH_SIZES[option.id];

    if (selection) {
      const inches = (selection.ft * 12) + selection.inch;
      if (standardHeightError) {
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
      this.props.setStandardSizeError({ standardSizeError: false });
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
      isUSSiteVersion,
      temporaryDressSize,
      temporaryMeasurementMetric,
      temporaryHeightValue,
      standardHeightError,
      standardSizeError,
      containerClassNames,
    } = this.props;
    const SIZES = isUSSiteVersion ? US_SIZES : AU_SIZES;

    return (
      <div
        className={classnames(
          'StandardSizeForm__layout-container',
          containerClassNames,
        )}
      >
        <div className="u-mb--big">
          <h3 className="h4 u-mb--small">
            Let’s make it fit.
          </h3>
          <p className="h6 StandardSizeForm__sub-heading">
            Just tell us your height and size, and we&apos;ll take care of the tailoring.
          </p>
        </div>

        <div className="StandardSizeForm__height u-mb--normal">
          <p
            className={classnames(
              'h6 u-mb--xs u-text-align--left',
              {
                'u-color-red': standardHeightError,
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
                  error={standardHeightError}
                  inlineMeta={standardHeightError ? 'Please select your height' : null}
                  options={this.generateInchesOptions()}
                  onChange={this.handleInchChange}
                /> :
                <Input
                  id="height-option-cm"
                  type="number"
                  error={standardHeightError}
                  inlineMeta={standardHeightError ? 'Please enter a valid height' : null}
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
          <p className="h6 u-text-align--left u-mb--xs">What&apos;s your size?</p>
          <div className="StandardSizeForm__size grid-12-spaceBetween">
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
          { standardSizeError &&
            <div className="StandardSizeForm__size-error-text">
              <p className="p u-color--red u-text-align--left u-mb--small u-mt--small">
                Please select a size
              </p>
            </div>
          }

          <div className="grid-noGutter">
            <div className="col-12">
              <p
                className="link link--static u-text-align--left"
                onClick={this.handleViewSizeGuideClick}
              >
                View Size Guide
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StandardSizeForm.propTypes = {
  // Passed Props
  containerClassNames: PropTypes.string,
  validationHandler: PropTypes.func.isRequired,
  // Redux Props
  activateModal: PropTypes.func.isRequired,
  isUSSiteVersion: PropTypes.bool.isRequired,
  temporaryDressSize: PropTypes.number,
  temporaryMeasurementMetric: PropTypes.string,
  temporaryHeightValue: PropTypes.number,
  standardHeightError: PropTypes.bool,
  standardSizeError: PropTypes.bool,
  // Redux Actions
  setStandardSizeError: PropTypes.func.isRequired,
  updateMeasurementMetric: PropTypes.func.isRequired,
  updateDressSizeSelection: PropTypes.func.isRequired,
  updateHeightSelection: PropTypes.func.isRequired,
};

StandardSizeForm.defaultProps = {
  containerClassNames: 'u-mt--big u-mb--huge',
  selectedColorId: '',
  temporaryDressSize: null,
  temporaryMeasurementMetric: null,
  temporaryHeightValue: null,
  standardHeightError: false,
  standardSizeError: false,
};

export default connect(stateToProps, dispatchToProps)(StandardSizeForm);
