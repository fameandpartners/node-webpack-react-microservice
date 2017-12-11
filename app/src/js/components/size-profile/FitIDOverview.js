import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { find } from 'lodash';

// Actions
// import SizeProfileActions from '../../actions/SizeProfileActions';
import WizardActions from '../../actions/WizardActions';

// Constants
import WizardConstants from '../../constants/WizardConstants';
import {
  INCH_SIZES,
  UNITS,
} from '../../constants/ProductConstants';

// Components
import Button from '../generic/Button';
import WizardStep from '../wizard/WizardStep';

function stateToProps(state) {
  return {
    temporaryMeasurementMetric: state.$$sizeProfileState.get('temporaryMeasurementMetric'),
    temporaryHeightValue: state.$$sizeProfileState.get('temporaryHeightValue'),
    temporaryWeightValue: state.$$sizeProfileState.get('temporaryWeightValue'),
    temporaryAgeValue: state.$$sizeProfileState.get('temporaryAgeValue'),
    // temporaryBustValue: state.$$sizeProfileState.get('temporaryBustValue'),
    // temporaryWaistValue: state.$$sizeProfileState.get('temporaryWaistValue'),
    // temporaryHipValue: state.$$sizeProfileState.get('temporaryHipValue'),
  };
}

function dispatchToProps(dispatch) {
  const { jumpToStep } = bindActionCreators(WizardActions, dispatch);
  return { jumpToStep };
}

class FitIDOverview extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleCloseWizard() {
    this.props.jumpToStep({ shouldAppear: false });
  }

  handlePreviousStep() {
    this.props.jumpToStep({ activeStepId: WizardConstants.CURRENT_DRESS_FIT_COMBINED_STEP });
  }

  saveFitID() {
    this.props.jumpToStep({ activeStepId: WizardConstants.COMPLETED_FIT_ID_STEP });
  }

  heightText() {
    const { temporaryHeightValue, temporaryMeasurementMetric } = this.props;

    if (temporaryHeightValue === null) {
      return 'N/A';
    }

    if (temporaryMeasurementMetric === UNITS.CM && temporaryHeightValue) { // CM selected
      return `${temporaryHeightValue}cm`;
    } else if (temporaryMeasurementMetric === UNITS.INCH && temporaryHeightValue) { // INCH selected
      const totalInches = temporaryHeightValue;
      const option = find(INCH_SIZES, { totalInches });
      console.log(INCH_SIZES);
      console.log(option);
      return option ? `${option.ft}ft ${option.inch}in` : 'N/A';
    }

    return 'N/A';
  }

  render() {
    const {
      temporaryWeightValue,
      temporaryAgeValue,
    } = this.props;

    return (
      <WizardStep
        handlePreviousStep={this.handlePreviousStep}
        handleCloseWizard={this.handleCloseWizard}
        modalClassName="u-flex u-flex--1"
        modalContentClassName="u-width--full u-overflow-y--scroll"
        modalWrapperClassName="u-flex--col"
      >
        <div className="FitIDOverview">
          <h3 className="WizardStep__title u-mb-normal u-mt-big">
            Let&rsquo;s make sure we <br /> got this correct.
          </h3>
          <div className="FitIDOverview__body-fit-wrapper">
            <div className="grid-center-noGutter">
              <ul className="FitIDOverview__body-fit-list">
                <li>
                  <span className="body-fit-title">Height</span>
                  <span className="body-fit-value">{this.heightText()}</span>
                </li>
                <li>
                  <span className="body-fit-title">Weight</span>
                  <span className="body-fit-value">{temporaryWeightValue}</span>
                </li>
                <li>
                  <span className="body-fit-title">Age</span>
                  <span className="body-fit-value">{temporaryAgeValue}</span>
                </li>
                <li>
                  <span className="body-fit-title">Bra</span>
                  <span className="body-fit-value">34B</span>
                </li>
                <li>
                  <span className="body-fit-title">Jeans</span>
                  <span className="body-fit-value">26</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="ButtonBox ButtonBox--center">
            <Button
              className="FitIDOverview__button"
              text="Save your Fit I.D. to your profile"
              handleClick={this.saveFitID}
            />
          </div>
        </div>
      </WizardStep>
    );
  }
}

FitIDOverview.propTypes = {
  // Redux Actions
  jumpToStep: PropTypes.func.isRequired,
  // Redux Props
  temporaryMeasurementMetric: PropTypes.string,
  temporaryHeightValue: PropTypes.number,
  temporaryWeightValue: PropTypes.string,
  temporaryAgeValue: PropTypes.number,
};

FitIDOverview.defaultProps = {
  temporaryMeasurementMetric: null,
  temporaryHeightValue: null,
  temporaryWeightValue: null,
  temporaryAgeValue: null,
};

export default connect(stateToProps, dispatchToProps)(FitIDOverview);
