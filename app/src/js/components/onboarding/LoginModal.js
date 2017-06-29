/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import autobind from 'react-autobind';

// Components
import CancelOut from '../shared/CancelOut';
// import Input from '../form/Input';
// import FacebookButton from '../generic/FacebookButton';
// import Button from '../generic/Button';
import Modal from '../modal/Modal';

// Actions
import ModalActions from '../../actions/ModalActions';

// Constants
// import ModalConstants from '../../constants/ModalConstants';

function mapStateToProps() {
  return {};
}

function dispatchToProps(dispatch) {
  const actions = bindActionCreators(ModalActions, dispatch);
  return { activateModal: actions.activateModal };
}

class LoginModal extends Component {
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
          className="LoginModal"
        >
          <div className="Modal__header">
            <div className="u-text-align-right">
              <CancelOut onClick={this.handleCloseModal} />
            </div>
          </div>
          Log in Modal
        </div>
      </Modal>
    );
  }
}

LoginModal.propTypes = {
  // Redux
  activateModal: func.isRequired,
};

export default connect(mapStateToProps, dispatchToProps)(LoginModal);
