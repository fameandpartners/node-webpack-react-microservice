import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import WizardActions from '../../actions/WizardActions';

// Constants
import WizardConstants from '../../constants/WizardConstants';

// Breakpoint Decoration
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

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

  saveButton() {
    return (
      <Button
        className="SelectSizeProfile__button button-height--big"
        text="Save"
        handleClick={this.handleSaveSelection}
      />
    );
  }

  render() {
    const { breakpoint } = this.props;
    const isMobile = (breakpoint === 'tablet' || breakpoint === 'mobile');

    return (
      <div>
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
            { isMobile ? null : this.saveButton() }
          </div>

          <div>
            <p className="u-mb--normal">
              Want a better fit?&nbsp;&nbsp;
              <a href="">Get your Fit I.D.</a>
            </p>
          </div>
        </WizardStep>

        <div className="u-position--fixed u-width--full u-bottom">
          { isMobile ? this.saveButton() : null }
        </div>
      </div>
    );
  }
}

StandardSizing.propTypes = {
  jumpToStep: PropTypes.func.isRequired,
  breakpoint: PropTypes.string.isRequired,
};

StandardSizing.defaultProps = {
};

export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(StandardSizing));
