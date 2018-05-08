import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import Modal from '../modal/Modal';

// Actions
import ModalActions from '../../actions/ModalActions';

// Components
import ProductCustomizationSize from './ProductCustomizationSize';

// Constants
import CustomizationConstants from '../../constants/CustomizationConstants';

// CSS
import '../../../css/components/ProductFabricSwatches.scss';

function stateToProps(state) {
  return {
    temporaryDressSize: state.$$customizationState.get('temporaryDressSize'),
    temporaryHeightValue: state.$$customizationState.get('temporaryHeightValue'),
    temporaryMeasurementMetric: state.$$customizationState.get('temporaryMeasurementMetric'),
  };
}

function dispatchToProps(dispatch) {
  const { activateModal } = bindActionCreators(ModalActions, dispatch);

  return {
    activateModal,
  };
}

class SizeSelectionModal extends PureComponent {
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
        headline={CustomizationConstants.SIZE_HEADLINE}
        modalClassName="u-flex u-flex--1"
        modalContentClassName="u-width--full u-overflow-y--scroll u-overflow-scrolling--touch"
        modalWrapperClassName="u-flex--col"
      >
        <ProductCustomizationSize hasNavItems={false} />
      </Modal>
    );
  }
}

SizeSelectionModal.propTypes = {
  // Redux Actions
  activateModal: PropTypes.func.isRequired,
};

SizeSelectionModal.defaultProps = {
  temporaryDressSize: null,
  temporaryHeightValue: null,
};


export default connect(stateToProps, dispatchToProps)(SizeSelectionModal);
