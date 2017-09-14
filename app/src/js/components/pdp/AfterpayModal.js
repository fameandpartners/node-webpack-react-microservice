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

// Assets
import afterpayImage from '../../../img/test/afterpay-lg.png';

// CSS
import '../../../css/components/AfterpayModal.scss';


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
          handleCloseModal={this.handleCloseModal}
        >
          <div
            className="AfterpayModal Modal__layout-container typography u-text-align--left"
          >
            <div className="AfterpayModal__header">
              <img
                alt="AfterPay Logo"
                className="AfterPay__image-logo"
                src={afterpayImage}
              />
              <h4 className="AfterpayModal__headline">
                Buy Now. Pay Later. No Interest
              </h4>
            </div>
            <ul className="AfterpayModal__content-block">
              <li>How it works.</li>
              <li>Select Afterpay as your payment method when you check out.</li>
              <li>Use your existing debit or credit card.</li>
              <li>Completed your check.</li>
              <li>No long forms, instant approval online</li>
              <li>Pay over 4 equal installments.</li>
              <li>Pay fortnightly, enjoy your purchase straight away!</li>
            </ul>
            <ul className="AfterpayModal__content-block">
              <li>You simply need</li>
              <li>A debit card or credit card</li>
              <li>To be over 18 years of age</li>
              <li>To live in Australia</li>
              <li>
                To see Afterpay’s complete terms, visit
                <br />
                <a
                  className="link link--static"
                >
                  www.afterpay.com.au/terms
                </a>
              </li>
            </ul>
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
