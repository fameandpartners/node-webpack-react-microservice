
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
import * as ModalActions from '../../actions/ModalActions';
import * as AppActions from '../../actions/AppActions';

// Constants
import ModalConstants from '../../constants/ModalConstants';

// Polyfills
import win from '../../polyfills/windowPolyfill';

// CSS
import '../../../css/components/ImageLightboxModal.scss';

function stateToProps(state) {
  const productDefaultFabrics = state.$$productState.get('productDefaultFabrics');
  const productSecondaryFabrics = state.$$productState.get('productSecondaryFabrics');
  return {
    hasFabrics: !productDefaultFabrics.isEmpty() || !productSecondaryFabrics.isEmpty(),
    selectedColorId: state.$$customizationState.get('selectedColor').get('id'),
    $$productImages: state.$$productState.get('productImages'),
    gallerySlideActiveIndex: state.$$appState.get('gallerySlideActiveIndex'),
  };
}

function dispatchToProps(dispatch) {
  const modalActions = bindActionCreators(ModalActions, dispatch);
  const appActions = bindActionCreators(AppActions, dispatch);
  return {
    activateModal: modalActions.activateModal,
    setGallerySlideActiveIndex: appActions.setGallerySlideActiveIndex,
  };
}

class ImageLightboxModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isZoomActive: false,
      topPercent: null,
      leftPercent: null,
      activeZoomIndex: null,
    };
    autobind(this);
  }

  handleCloseModal() {
    this.props.activateModal({ shouldAppear: false });
  }

  setZoomStyle(e) {
    const scrollOffset = win.document.body.getBoundingClientRect().top;
    const leftPercent = ((e.pageX) / win.innerWidth) * 100;
    const topPercent = ((e.pageY + scrollOffset) / win.innerHeight) * 100;

    this.setState({
      topPercent: `${topPercent.toString()}%`,
      leftPercent: `${leftPercent.toString()}%`,
    });
  }

  doesImageHaveColorIdMatch({ img, id, colorMatch, firstColorId }) {
    const { hasFabrics } = this.props;
    if (colorMatch) {
      return hasFabrics
        ? img.fabricId === id
        : img.colorId === id;
    }
    return hasFabrics
        ? img.fabricId === firstColorId
        : img.colorId === firstColorId;
  }

  getProductImages() {
    const { selectedColorId: id, hasFabrics, $$productImages } = this.props;
    let productImages = $$productImages.toJS();
    const colorMatch = hasFabrics
      ? find(productImages, { fabricId: id })
      : find(productImages, { colorId: id });
    const firstColorId = productImages[0].fabricId || productImages[0].colorId;
    productImages = productImages
      .filter(img => (this.doesImageHaveColorIdMatch({ img, id, colorMatch, firstColorId })))
      .map(img => img);

    return productImages;
  }

  handlePrev() {
    const { gallerySlideActiveIndex, setGallerySlideActiveIndex } = this.props;
    this.setState({ isZoomActive: false });
    if (gallerySlideActiveIndex - 1 < 0) {
      const imageCount = this.getProductImages().length;
      setGallerySlideActiveIndex({ index: imageCount - 1 });
    } else {
      setGallerySlideActiveIndex({ index: gallerySlideActiveIndex - 1 });
    }
  }

  handleNext() {
    const { gallerySlideActiveIndex, setGallerySlideActiveIndex } = this.props;
    const imageCount = this.getProductImages().length;
    this.setState({ isZoomActive: false });
    if (gallerySlideActiveIndex + 1 > imageCount - 1) {
      setGallerySlideActiveIndex({ index: 0 });
    } else {
      setGallerySlideActiveIndex({ index: gallerySlideActiveIndex + 1 });
    }
  }

  handleImageMouseover(e) {
    if (this.state.isZoomActive) {
      this.setZoomStyle(e);
    }
  }

  handleImageClick(e, index) {
    const { breakpoint } = this.props;
    const { isZoomActive } = this.state;

    if (isZoomActive) { // TURN OFF ZOOM
      this.setState({ isZoomActive: !isZoomActive });
    } else if (breakpoint !== 'mobile') { // TURN ON ZOOM
      this.setState({
        activeZoomIndex: index,
        isZoomActive: !isZoomActive,
      });
      this.setZoomStyle(e);
    }
  }

  swapProductImageIndex(loryEventData) {
    const toSlide = loryEventData.detail.nextSlide;
    const adjustedRemainder = toSlide % this.getProductImages().length;

    this.props.setGallerySlideActiveIndex({ index: adjustedRemainder });
  }

  render() {
    const {
      gallerySlideActiveIndex,
      winWidth,
      winHeight,
    } = this.props;

    const {
      activeZoomIndex,
      isZoomActive,
      topPercent,
      leftPercent,
    } = this.state;
    const sliderImages = this.getProductImages();
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
          modalClassName="u-height--full typography"
          modalContentClassName="u-height--full"
          handleCloseModal={this.handleCloseModal}
          onMouseMove={this.handleImageMouseover}
        >
          <p className="ImageLightboxModal__pagination h4 u-mb--normal u-user-select--none">
            {gallerySlideActiveIndex + 1} of {sliderImages.length}
          </p>
          <Slider
            activeIndex={gallerySlideActiveIndex}
            sliderHeight="100%"
            winWidth={winWidth}
            winHeight={winHeight}
            showButtons
            handlePrev={this.handlePrev}
            handleNext={this.handleNext}
            handleBeforeSlide={this.swapProductImageIndex}
          >
            { sliderImages.map((img, index) => (
              <Slide
                fullSlide
                key={img.id}
              >
                <img
                  alt={`Product Dress ${index + 1}`}
                  src={img.bigImg}
                  style={{
                    transformOrigin: zoomStyle,
                  }}
                  onClick={e => this.handleImageClick(e, index)}
                  className={classnames(
                    'ImageLightboxModal__image u-height--full',
                    { 'ImageLightboxModal__image--activeZoom': activeZoomIndex === index && isZoomActive },
                  )}
                  ref={ref => this.imageRefs[index] = ref}
                />
              </Slide>
            ))}
          </Slider>
        </Modal>
      </ModalContainer>
    );
  }
}

ImageLightboxModal.propTypes = {
  // Decorator Props
  breakpoint: PropTypes.string.isRequired,
  winHeight: PropTypes.number,
  winWidth: PropTypes.number,
  // Redux Props
  $$productImages: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
    id: PropTypes.number,
    colorId: PropTypes.number,
    smallImg: PropTypes.string,
    bigImg: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    position: PropTypes.number,
  })).isRequired,
  hasFabrics: PropTypes.bool.isRequired,
  selectedColorId: PropTypes.number,
  gallerySlideActiveIndex: PropTypes.number,
  // Redux Actions
  activateModal: PropTypes.func.isRequired,
  setGallerySlideActiveIndex: PropTypes.func.isRequired,
};

ImageLightboxModal.defaultProps = {
  winHeight: 640,
  winWidth: 320,
  selectedColorId: '',
  gallerySlideActiveIndex: 0,
};

export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(ImageLightboxModal));
