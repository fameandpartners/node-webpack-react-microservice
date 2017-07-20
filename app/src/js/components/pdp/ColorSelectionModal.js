import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import ModalContainer from '../modal/ModalContainer';
import Modal from '../modal/Modal';
import Button from '../generic/Button';

// Actions
import ModalActions from '../../actions/ModalActions';

// Constants
import ModalConstants from '../../constants/ModalConstants';

// CSS
import '../../../css/components/ProductFabricSwatches.scss';

function mapStateToProps(state) {
  return {
    productDefaultColors: state.$$productState.get('productDefaultColors').toJS(),
    productSecondaryColors: state.$$productState.get('productSecondaryColors').toJS(),
    productSecondaryColorCentsPrice: state.$$productState.get('productSecondaryColorCentsPrice'),
  };
}

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

  generateColorSwatch(color, price = 0) {
    return (
      <div className="col-4">
        <div
          className="ProductFabricSwatches-swatch-wrapper height--full"
          style={{ background: color.hexValue }}
        >
          <div className="ProductFabricSwatches-swatch">
            <span>{color.name}</span>
            <span>{price}</span>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {
      productDefaultColors,
      productSecondaryColors,
      productSecondaryColorCentsPrice,
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
          modalContentClassName="width--full"
          modalWrapperClassName="u-flex--col"
        >
          <div className="ProductFabricModal height--full u-overflow-y--scroll textAlign--center">
            <div className="Modal__content--med-margin-bottom">
              <div className="grid-12">
                { productDefaultColors.map(c => this.generateColorSwatch(c, 0))}
                { productSecondaryColors.map(c =>
                  this.generateColorSwatch(c, productSecondaryColorCentsPrice))
                }
              </div>
            </div>
          </div>
        </Modal>
        <div className="ButtonGroup">
          <Button secondary text="Cancel" />
          <Button text="Save" />
        </div>
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
  // Redux Actions
  activateModal: PropTypes.func.isRequired,
};

ProductFabricModal.defaultProps = {
  // Redux
  activeModalId: null,
};


export default connect(mapStateToProps, mapDispatchToProps)(ProductFabricModal);
