import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import ModalContainer from '../modal/ModalContainer';
import Modal from '../modal/Modal';
import CollectionFilter from './CollectionFilter';

// Actions
import ModalActions from '../../actions/ModalActions';

// Constants
import ModalConstants from '../../constants/ModalConstants';

function stateToProps() {
  return {};
}


function dispatchToProps(dispatch) {
  const { activateModal } = bindActionCreators(ModalActions, dispatch);
  return {
    activateModal,
  };
}

class FilterSelectionModal extends PureComponent {
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
        modalIds={[ModalConstants.FILTER_SELECTION_MODAL]}
      >
        <Modal
          headline="Filters"
          handleCloseModal={this.handleCloseModal}
          modalClassName="u-flex u-flex--1"
          modalContentClassName="u-width--full u-overflow-y--scroll"
          modalWrapperClassName="u-flex--col"
        >

          <CollectionFilter />
        </Modal>
      </ModalContainer>
    );
  }
}

FilterSelectionModal.propTypes = {
  // Redux Props
  // Redux Actions
  activateModal: PropTypes.func.isRequired,
};

FilterSelectionModal.defaultProps = {
  activeModalId: null,
};


export default connect(stateToProps, dispatchToProps)(FilterSelectionModal);
