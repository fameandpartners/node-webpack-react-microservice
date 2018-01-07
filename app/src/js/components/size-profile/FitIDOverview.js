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

// CSS
import '../../../css/components/DisplayFitID.scss';

function stateToProps(state) {
  return {
    temporaryMeasurementMetric: state.$$sizeProfileState.get('temporaryMeasurementMetric'),
    temporaryHeightValue: state.$$sizeProfileState.get('temporaryHeightValue'),
    temporaryWeightValue: state.$$sizeProfileState.get('temporaryWeightValue'),
    temporaryAgeValue: state.$$sizeProfileState.get('temporaryAgeValue'),
    temporaryBustValue: state.$$sizeProfileState.get('temporaryBustValue'),
    temporaryWaistValue: state.$$sizeProfileState.get('temporaryWaistValue'),
    temporaryHipValue: state.$$sizeProfileState.get('temporaryHipValue'),
  };
}

function dispatchToProps(dispatch) {
  const {
    jumpToStep,
    updateEditingStep,
  } = bindActionCreators(WizardActions, dispatch);

  return {
    jumpToStep,
    updateEditingStep,
  };
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

  showFitID() {
    this.props.jumpToStep({ activeStepId: WizardConstants.COMPLETED_FIT_ID_STEP });
  }

  handleOpenEditBodyFit() {
    this.props.updateEditingStep({ isEditingStep: true });
    this.props.jumpToStep({ activeStepId: WizardConstants.OVERALL_FIT_STEP });
  }

  handleOpenEditBustFit() {
    this.props.updateEditingStep({ isEditingStep: true });
    this.props.jumpToStep({ activeStepId: WizardConstants.OVERALL_FIT_STEP });
  }

  handleOpenEditWaistFit() {
    this.props.updateEditingStep({ isEditingStep: true });
    this.props.jumpToStep({ activeStepId: WizardConstants.OVERALL_FIT_STEP });
  }

  handleOpenEditHipFit() {
    this.props.updateEditingStep({ isEditingStep: true });
    this.props.jumpToStep({ activeStepId: WizardConstants.OVERALL_FIT_STEP });
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
      return option ? `${option.ft}ft ${option.inch}in` : 'N/A';
    }

    return 'N/A';
  }

  render() {
    const {
      temporaryWeightValue,
      temporaryAgeValue,
      temporaryBustValue,
      temporaryWaistValue,
      temporaryHipValue,
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

            <a
              className="edit-body-link link"
              onClick={this.handleOpenEditBodyFit}
            >
              Edit
            </a>

          </div>


          <div className="grid-center-noGutter">
            <table className="CustomDressFit--overview">
              <tr className="bottom-space">
                <td><span className="body-fit-title">Bust Fit</span></td>
                <td><span className="body-fit-value">{temporaryBustValue}</span></td>
                <td>
                  <a
                    className="link"
                    onClick={this.handleOpenEditBustFit}
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className="bottom-space">
                <td><span className="body-fit-title">Waist Fit</span></td>
                <td><span className="body-fit-value">{temporaryWaistValue}</span></td>
                <td>
                  <a
                    className="link"
                    onClick={this.handleOpenEditWaistFit}
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr>
                <td><span className="body-fit-title">Hip Fit</span></td>
                <td><span className="body-fit-value">{temporaryHipValue}</span></td>
                <td>
                  <a
                    className="link"
                    onClick={this.handleOpenEditHipFit}
                  >
                    Edit
                  </a>
                </td>
              </tr>
            </table>
          </div>

          <div className="ButtonBox ButtonBox--center">
            <Button
              className="FitIDOverview__button button-height-big"
              text="Save your Fit I.D. to your Profile"
              handleClick={this.saveFitID}
            />
            <a
              className="GetResults--link link"
              onClick={this.showFitID}
            >
              Just get my FIT I.D. results
            </a>
          </div>

        </div>
      </WizardStep>
    );
  }
}

FitIDOverview.propTypes = {
  // Redux Actions
  jumpToStep: PropTypes.func.isRequired,
  updateEditingStep: PropTypes.func.isRequired,
  // Redux Props
  temporaryMeasurementMetric: PropTypes.string,
  temporaryHeightValue: PropTypes.number,
  temporaryWeightValue: PropTypes.string,
  temporaryAgeValue: PropTypes.number,
  temporaryBustValue: PropTypes.string,
  temporaryWaistValue: PropTypes.string,
  temporaryHipValue: PropTypes.string,
};

FitIDOverview.defaultProps = {
  temporaryMeasurementMetric: null,
  temporaryHeightValue: null,
  temporaryWeightValue: null,
  temporaryAgeValue: null,
  temporaryBustValue: null,
  temporaryWaistValue: null,
  temporaryHipValue: null,
};

export default connect(stateToProps, dispatchToProps)(FitIDOverview);
