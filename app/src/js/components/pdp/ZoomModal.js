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

  componentDidMount() {
    this.props.activateModal({
      modalId: ModalConstants.ZOOM_MODAL,
      shouldAppear: true,
    });
  }

  render() {
    const { winWidth, winHeight, $$productImages } = this.props;
    const imageArray  = $$productImages._tail.array.map(p => p._root.entries[3][1])
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
            { imageArray.map((img, index) => (
              <Slide
                addPadding
                key={img}
              >
                <img
                  alt="Something"
                  src={img}
                  width="100%"
                  className="u-height--full"
                  style={{
                    transformOrigin: zoomStyle,
                  }}
                  onClick={() => this.setState({
                    activeIndex: index,
                    zoomStatus: !zoomStatus
                  })}
                  className={activeIndex === index && zoomStatus  ? 'zoomIn' : 'noZoom'}
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
