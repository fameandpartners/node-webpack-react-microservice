/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import autobind from 'react-autobind';

// Components
import ModalContainer from '../modal/ModalContainer';
import Modal from '../modal/Modal';
import Slider from '../shared/Slider';
import Slide from '../shared/Slide';

// Actions
import ModalActions from '../../actions/ModalActions';

// Constants
import ModalConstants from '../../constants/ModalConstants';

// CSS
import '../../../css/components/ZoomModal.scss';

function stateToProps(state) {
  return {
    colorId: state.$$customizationState.get('selectedColor').get('id'),
    $$productImages: state.$$productState.get('productImages'),
  };
}

function dispatchToProps(dispatch) {
  const actions = bindActionCreators(ModalActions, dispatch);
  return { activateModal: actions.activateModal };
}

class ZoomModal extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  handleCloseModal() {
    this.props.activateModal({ shouldAppear: false });
  }

  componentDidMount() {
    this.props.activateModal({
      modalId: ModalConstants.ZOOM_MODAL,
      shouldAppear: true,
    });
  }

  render() {
    const { winWidth, winHeight } = this.props;
    const productImages = [
      'http://www.themodelexperience.co.uk/img/experiences/doggy-style/dog3.jpg',
      'http://fimg4.pann.com/new/download.jsp?FileID=37262551',
      'http://4.bp.blogspot.com/-lM7gs_s56J8/UhSuLHwuAGI/AAAAAAAAAEQ/Kaata_rjxIg/s1600/Lexi.jpg',
      // 'http://placehold.it/890x960?text=mom',
      // 'http://placehold.it/890x960?text=dog',
    ];
    return (
      <ModalContainer
        modalContainerClass="grid-middle"
        modalIds={[ModalConstants.ZOOM_MODAL]}
        fullWidth
      >
        <Modal
          handleCloseModal={this.handleCloseModal}
        >
          <Slider winWidth={winWidth} winHeight={winHeight}>
            { productImages.map(img => (
              <Slide
                addPadding
                key={img}
              >
                <img
                  alt="Something"
                  src={img}
                  width="100%"
                  className="u-height--full"
                />
              </Slide>
            ))}
          </Slider>
        </Modal>
      </ModalContainer>
    );
  }
}

ZoomModal.propTypes = {
  // Redux Actions
  activateModal: PropTypes.func.isRequired,
  winHeight: PropTypes.number,
  winWidth: PropTypes.number,
};

ZoomModal.defaultProps = {
  winHeight: 640,
  winWidth: '100%',
};

export default connect(stateToProps, dispatchToProps)(ZoomModal);
