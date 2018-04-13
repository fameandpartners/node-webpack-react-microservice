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

class CurrentDressFitMobile extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      currentStep: 0,
    };
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

    if (this.state.currentStep === 0) {
      if (this.dressSizeForm.isValid()) {
        this.setState({ currentStep: 1 });
      }
    } else if (this.dressFitForm.isValid()) {
      if (isEditingStep) {
        updateEditingStep({ isEditingStep: false });
        jumpToStep({ activeStepId: WizardConstants.FIT_ID_OVERVIEW_STEP });
      } else {
        jumpToStep({ activeStepId: WizardConstants.FIT_ID_OVERVIEW_STEP });
      }
    }
  }

  render() {
    const {
      editSectionId,
      isEditingStep,
    } = this.props;

    const currentStepValue = this.state.currentStep;
    const wizardStepValue = currentStepValue === 0 ? 4 : 5;

    return (
      <div>
        <WizardStep
          handleCloseWizard={this.handleCloseWizard}
          handlePreviousStep={this.handlePreviousStep}
          currentStep={isEditingStep ? null : wizardStepValue}
          totalSteps={isEditingStep ? null : 5}
          modalClassName="u-padding-big u-flex u-flex--1 u-vh--normal"
          modalContentClassName="u-width--full u-overflow-y--scroll"
          modalWrapperClassName="u-flex--col"
          headline={isEditingStep ? `Edit ${editSectionId} Info` : null}
        >
          { currentStepValue === 0 ?
            <div>
              <h4 className="u-text-align--center u-mb--small u-mt--normal">
                In <span className="title__emphasize">US sizes</span>,
                what fitted dress size do you typically wear?
              </h4>
              <img
                alt="current shopping dress"
                className="CurrentDressFitMobile__header-image"
                src="https://d1msb7dh8kb0o9.cloudfront.net/spree/products/31545/original/fp2006-pale_blue-1.jpg?1471292831"
              />
            </div>
            :
            <h4 className="u-text-align--center u-mb--small u-mt--normal">
              How do fitted dresses in <br />
              <span className="title__emphasize">your size</span> tend to fit?
            </h4>
          }

          <div className="grid">
            <div className="col-12">
              { currentStepValue === 0 ?
                <CurrentDressSizeForm
                  containerClassNames="u-mt--normal u-mb--big"
                  validationHandler={ref => (this.dressSizeForm = ref)}
                  isMobile
                /> :
                <CurrentDressFitForm
                  containerClassNames="u-mt--normal u-mb--big clear-ml"
                  validationHandler={ref => (this.dressFitForm = ref)}
                  editSectionId={editSectionId}
                  isMobile
                />
              }
            </div>
          </div>

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

CurrentDressFitMobile.propTypes = {
  jumpToStep: PropTypes.func.isRequired,
  updateEditingStep: PropTypes.func.isRequired,
  // Redux Props
  isEditingStep: PropTypes.bool,
  editSectionId: PropTypes.string,
};

CurrentDressFitMobile.defaultProps = {
  isEditingStep: false,
  editSectionId: null,
};

export default connect(stateToProps, dispatchToProps)(CurrentDressFitMobile);
