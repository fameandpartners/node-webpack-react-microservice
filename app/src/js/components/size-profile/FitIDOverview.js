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

  render() {
    return (
      <WizardStep
        handlePreviousStep={this.handlePreviousStep}
        handleCloseWizard={this.handleCloseWizard}
        modalClassName="full-padding-big u-flex u-flex--1"
        modalContentClassName="u-width--full u-overflow-y--scroll"
        modalWrapperClassName="u-flex--col"
      >
        <div className="FitIDOverview">
          <h3 className="WizardStep__title u-mb-normal u-mt-big">
            Let&rsquo;s make sure we got this correct.
          </h3>
          <div className="ButtonBox--medium-width ButtonBox--center">
            <Button
              className="FitIDOverview__button"
              text="Save your Fit I.D. to your profile"
              handleClick={this.saveFitID}
            />
          </div>
        </div>
      </WizardStep>
    );
  }
}

FitIDOverview.propTypes = {
  jumpToStep: PropTypes.func.isRequired,
};

FitIDOverview.defaultProps = {
};

export default connect(stateToProps, dispatchToProps)(FitIDOverview);
