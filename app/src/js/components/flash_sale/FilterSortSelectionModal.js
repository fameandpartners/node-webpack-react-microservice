import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import ModalContainer from '../modal/ModalContainer';
import Modal from '../modal/Modal';
import CollectionFilter from './CollectionFilter';
import CollectionSort from './CollectionSort';

// Actions
import ModalActions from '../../actions/ModalActions';

// Constants
import ModalConstants from '../../constants/ModalConstants';

function stateToProps(state) {
  return {
    activeModalId: state.$$modalState.get('modalId'),
  };
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

  injectModalStep() {
    const { activeModalId } = this.props;
    if (activeModalId === ModalConstants.FILTER_SELECTION_MODAL) {
      return <CollectionFilter />;
    } else if (activeModalId === ModalConstants.SORT_SELECTION_MODAL) {
      return <CollectionSort />;
    }
    return null;
  }

  render() {
    const isFilters = (this.props.activeModalId === ModalConstants.FILTER_SELECTION_MODAL);
    return (
      <ModalContainer
        slideUp
        dimBackground={false}
        modalIds={[
          ModalConstants.FILTER_SELECTION_MODAL,
          ModalConstants.SORT_SELECTION_MODAL,
        ]}
      >
        <Modal
          headline={isFilters ? 'Filters' : 'Sort'}
          handleCloseModal={this.handleCloseModal}
          modalClassName="u-flex u-flex--1"
          modalContentClassName="u-width--full u-overflow-y--scroll u-overflow-scrolling--touch"
          modalWrapperClassName="u-flex--col"
        >
          { this.injectModalStep() }
        </Modal>
      </ModalContainer>
    );
  }
}

FilterSelectionModal.propTypes = {
  // Redux Props
  activeModalId: PropTypes.string,
  // Redux Actions
  activateModal: PropTypes.func.isRequired,
};

FilterSelectionModal.defaultProps = {
  activeModalId: null,
  activateModal: null,
};


export default connect(stateToProps, dispatchToProps)(FilterSelectionModal);
