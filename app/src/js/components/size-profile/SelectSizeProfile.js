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
    console.log('FIT ID');
  }

  render() {
    return (
      <WizardStep
        handleCloseWizard={this.handleCloseWizard}
        modalClassName="full-padding-big u-flex u-flex--1"
        modalContentClassName="u-width--full u-overflow-y--scroll"
        modalWrapperClassName="u-flex--col"
      >
        <div className="SelectSizeProfile">
          <div className="ButtonBox--medium-width ButtonBox--center">
            <Button
              className="SelectSizeProfile__button"
              text="Use a fit I.D."
              handleClick={this.handleFitIDClick}
            />
          </div>
          <div className="ButtonBox--medium-width ButtonBox--center">
            <Button
              className="SelectSize__button"
              text="Use standard sizing"
              handleClick={this.handleSizeClick}
            />
          </div>

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
