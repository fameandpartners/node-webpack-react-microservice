import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';

// Components
import ModalContainer from '../modal/ModalContainer';
import Modal from '../modal/Modal';
import BridesmaidsColorSelect from '../../components/bridesmaids/BridesmaidsColorSelect';
import BridesmaidsSilhouetteSelect from '../../components/bridesmaids/BridesmaidsSilhouetteSelect';
import BridesmaidsLengthSelect from '../../components/bridesmaids/BridesmaidsLengthSelect';
import BridesmaidsTopDetailSelect from '../../components/bridesmaids/BridesmaidsTopDetailSelect';

// Constants
import BDModalConstants from '../../constants/BDModalConstants';

// CSS
import '../../../css/components/ProductFabricSwatches.scss';

class ProductFabricModal extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleCloseModal() {
    this.props.activateModal({ shouldAppear: false });
  }

  handleColorSelection() {
    console.log('handling color selection');
  }

  handleLengthSelection() {
    console.log('handling length selection');
  }

  handleSilhouetteSelection() {
    console.log('handling silhoutte selection');
  }

  handleTopDetailsSelection() {
    console.log('handling top details selection');
  }

  render() {
    return (
      <ModalContainer
        slideUp
        dimBackground={false}
        modalIds={[BDModalConstants.BD_FILTER_MODAL]}
      >
        <Modal
          headline="Filters"
          handleCloseModal={this.handleCloseModal}
          modalClassName="u-flex u-flex--1"
          modalContentClassName="u-width--full"
          modalWrapperClassName="u-flex--col"
        >
          <BridesmaidsColorSelect
            handleSelection={this.handleColorSelection}
          />
          <BridesmaidsSilhouetteSelect
            handleSelection={this.handleSilhouetteSelection}
          />
          <BridesmaidsLengthSelect
            handleSelection={this.handleLengthSelection}
          />
          <BridesmaidsTopDetailSelect
            handleSelection={this.handleTopDetailsSelection}
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


export default ProductFabricModal;
