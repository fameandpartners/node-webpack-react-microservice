/* eslint-disable */
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
    this.state = {
      zoomStatus: false,
      topPercent: null,
      leftPercent: null,
      activeIndex: null,
      imageDimensions: null,
    }
    autobind(this);
  }

  handleCloseModal() {
    this.props.activateModal({ shouldAppear: false });
  }

  getDimensions(refName) {
    console.log("refName", refName)
    console.log(this.imageRefs)
    const rect = this.imageRefs[refName].getBoundingClientRect();
    const { left, top, width, height } = rect;
    this.setState({
      imageDimensions: {
        left,
        top,
        width,
        height,
      },
    });
  }
  getCoords(e) {
    const { imageDimensions } = this.state;
    const { left, top, width, height } = imageDimensions;
    const leftPercent = ((e.pageX - left) / width) * 100
    const topPercent = ((e.pageY - (top - 100)) / height) * 100;
    console.log(`${topPercent.toString()}%`, `${leftPercent.toString()}%`);
    this.setState({
      topPercent: `${topPercent.toString()}%`,
      leftPercent: `${leftPercent.toString()}%`,
    });
  }
  getProductImages() {
    const { selectedColorId, $$productImages } = this.props;
    const productImages = $$productImages.toJS();
    const colorMatch = find(productImages, { colorId: selectedColorId });
    const firstColorId = productImages[0].colorId;
    return productImages
      .filter(img => (colorMatch ? img.colorId === selectedColorId : img.colorId === firstColorId))
      .map(img => (
          img
      ));
  }
  componentDidMount() {
    this.props.activateModal({
      modalId: ModalConstants.ZOOM_MODAL,
      shouldAppear: true,
    });
  };

  render() {
    const { winWidth, winHeight } = this.props;
    const sliderImages = this.getProductImages()
    const { zoomStatus, topPercent, leftPercent, activeIndex } = this.state;
    const zoomStyle = `${leftPercent} ${topPercent}`;
    this.imageRefs = [];
    return (
      <ModalContainer
        modalContainerClass="grid-middle"
        modalIds={[ModalConstants.ZOOM_MODAL]}
        fullWidth
      >
        <Modal
          handleCloseModal={this.handleCloseModal}
        >
          <Slider winWidth={winWidth} winHeight={winHeight} showButtons>
            { sliderImages.map((img, index) => (
              <Slide
                key={img.id}
              >
                <img
                  alt="Something"
                  src={img.bigImg}
                  className="u-height--full ZoomModal__image"
                  style={{
                    transformOrigin: zoomStyle,
                  }}
                  onClick={() => this.setState({
                    activeIndex: index,
                    zoomStatus: !zoomStatus
                  })}
                  className={activeIndex === index && zoomStatus  ? 'zoomIn u-height--full ZoomModal__image' : 'noZoom u-height--full ZoomModal__image'}
                  ref={ref => this.imageRefs[`${img}-${index}`] = ref}
                  onMouseMove={this.getCoords}
                  onMouseOver={() => this.getDimensions(`${img}-${index}`)}
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
  winWidth: 320,
};

export default connect(stateToProps, dispatchToProps)(ZoomModal);
