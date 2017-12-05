/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Decorators
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

// UI Components
import Slider from '../shared/Slider';
import Slide from '../shared/Slide';
// import ProductFabric from './ProductFabric';


// Constants
// import ModalConstants from '../../constants/ModalConstants';

// Actions
import * as ModalActions from '../../actions/ModalActions';

// CSS
import '../../../css/components/ProductDisplayOptionsTouch.scss';


function stateToProps(state) {
  console.log('lie', state.$$flashSaleState.get('$$lineItem'));
  // Which part of the Redux global state does our component want to receive as props?
  return {
    productImages: state.$$flashSaleState.get('$$lineItem').get('images').toJS(),
  };
}

function dispatchToProps(dispatch) {
  const { activateModal } = bindActionCreators(ModalActions, dispatch);
  return { activateModal };
}

class FlashProductImageSlider extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }


  handleOpenModalClick(modalId) {
    return () => { this.props.activateModal({ modalId }); };
  }

  calculateSliderHeight() {
    const { breakpoint, winHeight } = this.props;
    const MOBILE_HEIGHT_ELEMS = 355; // 56 BUTTON + 185 PRODUCT OPTIONS + 60 HEADER + 45 LOCALE
    const TABLET_HEIGHT_ELEMS = 355; // 56 BUTTON + 185 PRODUCT OPTIONS + 60 HEADER + 45 LOCALE
    const MAX_HEIGHT = 740;
    const MIN_HEIGHT = 350;
    let sliderHeight = MIN_HEIGHT;

    if (breakpoint === 'tablet') {
      sliderHeight = winHeight - TABLET_HEIGHT_ELEMS;
    }

    if (breakpoint === 'mobile') {
      sliderHeight = winHeight - MOBILE_HEIGHT_ELEMS;
    }

    if (sliderHeight > MAX_HEIGHT) {
      return `${MAX_HEIGHT}px`;
    } else if (sliderHeight < MIN_HEIGHT) {
      return `${MIN_HEIGHT}px`;
    }

    return `${sliderHeight}px`;
  }

  getSliderImages() {
    const { productImages } = this.props;
    return productImages.map(img => img);
  }

  render() {
    const {
      // breakpoint,
      // fabric,
      // garmentCareInformation,
      winHeight,
      winWidth,
    } = this.props;
    const sliderImages = this.getSliderImages();
    return (
      <div className="ProductImageSlider">
        <Slider
          nudgeOnMount
          sliderHeight={this.calculateSliderHeight()}
          winWidth={winWidth}
          winHeight={winHeight}
        >
          { sliderImages.map((img, i) => (
            /* eslint-disable react/no-array-index-key */
            <Slide key={i}>
              <img
                alt="Something"
                src={img}
                className="u-height--full"
              />
            </Slide>
            ))}
          {
          // LEAVE FOR PRODUCT FABRIC
          //   <Slide style={{ width: '90%' }}>
          //   <ProductFabric
          //     breakpoint={breakpoint}
          //     fabric={fabric}
          //     garmentCareInformation={garmentCareInformation}
          //     handleFabricInfoModalClick={this.handleOpenModalClick(ModalConstants.FABRIC_MODAL)}
          //   />
          // </Slide>
          }
        </Slider>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
FlashProductImageSlider.propTypes = {
  productImages: PropTypes.array.isRequired,
  // Redux Actions
  activateModal: PropTypes.func.isRequired,
  // Decorator props
  breakpoint: PropTypes.string.isRequired,
  winHeight: PropTypes.number.isRequired,
  winWidth: PropTypes.number.isRequired,
};
FlashProductImageSlider.defaultProps = {
  garmentCareInformation: 'Professional dry-clean only.\rSee label for further details.',
  selectedStyleCustomizations: [],
  winHeight: 640,
  winWidth: 320,
  selectedColorId: '',
};

export default
Resize(
  PDPBreakpoints,
)(connect(
  stateToProps, dispatchToProps,
)(FlashProductImageSlider));
