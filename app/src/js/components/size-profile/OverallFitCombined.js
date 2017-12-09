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

class OverallFitCombined extends Component {
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
        <div>
          <h3 className="WizardStep__title u-mb-small">
            Let’s get started
          </h3>
          <h5 className="WizardStep__description u-mb-normal">
            These first set of questions will contribute to refining your overall fit.
          </h5>
          <h5 className="WizardStep__description u-mb-normal">
            Already have a Fit I.D.? <a href="">Log in</a>
          </h5>
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

        <div className="ButtonBox--center">
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

OverallFitCombined.propTypes = {
  jumpToStep: PropTypes.func.isRequired,
};

OverallFitCombined.defaultProps = {
};

export default connect(stateToProps, dispatchToProps)(OverallFitCombined);
