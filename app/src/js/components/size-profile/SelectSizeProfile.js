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

class SelectSizeProfile extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleCloseWizard() {
    this.props.jumpToStep({ shouldAppear: false });
  }

  handleSizeClick() {
    this.props.jumpToStep({ activeStepId: WizardConstants.STANDARD_SIZING_STEP });
  }

  handleFitIDClick() {
    this.props.jumpToStep({ activeStepId: WizardConstants.OVERALL_FIT_STEP });
  }

  render() {
    return (
      <WizardStep
        handleCloseWizard={this.handleCloseWizard}
        modalClassName="full-padding-big u-flex u-flex--1 u-vh--normal"
        modalContentClassName="u-width--full u-overflow-y--scroll"
        modalWrapperClassName="u-flex--col"
      >
        <div className="SelectSizeProfile">
          <h3 className="WizardStep__title u-mb--normal u-mt--big">
            Create a Fit I.D. to unlock your awesomeness!
          </h3>
          <h5 className="WizardStep__description u-mb--big">Avoid sizing confusions.
          Answer 8 simple questions and we'll create your perfect fit.
          If not we'll re-make it for you free of charge.</h5>
          <div className="ButtonBox--medium-width ButtonBox--center">
            <Button
              className="SelectSizeProfile__button button-height--big"
              text={['Use a ', <span className="title__emphasize">fit I.D.</span>]}
              handleClick={this.handleFitIDClick}
            />
          </div>
          <h5>Or</h5>
          <div className="ButtonBox--medium-width ButtonBox--center">
            <Button
              className="SelectSize__button button-height--big"
              text="Use standard sizing"
              handleClick={this.handleSizeClick}
            />
          </div>
          <p className="WizardStep__info">
            *Free returns and re-makes for <strong>Fit I.D.</strong> customers only.
          </p>
        </div>
      </WizardStep>
    );
  }
}

SelectSizeProfile.propTypes = {
  jumpToStep: PropTypes.func.isRequired,
};

SelectSizeProfile.defaultProps = {
};

export default connect(stateToProps, dispatchToProps)(SelectSizeProfile);
