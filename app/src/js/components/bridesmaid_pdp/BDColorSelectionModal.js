import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import ModalContainer from '../modal/ModalContainer';
import Modal from '../modal/Modal';
import BDCustomizationColor from './BDCustomizationColor';

// Actions
import ModalActions from '../../actions/ModalActions';

// Constants
import CustomizationConstants from '../../constants/CustomizationConstants';
import BDModalConstants from '../../constants/BDModalConstants';

// CSS
import '../../../css/components/ProductFabricSwatches.scss';

function stateToProps(state) {
  return {
    temporaryColor: state.$$customizationState.get('temporaryColor').toJS(),
  };
}


function dispatchToProps(dispatch) {
  const { activateModal } = bindActionCreators(ModalActions, dispatch);
  return {
    activateModal,
  };
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
        modalIds={[BDModalConstants.BD_COLOR_SELECTION_MODAL]}
      >
        <Modal
          headline={CustomizationConstants.COLOR_HEADLINE}
          handleCloseModal={this.handleCloseModal}
          modalClassName="u-flex u-flex--1"
          modalContentClassName="u-width--full"
          modalWrapperClassName="u-flex--col"
        >
          <BDCustomizationColor
            hasNavItems={false}
          />
        </Modal>
      </ModalContainer>
    );
  }
}

ProductFabricModal.propTypes = {
  // Redux Props
  // Redux Actions
  activateModal: PropTypes.func.isRequired,
};

ProductFabricModal.defaultProps = {
  activeModalId: null,
};


export default connect(stateToProps, dispatchToProps)(ProductFabricModal);
