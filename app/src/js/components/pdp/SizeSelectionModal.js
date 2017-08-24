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
import ButtonLedge from '../generic/ButtonLedge';
import ProductCustomizationSize from './ProductCustomizationSize';

// Constants
import ModalConstants from '../../constants/ModalConstants';
import CustomizationConstants from '../../constants/CustomizationConstants';

// CSS
import '../../../css/components/ProductFabricSwatches.scss';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  const { activateModal } = bindActionCreators(ModalActions, dispatch);
  return { activateModal };
}

class StyleSelectionModal extends PureComponent {
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
        modalIds={[ModalConstants.SIZE_SELECTION_MODAL]}
      >
        <Modal
          handleCloseModal={this.handleCloseModal}
          headline={CustomizationConstants.SIZE_HEADLINE}
          modalClassName="u-flex u-flex--1"
          modalContentClassName="u-width--full u-overflow-y--scroll"
          modalWrapperClassName="u-flex--col"
        >
          <ProductCustomizationSize hasNavItems={false} />
          <div className="u-position--absolute u-bottom u-width--full">
            <ButtonLedge
              handleLeftButtonClick={this.handleCloseModal}
              handleRightButtonClick={() => {}}
            />
          </div>
        </Modal>
      </ModalContainer>
    );
  }
}

StyleSelectionModal.propTypes = {
  // Redux Actions
  activateModal: PropTypes.func.isRequired,
};

StyleSelectionModal.defaultProps = {};


export default connect(mapStateToProps, mapDispatchToProps)(StyleSelectionModal);
