/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import autobind from 'react-autobind';

// Components
import ModalContainer from '../modal/ModalContainer';
import Modal from '../modal/Modal';

// Actions
import ModalActions from '../../actions/ModalActions';

// Constants
import ModalConstants from '../../constants/ModalConstants';


function stateToProps() {
  return {};
}

function dispatchToProps(dispatch) {
  const actions = bindActionCreators(ModalActions, dispatch);
  return { activateModal: actions.activateModal };
}

class AfterpayModal extends PureComponent {
  constructor(props) {
    super(props);
    autobind(this);
  }

  handleCloseModal() {
    this.props.activateModal({ shouldAppear: false });
  }

  render() {
    return (
      <ModalContainer
        modalContainerClass="grid-middle"
        modalIds={[ModalConstants.AFTERPAY_MODAL]}
      >
        <Modal
          headline="Buy Now. Pay Later. No Interest"
          handleCloseModal={this.handleCloseModal}
        >
          <div
            className="AfterpayModal typography Modal__layout-container"
          >
            <h2>
              How it works.
            </h2>
            <p>
              Select Afterpay as your payment method when you check out.
            </p>
            <p>
              Use your existing debit or credit card.
            </p>
            <p>
              Completed your check.
            </p>
            <p>
              No long forms, instant approval online.
            </p>
            <p>
              Pay over 4 equal instalments.
            </p>
            <p>
              Pay fortnightly, enjoy your purchase straight away!
            </p>

            <h2>
              You simply need
            </h2>
            <p>
              A debit card or credit card
            </p>
            <p>
              To be over 18 years of age
            </p>
            <p>
              To live in Australia
            </p>
            <p>
              To see Afterpay’s complete terms, visit www.afterpay.com.au/terms
            </p>
          </div>
        </Modal>
      </ModalContainer>
    );
  }
}

AfterpayModal.propTypes = {
  // Redux
  activateModal: func.isRequired,
};

export default connect(stateToProps, dispatchToProps)(AfterpayModal);
