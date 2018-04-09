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
    this.state = {
      currentStep: 0,
    };
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

    if (this.state.currentStep === 0) {
      if (this.bodyForm.isValid()) {
        this.setState({ currentStep: 1 });
      }
    } else if (this.clothingForm.isValid()) {
      if (isEditingStep) {
        updateEditingStep({ isEditingStep: false });
        jumpToStep({ activeStepId: WizardConstants.FIT_ID_OVERVIEW_STEP });
      } else {
        jumpToStep({ activeStepId: WizardConstants.PETITE_PLUS_SURVEY_STEP });
      }
    }
  }

  headerDescription() {
    if (this.state.currentStep === 0) {
      return this.props.isEditingStep ?
      'These questions will contribute to refining your overall fit.' :
      'These first set of questions will contribute to refining your overall fit.';
    }
    return 'These questions will contribute to refining your overall fit.';
  }

  headerTitle() {
    if (this.state.currentStep === 0) {
      return this.props.isEditingStep ? 'Edit About You' : 'Let’s get started';
    }
    return 'What’s your bra and jeans waist size?';
  }

  render() {
    const {
      isEditingStep,
    } = this.props;

    const currentStepValue = this.state.currentStep;
    const wizardStepValue = currentStepValue === 0 ? 1 : 2;

    return (
      <div>
        <WizardStep
          handleCloseWizard={this.handleCloseWizard}
          handlePreviousStep={this.handlePreviousStep}
          currentStep={isEditingStep ? null : wizardStepValue}
          totalSteps={isEditingStep ? null : 5}
          modalClassName="full-padding-normal"
          modalContentClassName="u-width--full u-overflow-y--scroll"
          modalWrapperClassName=""
        >
          <div>
            <h3 className="WizardStep__title u-mb--normal">
              { this.headerTitle() }
            </h3>
            <h5 className="WizardStep__description u-mb--normal">
              { this.headerDescription() }
            </h5>
          </div>

          <div className="grid">
            <div className="col-12">
              { currentStepValue === 0 ?
                <BodySizeForm
                  containerClassNames="u-mt--normal u-mb--big"
                  validationHandler={ref => (this.bodyForm = ref)}
                  isMobile
                /> :
                <ClothingSizeForm
                  containerClassNames="u-mt--normal u-mb--big"
                  validationHandler={ref => (this.clothingForm = ref)}
                  isMobile
                />
              }
            </div>
          </div>

          { currentStepValue === 0 ?
            <h5 className="WizardStep__description u-mb--normal">
              Already have a Fit I.D.?&nbsp;&nbsp;
              <a href="">Log in</a>
            </h5> : null
          }
        </WizardStep>

        <div className="u-position--fixed u-width--full u-bottom">
          <Button
            className="SelectSizeProfile__button button-height--big"
            text={isEditingStep ? 'Save' : 'Next'}
            handleClick={this.handleNextSelection}
          />
        </div>
      </div>
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
