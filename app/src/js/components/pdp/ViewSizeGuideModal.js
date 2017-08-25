import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import ModalContainer from '../modal/ModalContainer';
import Modal from '../modal/Modal';
import ProductFabricInfo from './ProductFabricInfo';

// Actions
import ModalActions from '../../actions/ModalActions';

// Constants
import ModalConstants from '../../constants/ModalConstants';

function mapStateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    activeModalId: state.$$modalState.get('modalId'),
    fabric: state.$$productState.get('fabric').toJS(),
    garmentCareInformation: state.$$productState.get('garmentCareInformation'),
  };
}

function mapDispatchToProps(dispatch) {
  const { activateModal } = bindActionCreators(ModalActions, dispatch);
  return { activateModal };
}

class ViewSizeGuideModal extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleCloseModal() {
    this.props.activateModal({ shouldAppear: false });
  }

  render() {
    const {
      fabric,
      garmentCareInformation,
    } = this.props;

    return (
      <ModalContainer
        slideLeft
        dimBackground={false}
        modalIds={[ModalConstants.VIEW_SIZE_GUIDE_MODAL]}
      >
        <Modal
          handleCloseModal={this.handleCloseModal}
          modalClassName="grid-middle u-flex--1"
          modalContentClassName="width--full"
          modalWrapperClassName="u-flex--col"
        >
          <div className="ViewSizeGuideModal textAlign--center grid-middle">
            <div className="Modal__content--med-margin-bottom">
              <h1 style={{ fontSize: '3em' }}>I'm the View Size Guide Modal</h1>
              <br />
              <ProductFabricInfo
                fabric={fabric}
                garmentCareInformation={garmentCareInformation}
              />
            </div>
          </div>
        </Modal>
      </ModalContainer>
    );
  }
}

ViewSizeGuideModal.propTypes = {
  // Redux Properties
  fabric: PropTypes.shape({
    id: PropTypes.string,
    smallImg: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  garmentCareInformation: PropTypes.string.isRequired,
  // Redux Actions
  activateModal: PropTypes.func.isRequired,
};

ViewSizeGuideModal.defaultProps = {
  // Redux
  activeModalId: null,
};


export default connect(mapStateToProps, mapDispatchToProps)(ViewSizeGuideModal);
