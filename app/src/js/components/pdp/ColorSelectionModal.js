import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import ModalContainer from '../modal/ModalContainer';
import Modal from '../modal/Modal';
import ProductCustomizationColor from '../pdp/ProductCustomizationColor';

// Components
import ButtonLedge from '../generic/ButtonLedge';

// Actions
import ModalActions from '../../actions/ModalActions';
import CustomizationActions from '../../actions/CustomizationActions';

// Constants
import CustomizationConstants from '../../constants/CustomizationConstants';
import ModalConstants from '../../constants/ModalConstants';

// CSS
import '../../../css/components/ProductFabricSwatches.scss';

function mapStateToProps(state) {
  return {
    productDefaultColors: state.$$productState.get('productDefaultColors').toJS(),
    productSecondaryColors: state.$$productState.get('productSecondaryColors').toJS(),
    selectedColorId: state.$$customizationState.get('selectedColor').get('id'),
  };
}

function mapDispatchToProps(dispatch) {
  const { activateModal } = bindActionCreators(ModalActions, dispatch);
  const { selectProductColor } = bindActionCreators(CustomizationActions, dispatch);
  return { activateModal, selectProductColor };
}

class ProductFabricModal extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleCloseModal() {
    this.props.activateModal({ shouldAppear: false });
  }

  handleColorSelection(color) {
    const { selectProductColor } = this.props;
    selectProductColor({ color });
    this.handleCloseModal();
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
          modalContentClassName="u-width--full u-overflow-y--scroll"
          modalWrapperClassName="u-flex--col"
        >

          <ProductCustomizationColor
            hasNavItems={false}
          />
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

ProductFabricModal.propTypes = {
  // Redux Actions
  activateModal: PropTypes.func.isRequired,
  selectProductColor: PropTypes.func.isRequired,
};

ProductFabricModal.defaultProps = {
  selectedColorId: '',
  activeModalId: null,
};


export default connect(mapStateToProps, mapDispatchToProps)(ProductFabricModal);
