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

function stateToProps(state) {
  return {
    isEditingStep: state.$$wizardState.get('isEditingStep'),
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

class AboutYouCombined extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleCloseWizard() {
    this.props.jumpToStep({ shouldAppear: false });
    this.props.updateEditingStep({ isEditingStep: false });
  }

  handlePreviousStep() {
    this.props.jumpToStep({ activeStepId: WizardConstants.SELECT_SIZE_PROFILE_STEP });
  }

  handleNextSelection() {
    const {
      jumpToStep,
      isEditingStep,
      updateEditingStep,
    } = this.props;

    let isValid = true;
    if (!this.clothingForm.isValid()) {
      isValid = false;
    }
    if (!this.bodyForm.isValid()) {
      isValid = false;
    }
    if (!isValid) {
      return;
    }

    if (isEditingStep) {
      updateEditingStep({ isEditingStep: false });
      jumpToStep({ activeStepId: WizardConstants.FIT_ID_OVERVIEW_STEP });
    } else {
      jumpToStep({ activeStepId: WizardConstants.PETITE_PLUS_SURVEY_STEP });
    }
  }

  headerDescription() {
    if (this.props.isEditingStep) {
      return (
        <div>
          <h5 className="WizardStep__description u-mb--normal">
            These questions will contribute to refining your overall fit.
          </h5>
        </div>
      );
    }

    return (
      <div>
        <h5 className="WizardStep__description u-mb--normal">
          These first set of questions will contribute to refining your overall fit.
        </h5>
        <h5 className="WizardStep__description u-mb--normal">
          Already have a Fit I.D.?&nbsp;&nbsp;
          <a href="">Log in</a>
        </h5>
      </div>
    );
  }

  render() {
    const { isEditingStep } = this.props;

    return (
      <WizardStep
        handleCloseWizard={this.handleCloseWizard}
        handlePreviousStep={this.handlePreviousStep}
        currentStep={isEditingStep ? null : 1}
        totalSteps={isEditingStep ? null : 3}
        modalClassName="full-padding-big u-flex u-flex--1 u-vh--normal"
        modalContentClassName="u-width--full u-overflow-y--scroll"
        modalWrapperClassName="u-flex--col"
      >
        <div>
          <h3 className="WizardStep__title u-mb--normal">
            { isEditingStep
              ? 'Edit About You'
              : 'Let’s get started'
            }
          </h3>
          { this.headerDescription() }
        </div>

        <div className="grid u-ml--big">
          <div className="col-6">
            <BodySizeForm
              containerClassNames="u-mt--normal u-mb--big"
              validationHandler={ref => (this.bodyForm = ref)}
            />
          </div>

          <div className="col-6">
            <ClothingSizeForm
              containerClassNames="u-mt--normal u-mb--big"
              validationHandler={ref => (this.clothingForm = ref)}
            />
          </div>
        </div>

        <div className="ButtonBox--center">
          <Button
            className="SelectSizeProfile__button button-height--big"
            text={isEditingStep ? 'Save' : 'Next'}
            handleClick={this.handleNextSelection}
          />
        </div>

      </WizardStep>
    );
  }
}

AboutYouCombined.propTypes = {
  jumpToStep: PropTypes.func.isRequired,
  updateEditingStep: PropTypes.func.isRequired,
  // Redux Props
  isEditingStep: PropTypes.bool,
};

AboutYouCombined.defaultProps = {
  isEditingStep: false,
};

export default connect(stateToProps, dispatchToProps)(AboutYouCombined);
