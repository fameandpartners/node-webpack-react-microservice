import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import ModalActions from '../../actions/ModalActions';

// Constants
// import ModalConstants from '../../constants/ModalConstants';

// Components
// import Button from '../generic/Button';
import Modal from '../modal/Modal';

function stateToProps() {
  return {};
}

function dispatchToProps(dispatch) {
  const { activateModal } = bindActionCreators(ModalActions, dispatch);
  return { activateModal };
}

class StandardSizing extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
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
        <h1>Select Sizing</h1>
      </Modal>
    );
  }
}

StandardSizing.propTypes = {
  activateModal: PropTypes.func.isRequired,
};

StandardSizing.defaultProps = {
};

export default connect(stateToProps, dispatchToProps)(StandardSizing);
