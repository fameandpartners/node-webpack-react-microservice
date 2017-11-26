import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import WizardActions from '../../actions/WizardActions';

// Constants
import WizardConstants from '../../constants/WizardConstants';

// Components
import Button from '../generic/Button';
import WizardStep from '../wizard/WizardStep';
import BodySizeForm from './BodySizeForm';
import ClothingSizeForm from './ClothingSizeForm';

function stateToProps() {
  return {};
}

function dispatchToProps(dispatch) {
  const { jumpToStep } = bindActionCreators(WizardActions, dispatch);
  return { jumpToStep };
}

class FitIdOverallFit extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleCloseWizard() {
    this.props.jumpToStep({ shouldAppear: false });
  }

  handlePreviousStep() {
    this.props.jumpToStep({ activeStepId: WizardConstants.SELECT_SIZE_PROFILE_STEP });
  }

  handleNextSelection() {
    this.props.jumpToStep({ activeStepId: WizardConstants.PETITE_PLUS_SURVEY_STEP });
  }

  render() {
    return (
      <WizardStep
        handleCloseWizard={this.handleCloseWizard}
        handlePreviousStep={this.handlePreviousStep}
        currentStep={1}
        totalSteps={5}
        modalClassName="full-padding-big u-flex u-flex--1"
        modalContentClassName="u-width--full u-overflow-y--scroll"
        modalWrapperClassName="u-flex--col"
      >
        <div className="u-mb-big">
          <h3 className="h4 u-mb-small">
            Let’s get started
          </h3>
          <p className="h6 BodySizeForm__sub-heading">
            These first set of questions will contribute to refining your overall fit.
          </p>
        </div>

        <div className="grid-12-noGutter">
          <div className="col-6">
            <BodySizeForm
              containerClassNames="u-mt-normal u-mb-big"
            />
          </div>

          <div className="col-6">
            <ClothingSizeForm
              containerClassNames="u-mt-normal u-mb-big"
            />
          </div>
        </div>

        <div className="ButtonBox--medium-width ButtonBox--center">
          <Button
            className="SelectSizeProfile__button"
            text="Next"
            handleClick={this.handleNextSelection}
          />
        </div>

      </WizardStep>
    );
  }
}

FitIdOverallFit.propTypes = {
  jumpToStep: PropTypes.func.isRequired,
};

FitIdOverallFit.defaultProps = {
};

export default connect(stateToProps, dispatchToProps)(FitIdOverallFit);
