import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { find } from 'lodash';

// Actions
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
  };
}

function dispatchToProps(dispatch) {
  const { jumpToStep } = bindActionCreators(WizardActions, dispatch);
  return { jumpToStep };
}

class CompletedFitID extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleCloseWizard() {
    this.props.jumpToStep({ shouldAppear: false });
  }

  handleAddToCart() {
    this.props.jumpToStep({ shouldAppear: false });
  }

  handlePreviousStep() {
    this.props.jumpToStep({ activeStepId: WizardConstants.FIT_ID_OVERVIEW_STEP });
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
      return option ? `${option.ft}' ${option.inch}"` : 'N/A';
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
        handleCloseWizard={this.handleCloseWizard}
        handlePreviousStep={this.handlePreviousStep}
        modalClassName="full-padding-big u-flex u-flex--1 u-vh-big"
        modalContentClassName="u-width--full u-overflow-y--scroll"
        modalWrapperClassName="u-flex--col"
      >
        <div className="CompletedFitID">
          <h3 className="CompletedFitID__title u-mb-small u-mt-small">
            <span className="bolder-heading">Emily,</span><br />
            Your fit I.D. size is a <span className="bolder-heading">6</span>
          </h3>

          <h5 className="CompletedFitID__description u-mb-big">
            Our algorithm has created your unique fit I.D. Overtime we'll use
            it to create an even better fit for you.
          </h5>

          <div className="grid-12-noGutter">
            <div className="col-6">
              <div className="CompletedFitID__labels-wrapper">
                <ul className="CompletedFitID__body-fit-list">
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
                </ul>
              </div>

              <div className="body-fit-wrapper">
                <ul className="CompletedFitID__body-fit__list body-fit-labels">
                  <li>
                    <div className="checkmark" />
                    <span className="body-fit-label">Bust fit</span>
                  </li>
                  <li>
                    <div className="checkmark" />
                    <span className="body-fit-label">Waist fit</span>
                  </li>
                  <li>
                    <div className="checkmark" />
                    <span className="body-fit-label">Hip fit</span>
                  </li>
                </ul>

                <ul className="CompletedFitID__body-fit__list body-fit-results">
                  <li>
                    <p>Adjust for larger bust</p>
                  </li>
                  <li>
                    <p>Fitted Waist</p>
                  </li>
                  <li>
                    <p>Fitted Hips</p>
                  </li>
                </ul>
              </div>

              <div className="ButtonBox--medium-width u-mt-small">
                <Button
                  className="EditFitID__button button-height-big"
                  text="Edit"
                  handleClick={this.handlePreviousStep}
                />
              </div>
            </div>

            <div className="CompletedFitID__dress-image__wrapper col-6 ">
              <img src="https://d1msb7dh8kb0o9.cloudfront.net/spree/products/31545/original/fp2006-pale_blue-1.jpg?1471292831" alt="purchase-dress" className="CompletedFitID__dress-image" />
            </div>
          </div>

          <div className="ButtonBox ButtonBox--center u-mt-big">
            <Button
              className="FitIDOverview__button button-height-big"
              text="Add size 6 to bag"
              handleClick={this.handleAddToCart}
            />
          </div>
        </div>

      </WizardStep>
    );
  }
}

CompletedFitID.propTypes = {
  // Redux Actions
  jumpToStep: PropTypes.func.isRequired,
  // Redux Props
  temporaryMeasurementMetric: PropTypes.string,
  temporaryHeightValue: PropTypes.number,
  temporaryWeightValue: PropTypes.string,
  temporaryAgeValue: PropTypes.number,
};

CompletedFitID.defaultProps = {
  temporaryMeasurementMetric: null,
  temporaryHeightValue: null,
  temporaryWeightValue: null,
  temporaryAgeValue: null,
};

export default connect(stateToProps, dispatchToProps)(CompletedFitID);
