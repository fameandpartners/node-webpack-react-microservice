import React, { Component } from 'react';
import { func } from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import CancelOut from '../shared/CancelOut';
// import Modal from '../shared/Modal';
import ModalContainer from '../modal/ModalContainer';
import Modal from '../modal/Modal';
import Input from '../form/Input';
import FacebookButton from '../generic/FacebookButton';
import Button from '../generic/Button';

// Actions
import ModalActions from '../../actions/ModalActions';

// Constants
import ModalConstants from '../../constants/ModalConstants';

function mapStateToProps() {
  return {};
}

function dispatchToProps(dispatch) {
  const actions = bindActionCreators(ModalActions, dispatch);
  return {
    activateModal: actions.activateModal,
  };
}

class OnboardingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    autoBind(this);
  }

  handleCloseModal() {
    this.props.activateModal({ modalId: null });
  }

  render() {
    return (
      <ModalContainer
        closeOnBackgroundClick
        modalIds={[
          ModalConstants.SIGN_UP_MODAL,
          ModalConstants.LOG_IN_MODAL,
        ]}
      >
        <Modal>
          <div className="Modal__header">
            <div className="u-text-align-right">
              <CancelOut onClick={this.handleCloseModal} />
            </div>
          </div>
          <div className="Modal__content typography">
            <div className="Modal__content--med-margin-bottom">
              <h3 className="h5">Sign up to save your creation</h3>
            </div>
            <FacebookButton />
            <h4 className="h5 hr">Or</h4>
            <div className="Modal__content--med-margin-bottom">
              <Input
                id="signup_first"
                label="First Name"
                wrapperClassName="Modal__content--med-margin-bottom"
              />
              <Input
                id="signup_last"
                label="Last Name"
                wrapperClassName="Modal__content--med-margin-bottom"
              />
              <Input
                id="signup_email"
                label="Email"
                wrapperClassName="Modal__content--med-margin-bottom"
              />
              <Input
                id="signup_password"
                type="password"
                label="Password"
                wrapperClassName="Modal__content--med-margin-bottom"
              />
            </div>
          </div>
          <Button tall text="Sign up" />
        </Modal>
      </ModalContainer>
    );
  }
}

OnboardingModal.propTypes = {
  // Redux
  activateModal: func.isRequired,
};

export default connect(mapStateToProps, dispatchToProps)(OnboardingModal);
