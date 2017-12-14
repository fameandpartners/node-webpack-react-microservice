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

function stateToProps() {
  return {};
}

function dispatchToProps(dispatch) {
  const { jumpToStep } = bindActionCreators(WizardActions, dispatch);
  return { jumpToStep };
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
    this.props.jumpToStep({ activeStepId: WizardConstants.FIT_ID_OVERVIEW_STEP });
  }

  render() {
    return (
      <WizardStep
        handleCloseWizard={this.handleCloseWizard}
        handlePreviousStep={this.handlePreviousStep}
        currentStep={3}
        totalSteps={3}
        modalClassName="full-padding-big u-flex u-flex--1"
        modalContentClassName="u-width--full u-overflow-y--scroll"
        modalWrapperClassName="u-flex--col"
      >
        <div className="grid-12-noGutter">
          <div className="col-6">
            <CurrentDressSizeForm
              containerClassNames="u-mt-normal u-mb-big"
            />
          </div>

          <div className="col-6">
            <CurrentDressFitForm
              containerClassNames="u-mt-normal u-mb-big"
            />
          </div>
        </div>

        <div className="ButtonBox--center">
          <Button
            className="SelectSizeProfile__button button-height-big"
            text="Next"
            handleClick={this.handleNextSelection}
          />
        </div>

      </WizardStep>
    );
  }
}

CurrentDressFitCombined.propTypes = {
  jumpToStep: PropTypes.func.isRequired,
};

CurrentDressFitCombined.defaultProps = {
};

export default connect(stateToProps, dispatchToProps)(CurrentDressFitCombined);
