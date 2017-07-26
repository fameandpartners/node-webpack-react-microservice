import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import ModalContainer from '../modal/ModalContainer';
import ColorSwatches from './ColorSwatches';
import Modal from '../modal/Modal';

// Actions
import ModalActions from '../../actions/ModalActions';
import ProductActions from '../../actions/ProductActions';

// Constants
import ModalConstants from '../../constants/ModalConstants';

// CSS
import '../../../css/components/ProductFabricSwatches.scss';

function mapStateToProps(state) {
  return {
    productDefaultColors: state.$$productState.get('productDefaultColors').toJS(),
    productSecondaryColors: state.$$productState.get('productSecondaryColors').toJS(),
    productSecondaryColorCentsPrice: state.$$productState.get('productSecondaryColorCentsPrice'),
    selectedColorId: state.$$productState.get('selectedColor').get('id'),
  };
}

function mapDispatchToProps(dispatch) {
  const { activateModal } = bindActionCreators(ModalActions, dispatch);
  const { selectProductColor } = bindActionCreators(ProductActions, dispatch);
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
    const {
      productDefaultColors,
      productSecondaryColors,
      productSecondaryColorCentsPrice,
      selectedColorId,
    } = this.props;

    return (
      <ModalContainer
        slideUp
        dimBackground={false}
        modalIds={[ModalConstants.COLOR_SELECTION_MODAL]}
      >
        <Modal
          handleCloseModal={this.handleCloseModal}
          modalClassName="u-flex--1"
          modalContentClassName="width--full u-overflow-y--scroll"
          modalWrapperClassName="u-flex--col"
        >
          <div className="height--full textAlign--center">
            <div className="Modal__content--med-margin-bottom Modal__layout-container">
              <ColorSwatches
                productDefaultColors={productDefaultColors}
                productSecondaryColors={productSecondaryColors}
                productSecondaryColorCentsPrice={productSecondaryColorCentsPrice}
                selectedColorId={selectedColorId}
                handleColorSelection={this.handleColorSelection}
              />
            </div>
          </div>
        </Modal>
      </ModalContainer>
    );
  }
}

ProductFabricModal.propTypes = {
  // Redux Props
  productDefaultColors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    hexValue: PropTypes.string,
    patternUrl: PropTypes.string,
  })).isRequired,
  // Redux Props
  productSecondaryColorCentsPrice: PropTypes.number.isRequired,
  productSecondaryColors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    hexValue: PropTypes.string,
    patternUrl: PropTypes.string,
  })).isRequired,
  selectedColorId: PropTypes.string,
  // Redux Actions
  activateModal: PropTypes.func.isRequired,
  selectProductColor: PropTypes.func.isRequired,
};

ProductFabricModal.defaultProps = {
  selectedColorId: '',
  activeModalId: null,
};


export default connect(mapStateToProps, mapDispatchToProps)(ProductFabricModal);
