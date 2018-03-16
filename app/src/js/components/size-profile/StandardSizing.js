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
import WizardStep from '../wizard/WizardStep';
import StandardSizeForm from './StandardSizeForm';
import Button from '../generic/Button';

function stateToProps() {
  return {};
}

function dispatchToProps(dispatch) {
  const { jumpToStep } = bindActionCreators(WizardActions, dispatch);
  return {
    jumpToStep,
  };
}

class StandardSizing extends Component {
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

  handleSaveSelection() {
    if (this.sizeForm.isValid()) {
      this.props.jumpToStep({ shouldAppear: false });
    }
  }

  render() {
    return (
      <WizardStep
        handleCloseWizard={this.handleCloseWizard}
        handlePreviousStep={this.handlePreviousStep}
        modalClassName="full-padding-big u-flex u-flex--1"
        modalContentClassName="u-width--full u-overflow-y--scroll u-height--normal"
        modalWrapperClassName="u-flex--col"
      >
        <StandardSizeForm
          displaySaveButton
          containerClassNames="u-mt--big u-mb--big"
          validationHandler={ref => (this.sizeForm = ref)}
        />

        <div className="ButtonBox--center">
          <Button
            className="SelectSizeProfile__button button-height--big"
            text="Save"
            handleClick={this.handleSaveSelection}
          />
        </div>
        <div>
          <p className="u-mb--normal">
            Want a better fit?&nbsp;&nbsp;
            <a href="">Get your Fit I.D.</a>
          </p>
        </div>
      </WizardStep>
    );
  }
}

StandardSizing.propTypes = {
  jumpToStep: PropTypes.func.isRequired,
};

StandardSizing.defaultProps = {
};

export default connect(stateToProps, dispatchToProps)(StandardSizing);
