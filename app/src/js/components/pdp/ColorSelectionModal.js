import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import objnoop from '../../libs/objnoop';

// Components
import ModalContainer from '../modal/ModalContainer';
import Modal from '../modal/Modal';
import Button from '../generic/Button';

// Actions
import ModalActions from '../../actions/ModalActions';

// Constants
import ModalConstants from '../../constants/ModalConstants';

function mapDispatchToProps(dispatch) {
  const { activateModal } = bindActionCreators(ModalActions, dispatch);
  return { activateModal };
}

class ProductFabricModal extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleCloseModal() {
    this.props.activateModal({ shouldAppear: false });
  }

  render() {
    return (
      <ModalContainer
        slideUp
        dimBackground={false}
        modalIds={[ModalConstants.COLOR_SELECTION_MODAL]}
      >
        <Modal
          handleCloseModal={this.handleCloseModal}
          modalClassName="grid-middle u-flex--1"
          modalContentClassName="width--full"
          modalWrapperClassName="u-flex--col"
        >
          <div className="ProductFabricModal textAlign--center grid-middle">
            <div className="Modal__content--med-margin-bottom">
              Some Color swatches go here
            </div>
          </div>
          <div className="ButtonGroup">
            <Button secondary text="Cancel" />
            <Button text="Save" />
          </div>
        </Modal>
      </ModalContainer>
    );
  }
}

ProductFabricModal.propTypes = {
  // Redux Actions
  activateModal: PropTypes.func.isRequired,
};

ProductFabricModal.defaultProps = {
  // Redux
  activeModalId: null,
};


export default connect(objnoop, mapDispatchToProps)(ProductFabricModal);
