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
import CurrentDressSizeForm from './CurrentDressSizeForm';
import CurrentDressFitForm from './CurrentDressFitForm';

function stateToProps(state) {
  return {
    isEditingStep: state.$$wizardState.get('isEditingStep'),
    editSectionId: state.$$wizardState.get('editSectionId'),
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

class CurrentDressFitCombined extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleCloseWizard() {
    this.props.jumpToStep({ shouldAppear: false });
  }

  handlePreviousStep() {
    this.props.jumpToStep({ activeStepId: WizardConstants.PETITE_PLUS_SURVEY_STEP });
  }

  handleNextSelection() {
    const {
      jumpToStep,
      isEditingStep,
      updateEditingStep,
    } = this.props;

    let isValid = true;
    if (!this.dressFitForm.isValid()) {
      isValid = false;
    }
    if (!this.dressSizeForm.isValid()) {
      isValid = false;
    }
    if (!isValid) {
      return;
    }

    if (isEditingStep) {
      updateEditingStep({ isEditingStep: false });
      jumpToStep({ activeStepId: WizardConstants.FIT_ID_OVERVIEW_STEP });
    } else {
      jumpToStep({ activeStepId: WizardConstants.FIT_ID_OVERVIEW_STEP });
    }
  }

  render() {
    const {
      editSectionId,
      isEditingStep,
    } = this.props;

    return (
      <WizardStep
        handleCloseWizard={this.handleCloseWizard}
        handlePreviousStep={this.handlePreviousStep}
        currentStep={isEditingStep ? null : 3}
        totalSteps={isEditingStep ? null : 3}
        modalClassName="u-padding-big u-flex u-flex--1 u-vh-normal"
        modalContentClassName="u-width--full u-overflow-y--scroll"
        modalWrapperClassName="u-flex--col"
        headline={isEditingStep ? `Edit ${editSectionId} Info` : null}
      >
        <img
          alt="current shopping dress"
          className="CurrentDressFitCombined__header-image"
          src="https://d1msb7dh8kb0o9.cloudfront.net/spree/products/31545/original/fp2006-pale_blue-1.jpg?1471292831"
        />
        <div className="grid-12-noGutter">
          <div className="col-6">
            <CurrentDressSizeForm
              containerClassNames="u-mt-normal u-mb-big"
              validationHandler={ref => (this.dressSizeForm = ref)}
            />
          </div>

          <div className="col-6">
            <CurrentDressFitForm
              containerClassNames="u-mt-normal u-mb-big"
              validationHandler={ref => (this.dressFitForm = ref)}
              editSectionId={editSectionId}
            />
          </div>
        </div>

        <div className="ButtonBox--center">
          <Button
            className="SelectSizeProfile__button button-height-big"
            text={isEditingStep ? 'Save' : 'Next'}
            handleClick={this.handleNextSelection}
          />
        </div>

      </WizardStep>
    );
  }
}

CurrentDressFitCombined.propTypes = {
  jumpToStep: PropTypes.func.isRequired,
  updateEditingStep: PropTypes.func.isRequired,
  // Redux Props
  isEditingStep: PropTypes.bool,
  editSectionId: PropTypes.string,
};

CurrentDressFitCombined.defaultProps = {
  isEditingStep: false,
  editSectionId: null,
};

export default connect(stateToProps, dispatchToProps)(CurrentDressFitCombined);
