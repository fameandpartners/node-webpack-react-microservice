
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
// import * as AppActions from '../../actions/AppActions';

import {
  generateCustomizationImage,
} from '../../utilities/bridesmaids';

// Constants
import BDCustomizationConstants from '../../constants/BDCustomizationConstants';
import ModalConstants from '../../constants/ModalConstants';

// Polyfills
import win from '../../polyfills/windowPolyfill';

// CSS
import '../../../css/components/ImageLightboxModal.scss';

function stateToProps(state) {
  return {
    sku: state.$$productState.get('sku'),
    selectedCustomizationDetails: state.$$bdCustomizationState.get('selectedCustomizationDetails').toJS(),
    selectedBDCustomizationColor: state.$$bdCustomizationState.get('selectedBDCustomizationColor'),
    selectedBDCustomizationLength: state.$$bdCustomizationState.get('selectedBDCustomizationLength'),
  };
}

function dispatchToProps(dispatch) {
  const modalActions = bindActionCreators(ModalActions, dispatch);
  return {
    activateModal: modalActions.activateModal,
  };
}

let gallerySlideActiveIndex = 0;

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

  generateImageNameForSelections(side) {
    const {
      selectedCustomizationDetails,
      selectedBDCustomizationColor,
      selectedBDCustomizationLength,
      sku,
    } = this.props;

    const { colorNames } = BDCustomizationConstants;
    const imageStr = generateCustomizationImage({
      sku: sku.toLowerCase(),
      customizationIds: selectedCustomizationDetails,
      imgSizeStr: '800x800',
      side,
      length: selectedBDCustomizationLength.replace('-', '_'),
      colorCode: colorNames[selectedBDCustomizationColor],
    });
    return imageStr;
  }

  handleCloseModal() {
    gallerySlideActiveIndex = 0;
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

  getProductImages() {
    return [
      this.generateImageNameForSelections('front'),
      this.generateImageNameForSelections('back'),
    ];
  }

  handlePrev() {
    this.setState({ isZoomActive: false });
    if (gallerySlideActiveIndex - 1 < 0) {
      const imageCount = this.getProductImages().length;
      gallerySlideActiveIndex = imageCount - 1;
    } else {
      gallerySlideActiveIndex -= 1;
    }
  }

  handleNext() {
    const imageCount = this.getProductImages().length;
    this.setState({ isZoomActive: false });
    if (gallerySlideActiveIndex + 1 > imageCount - 1) {
      gallerySlideActiveIndex = 0;
    } else {
      gallerySlideActiveIndex += 1;
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
    gallerySlideActiveIndex = adjustedRemainder;
  }

  render() {
    const {
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
                key={index}
              >
                <img
                  alt={`Product Dress ${index + 1}`}
                  src={img}
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
  sku: PropTypes.string.isRequired,
  // Redux Actions
  activateModal: PropTypes.func.isRequired,
  selectedCustomizationDetails: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedBDCustomizationColor: PropTypes.string.isRequired,
  selectedBDCustomizationLength: PropTypes.string.isRequired,
};

ImageLightboxModal.defaultProps = {
  winHeight: 640,
  winWidth: 320,
};

export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(ImageLightboxModal));
