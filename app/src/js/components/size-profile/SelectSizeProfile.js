import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import ModalActions from '../../actions/ModalActions';

// Constants
import ModalConstants from '../../constants/ModalConstants';

// Components
import Button from '../generic/Button';
import WizardStep from '../wizard/WizardStep';

function stateToProps() {
  return {};
}

function dispatchToProps(dispatch) {
  const { activateModal } = bindActionCreators(ModalActions, dispatch);
  return { activateModal };
}

class SelectSizeProfile extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleCloseWizard() {
    this.props.activateModal({ shouldAppear: false });
  }

  handleSizeClick() {
    this.props.activateModal({ modalId: ModalConstants.STANDARD_SIZING_MODAL });
  }

  handleFitIDClick() {
    this.props.activateModal({ modalId: ModalConstants.START_FIT_ID_WIZARD });
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
  activateModal: PropTypes.func.isRequired,
};

SelectSizeProfile.defaultProps = {
};

export default connect(stateToProps, dispatchToProps)(SelectSizeProfile);
