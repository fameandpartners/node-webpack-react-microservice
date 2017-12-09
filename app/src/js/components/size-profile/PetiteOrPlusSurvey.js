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

function stateToProps() {
  return {};
}

function dispatchToProps(dispatch) {
  const { jumpToStep } = bindActionCreators(WizardActions, dispatch);
  return { jumpToStep };
}

class PetiteOrPlusSurvey extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleCloseWizard() {
    this.props.jumpToStep({ shouldAppear: false });
  }

  handlePreviousStep() {
    this.props.jumpToStep({ activeStepId: WizardConstants.OVERALL_FIT_STEP });
  }

  handleNextSelection() {
    this.props.jumpToStep({ activeStepId: WizardConstants.CURRENT_DRESS_FIT_COMBINED_STEP });
  }

  render() {
    return (
      <WizardStep
        handleCloseWizard={this.handleCloseWizard}
        handlePreviousStep={this.handlePreviousStep}
        currentStep={2}
        totalSteps={3}
        modalClassName="full-padding-big u-flex u-flex--1"
        modalContentClassName="u-width--full u-overflow-y--scroll"
        modalWrapperClassName="u-flex--col"
      >
        <div className="u-mb-big u-mt-big">
          <h4 className="WizardStep__title">
            Do you ever buy clothing in petite sizes? (This can be on rare occasions)
          </h4>
        </div>

        <div className="grid-noGutter">
          <div className="col">
            <Button
              text="Yes"
              handleClick={this.handleNextSelection}
              className="Survey__button u-mr-small"
            />
            <Button
              text="No"
              handleClick={this.handleNextSelection}
              className="Survey__button"
            />
          </div>
        </div>

      </WizardStep>
    );
  }
}

PetiteOrPlusSurvey.propTypes = {
  jumpToStep: PropTypes.func.isRequired,
};

PetiteOrPlusSurvey.defaultProps = {
};

export default connect(stateToProps, dispatchToProps)(PetiteOrPlusSurvey);
