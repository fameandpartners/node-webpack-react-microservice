import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import ModalActions from '../../actions/ModalActions';

// Components
import Button from '../generic/Button';
import Modal from '../modal/Modal';

function dispatchToProps(dispatch) {
  const { activateModal } = bindActionCreators(ModalActions, dispatch);
  return { activateModal };
}

class CreateFitID extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleClick() {
    return null;
  }

  handleCloseModal() {
    this.props.activateModal({ shouldAppear: false });
  }

  render() {
    return (
      <Modal
        handleCloseModal={this.handleCloseModal}
        modalClassName="full-padding-big u-flex u-flex--1"
        modalContentClassName="u-width--full u-overflow-y--scroll"
        modalWrapperClassName="u-flex--col"
      >
        <div className="CreateFitID u-height--full">
          <div className="">
            <Button
              className="CreateFitIDButton"
              text="Use a fit I.D."
            />
          </div>
          <div>
            <Button
              className="SelectSizeButton"
              text="Use standard sizing"
            />
          </div>

        </div>
      </Modal>
    );
  }
}

CreateFitID.propTypes = {
  activateModal: PropTypes.func.isRequired,
};

// CreateFitID.defaultProps = {

// }

export default connect(dispatchToProps)(CreateFitID);
