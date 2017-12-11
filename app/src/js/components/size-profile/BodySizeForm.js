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
  INCH_SIZES,
  MIN_CM,
  MAX_CM,
  UNITS,
} from '../../constants/ProductConstants';

// Actions
import SizeProfileActions from '../../actions/SizeProfileActions';

// UI Components
import Select from '../form/Select';
import Input from '../form/Input';
import RadioToggle from '../form/RadioToggle';

// CSS
import '../../../css/components/StandardSizeForm.scss';

function stateToProps(state) {
  return {
    temporaryMeasurementMetric: state.$$sizeProfileState.get('temporaryMeasurementMetric'),
    temporaryHeightValue: state.$$sizeProfileState.get('temporaryHeightValue'),
    heightError: state.$$sizeProfileState.get('heightError'),
    temporaryWeightValue: state.$$sizeProfileState.get('temporaryWeightValue'),
    // weightError: state.$$sizeProfileState.get('weightError'),
    temporaryAgeValue: state.$$sizeProfileState.get('temporaryAgeValue'),
    // ageError: state.$$sizeProfileState.get('ageError'),
  };
}

function dispatchToProps(dispatch) {
  const {
    setSizeProfileError,
    updateMeasurementMetric,
    updateHeightSelection,
    updateWeightSelection,
    updateAgeSelection,
  } = bindActionCreators(SizeProfileActions, dispatch);

  return {
    setSizeProfileError,
    updateMeasurementMetric,
    updateHeightSelection,
    updateWeightSelection,
    updateAgeSelection,
  };
}

class BodySizeForm extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  hasHeightError({ temporaryHeightValue, temporaryMeasurementMetric }) {
    return (
     !(temporaryHeightValue && temporaryMeasurementMetric) || // Not Present
     (temporaryMeasurementMetric === UNITS.CM &&
     (temporaryHeightValue < MIN_CM || temporaryHeightValue > MAX_CM))
    );
  }

  validateSizeSelection({ temporaryHeightValue, temporaryMeasurementMetric }) {
    const { setSizeProfileError } = this.props;
    const errors = { heightError: false, sizeError: false };

    if (this.hasHeightError(
      { temporaryHeightValue, temporaryMeasurementMetric },
    )) {
      errors.heightError = true;
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

  handleWeightChange({ value }) {
    this.props.updateWeightSelection({ temporaryWeightValue: value });
  }

  handleAgeChange({ value }) {
    const { updateAgeSelection } = this.props;
    const numVal = parseInt(value, 10);

    if (typeof numVal === 'number' && !Number.isNaN(numVal)) {
      updateAgeSelection({
        temporaryAgeValue: numVal,
      });
    }
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
      temporaryMeasurementMetric,
      temporaryHeightValue,
      heightError,
      containerClassNames,
      temporaryWeightValue,
      temporaryAgeValue,
    } = this.props;

    return (
      <div
        className={classnames(
          'BodySizeForm__layout-container',
          containerClassNames,
        )}
      >
        <div className="BodySizeForm__height u-mb-normal">
          <div className="grid-noGutter align-items--flex-end">
            <p
              className={classnames(
                'h6 u-mb-xs u-text-align--left col-8',
                {
                  'u-color-red': heightError,
                },
              )}
            >
              What's your height?
            </p>
            <div className="">
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
          <div className="grid-noGutter">
            <div className="col-10">
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
          </div>
        </div>

        <div className="BodySizeForm__height u-mb-normal">
          <p
            className={classnames(
              'h6 u-mb-xs u-text-align--left',
              {
                'u-color-red': heightError,
              },
            )}
          >
            What's your weight?
          </p>
          <div className="grid-noGutter">
            <div className="col-10">
              <Input
                id="height-option-cm"
                type="text"
                error={heightError}
                inlineMeta={heightError ? 'Please enter a valid weight' : null}
                onChange={this.handleWeightChange}
                defaultValue={temporaryWeightValue}
              />
            </div>
          </div>
        </div>

        <div className="BodySizeForm__height u-mb-normal">
          <p
            className={classnames(
              'h6 u-mb-xs u-text-align--left',
              {
                'u-color-red': heightError,
              },
            )}
          >
            How old are you?
          </p>
          <div className="grid-noGutter">
            <div className="col-10">
              <Input
                id="height-option-cm"
                type="number"
                error={heightError}
                inlineMeta={heightError ? 'Please enter a valid age' : null}
                onChange={this.handleAgeChange}
                defaultValue={temporaryAgeValue}
              />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

BodySizeForm.propTypes = {
  // Passed Props
  containerClassNames: PropTypes.string,
  // Redux Props
  temporaryMeasurementMetric: PropTypes.string,
  temporaryHeightValue: PropTypes.number,
  heightError: PropTypes.bool,
  temporaryWeightValue: PropTypes.string,
  temporaryAgeValue: PropTypes.number,
  // Redux Actions
  setSizeProfileError: PropTypes.func.isRequired,
  updateMeasurementMetric: PropTypes.func.isRequired,
  updateHeightSelection: PropTypes.func.isRequired,
  updateWeightSelection: PropTypes.func.isRequired,
  updateAgeSelection: PropTypes.func.isRequired,
};

BodySizeForm.defaultProps = {
  containerClassNames: 'u-mt-normal u-mb-huge',
  selectedColorId: '',
  temporaryMeasurementMetric: null,
  temporaryHeightValue: null,
  heightError: false,
  temporaryWeightValue: null,
  temporaryAgeValue: null,
};


export default connect(stateToProps, dispatchToProps)(BodySizeForm);
