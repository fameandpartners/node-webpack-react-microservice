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

class ProductFabricModal extends PureComponent {
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
        modalIds={[ModalConstants.FABRIC_MODAL]}
      >
        <Modal
          handleCloseModal={this.handleCloseModal}
        >
          <div className="ProductFabricModal textAlign--center">
            <div className="Modal__content--med-margin-bottom">
              <h4>Fabric</h4>
              {fabric.description.split('\n').map(
                (item, key) =>
                  <span key={`fd-${key}`}>{item}<br /></span>,
                )
              }
            </div>
            <div />
            <h4>Garment Care</h4>
            {garmentCareInformation.split('\n').map(
                (item, key) =>
                  <span key={`gc-${key}`}>{item}<br /></span>,
                )
            }

          </div>
        </Modal>

      </ModalContainer>
    );
  }
}

ProductFabricModal.propTypes = {
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

ProductFabricModal.defaultProps = {
  // Redux
  activeModalId: null,
};


export default connect(mapStateToProps, mapDispatchToProps)(ProductFabricModal);
// <span dangerouslySetInnerHTML={{ __html: fabric.description }} />
