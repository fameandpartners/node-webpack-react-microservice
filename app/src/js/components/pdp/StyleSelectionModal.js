import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import ModalContainer from '../modal/ModalContainer';
import Modal from '../modal/Modal';

// Actions
import ModalActions from '../../actions/ModalActions';

// Components
import ProductCustomizationStyle from './ProductCustomizationStyle';

// Constants
import ModalConstants from '../../constants/ModalConstants';
import CustomizationConstants from '../../constants/CustomizationConstants';

// CSS
import '../../../css/components/ProductFabricSwatches.scss';

function stateToProps(state) {
  return {
    temporaryStyleCustomizations: state.$$customizationState.get('temporaryStyleCustomizations').toJS(),
  };
}

function dispatchToProps(dispatch) {
  const { activateModal } = bindActionCreators(ModalActions, dispatch);

  return {
    activateModal,
  };
}

class StyleSelectionModal extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleCloseModal() {
    this.props.activateModal({ shouldAppear: false });
  }

  /**
   * Handle clearing of addon selections
   * @action -> activateAddonIdLayers
   */
  handleClearAddonSelections() {
    this.activateAddonIdLayers([]);
  }

  render() {
    return (
      <ModalContainer
        slideUp
        dimBackground={false}
        modalIds={[ModalConstants.STYLE_SELECTION_MODAL]}
      >
        <Modal
          handleCloseModal={this.handleCloseModal}
          headline={CustomizationConstants.STYLE_HEADLINE}
          modalClassName="u-flex u-flex--1"
          modalContentClassName="u-width--full u-overflow-y--scroll u-overflow-scrolling--touch"
          modalWrapperClassName="u-flex--col"
        >
          <ProductCustomizationStyle hasNavItems={false} clearAll={false} />
        </Modal>
      </ModalContainer>
    );
  }
}

StyleSelectionModal.propTypes = {
  // Redux Actions
  activateModal: PropTypes.func.isRequired,
};

StyleSelectionModal.defaultProps = {
  temporaryStyleCustomizations: [],
};


export default connect(stateToProps, dispatchToProps)(StyleSelectionModal);
