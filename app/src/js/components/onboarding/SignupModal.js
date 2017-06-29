/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import autobind from 'react-autobind';

// Components
import CancelOut from '../shared/CancelOut';
import Input from '../form/Input';
import FacebookButton from '../generic/FacebookButton';
import Button from '../generic/Button';
import Modal from '../modal/Modal';

// Actions
import ModalActions from '../../actions/ModalActions';

// Constants
import ModalConstants from '../../constants/ModalConstants';

function mapStateToProps() {
  return {};
}

function dispatchToProps(dispatch) {
  const actions = bindActionCreators(ModalActions, dispatch);
  return { activateModal: actions.activateModal };
}

class SignupModal extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  handleCloseModal() {
    this.props.activateModal({ shouldAppear: false });
  }

  handleSwitchModal(modalId) {
    return () => {
      this.props.activateModal({ modalId });
    };
  }

  render() {
    return (
      <Modal>
        <div
          className="SignupModal"
        >
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
          <Button tall className="Modal__content--sm-margin-bottom" text="Sign up" />
          <p>
            <span>Already a member?&nbsp;</span>
            <span
              onClick={this.handleSwitchModal(ModalConstants.LOG_IN_MODAL)}
              className="App__link"
            >Sign in</span>
          </p>
        </div>
      </Modal>
    );
  }
}

SignupModal.propTypes = {
  // Redux
  activateModal: func.isRequired,
};

export default connect(mapStateToProps, dispatchToProps)(SignupModal);
