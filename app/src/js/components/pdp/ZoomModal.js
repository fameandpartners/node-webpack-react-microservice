import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { find } from 'lodash';
import autobind from 'react-autobind';
import classnames from 'classnames';

// Components
import ModalContainer from '../modal/ModalContainer';
import Modal from '../modal/Modal';
import Slider from '../shared/Slider';
import Slide from '../shared/Slide';
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

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
    activeSlide: state.$$modalState.get('activeSlideIndex'),
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
      isZoomActive: false,
      topPercent: null,
      leftPercent: null,
      activeZoomIndex: null,
      imageDimensions: null,
    };
    autobind(this);
  }

  handleCloseModal() {
    this.props.activateModal({ shouldAppear: false });
  }

  setDimensions(imgId) {
    const rect = this.imageRefs[imgId].getBoundingClientRect();
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

  setZoomStyle(e) {
    const {
      width,
      height,
    } = this.state.imageDimensions;
    const leftPercent = ((e.pageX) / width) * 100;
    const topPercent = ((e.pageY) / height) * 100;
    this.setState({
      topPercent: `${topPercent.toString()}%`,
      leftPercent: `${leftPercent.toString()}%`,
    });
  }


  getProductImages() {
    const { selectedColorId, $$productImages } = this.props;
    let productImages = $$productImages.toJS();
    const colorMatch = find(productImages, { colorId: selectedColorId });
    const firstColorId = productImages[0].colorId;
    productImages = productImages
      .filter(img => (colorMatch ? img.colorId === selectedColorId : img.colorId === firstColorId))
      .map(img => img);
    return this.orderImagesByIndex(productImages);
  }

  orderImagesByIndex(productImages) {
    const { activeSlide } = this.props;
    return productImages.slice(activeSlide).concat(productImages.slice(0, activeSlide));
  }

  handleImageMouseover(e) {
    const { imageDimensions, isZoomActive } = this.state;
    if (imageDimensions && isZoomActive) {
      this.setZoomStyle(e);
    }
  }

  handleImageClick(e, index, imgId) {
    const { breakpoint } = this.props;
    const { isZoomActive } = this.state;

    if (isZoomActive) { // TURN OFF ZOOM
      this.setState({ isZoomActive: !isZoomActive });
    } else { // TURN ON ZOOM
      this.setDimensions(imgId);
      if (breakpoint !== 'mobile') {
        this.setState({
          activeZoomIndex: index,
          isZoomActive: !isZoomActive,
        });
        this.setZoomStyle(e);
      }
    }
  }

  render() {
    const { winWidth, winHeight } = this.props;
    const sliderImages = this.getProductImages();
    const { isZoomActive, topPercent, leftPercent, activeZoomIndex } = this.state;
    const zoomStyle = `${leftPercent} ${topPercent}`;
    this.imageRefs = [];
    return (
      <ModalContainer
        modalContainerClass="grid-middle"
        modalIds={[ModalConstants.ZOOM_MODAL]}
        fullWidth
        fullScreen
      >
        <Modal
          modalClassName="u-height--full"
          modalContentClassName="u-height--full"
          handleCloseModal={this.handleCloseModal}
          onMouseMove={this.handleImageMouseover}
        >
          {
            // <p className="ZoomModal__pagination u-mb-normal">
            //   {activeZoomIndex + 1} of {sliderImages.length}
            // </p>
          }
          <Slider
            sliderHeight="100%"
            winWidth={winWidth}
            winHeight={winHeight}
            showButtons
          >
            { sliderImages.map((img, index) => (
              <Slide
                key={img.id}
              >
                <img
                  alt={`Product Dress ${index + 1}`}
                  src={img.bigImg}
                  style={{
                    transformOrigin: zoomStyle,
                  }}
                  onClick={e => this.handleImageClick(e, index, img.id)}
                  className={classnames(
                    'ZoomModal__image u-height--full',
                    { 'ZoomModal__image--activeZoom': activeZoomIndex === index && isZoomActive },
                  )}
                  ref={ref => this.imageRefs[img.id] = ref}
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
  breakpoint: PropTypes.string.isRequired,
  winHeight: PropTypes.number,
  winWidth: PropTypes.number,
  $$productImages: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
    id: PropTypes.number,
    colorId: PropTypes.number,
    smallImg: PropTypes.string,
    bigImg: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    position: PropTypes.number,
  })).isRequired,
  selectedColorId: PropTypes.string,
  activeSlide: PropTypes.number,
};

ZoomModal.defaultProps = {
  winHeight: 640,
  winWidth: 320,
  selectedColorId: '',
  activeSlide: 0,
};

export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(ZoomModal));
