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
      zoomStatus: false,
      topPercent: null,
      leftPercent: null,
      activeIndex: null,
      imageDimensions: null,
    };
    autobind(this);
  }

  handleCloseModal() {
    this.props.activateModal({ shouldAppear: false });
  }

  getDimensions(refName) {
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
    const { breakpoint } = this.props;
    let offSetValue = 0;
    if (breakpoint === 'desktop') {
      offSetValue = 150;
    } else {
      offSetValue = 250;
    }
    const { left, top, width, height } = imageDimensions;
    const leftPercent = ((e.pageX - left) / width) * 100;
    const topPercent = ((e.pageY - (top - offSetValue)) / height) * 100;
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
      .map(img => (
          img
      ));
    return this.orderImagesByIndex(productImages);
  }
  orderImagesByIndex(productImages) {
    const { activeSlide } = this.props;
    return productImages.slice(activeSlide).concat(productImages.slice(0, activeSlide));
  }

  setZoomStatus(index) {
    const { breakpoint } = this.props;
    const { zoomStatus } = this.state;
    if (breakpoint !== 'mobile') {
      this.setState({
        activeIndex: index,
        zoomStatus: !zoomStatus,
      });
    }
  }

  render() {
    const { winWidth, winHeight } = this.props;
    const sliderImages = this.getProductImages();
    const { zoomStatus, topPercent, leftPercent, activeIndex } = this.state;
    const zoomStyle = `${leftPercent} ${topPercent}`;
    this.imageRefs = [];
    return (
      <ModalContainer
        modalContainerClass="grid-middle"
        modalIds={[ModalConstants.ZOOM_MODAL]}
        fullScreen
      >
        <Modal
          handleCloseModal={this.handleCloseModal}
        >
          <Slider winWidth={winWidth} winHeight={winHeight} showButtons>
            { sliderImages.map((img, index) => (
              <Slide
                key={img.id}
              >
                <p className="ZoomModal__pagination">{index + 1}/{sliderImages.length}</p>
                <img
                  alt="Something"
                  src={img.bigImg}
                  style={{
                    transformOrigin: zoomStyle,
                  }}
                  onClick={() => this.setZoomStatus(index)}
                  className={classnames(
                    'ZoomModal__image',
                    { zoomIn: activeIndex === index && zoomStatus },
                  )}
                  ref={ref => this.imageRefs[img.id] = ref}
                  onMouseMove={this.getCoords}
                  onMouseOver={() => this.getDimensions(img.id)}
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
