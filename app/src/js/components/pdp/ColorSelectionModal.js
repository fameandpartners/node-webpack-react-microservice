import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import ModalContainer from '../modal/ModalContainer';
import Modal from '../modal/Modal';
import ProductCustomizationColor from '../pdp/ProductCustomizationColor';

// Actions
import ModalActions from '../../actions/ModalActions';

// Constants
import CustomizationConstants from '../../constants/CustomizationConstants';
import ModalConstants from '../../constants/ModalConstants';

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
        modalIds={[ModalConstants.COLOR_SELECTION_MODAL]}
      >
        <Modal
          headline={CustomizationConstants.COLOR_HEADLINE}
          handleCloseModal={this.handleCloseModal}
          modalClassName="u-flex u-flex--1"
          modalContentClassName="u-width--full u-overflow-y--scroll u-overflow-scrolling--touch"
          modalWrapperClassName="u-flex--col"
        >

          <ProductCustomizationColor
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
