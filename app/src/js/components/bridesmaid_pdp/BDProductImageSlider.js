/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Decorators
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

// Utilities
import { addonSelectionDisplayText } from '../../utilities/pdp';

// UI Components
import Slider from '../shared/Slider';
import Slide from '../shared/Slide';
// import ProductFabric from './ProductFabric';

// Utilities
import { generateCustomizationImage } from '../../utilities/bridesmaids';

// Constants
import { colorNames } from '../../constants/BDCustomizationConstants';

// Actions
import * as ModalActions from '../../actions/ModalActions';

// CSS
import '../../../css/components/ProductDisplayOptionsTouch.scss';


function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    addonOptions: state.$$customizationState.get('addons').get('addonOptions').toJS(),
    fabric: state.$$productState.get('fabric').toJS(),
    garmentCareInformation: state.$$productState.get('garmentCareInformation'),
    sku: state.$$productState.get('sku'),
    selectedColor: state.$$customizationState.get('selectedColor').toJS(),
    selectedColorId: state.$$customizationState.get('selectedColor').get('id'),
    selectedCustomizationDetails: state.$$bdCustomizationState.get('selectedCustomizationDetails').toJS(),
    selectedBDCustomizationLength: state.$$bdCustomizationState.get('selectedBDCustomizationLength'),
    selectedBDCustomizationColor: state.$$bdCustomizationState.get('selectedBDCustomizationColor'),
  };
}

function dispatchToProps(dispatch) {
  const { activateModal } = bindActionCreators(ModalActions, dispatch);
  return { activateModal };
}

class BDProductImageSlider extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  retrieveSelectedAddonOptions() {
    const { addonOptions, selectedCustomizationDetails } = this.props;
    return addonOptions.filter(a => selectedCustomizationDetails.indexOf(a.id) > -1);
  }

  generateBackgroundImageStyle(url) {
    return {
      background: `url(${url})`,
      backgroundSize: 'cover',
    };
  }

  generateAddonButtonText(selectedAddonOptions) {
    if (selectedAddonOptions && selectedAddonOptions.length) {
      return addonSelectionDisplayText({ selectedAddonOptions });
    }
    return '-';
  }

  handleOpenModalClick(modalId) {
    return () => { this.props.activateModal({ modalId }); };
  }

  calculateSliderHeight() {
    const { breakpoint, winHeight } = this.props;
    const MOBILE_HEIGHT_ELEMS = 315; // 56 BUTTON + 185 PRODUCT OPTIONS + 60 HEADER + 45 LOCALE
    const TABLET_HEIGHT_ELEMS = 315; // 56 BUTTON + 185 PRODUCT OPTIONS + 60 HEADER + 45 LOCALE
    const MAX_HEIGHT = 740;
    const MIN_HEIGHT = 330;
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

  generateImageNameForSelections({ side }) {
    const {
      selectedCustomizationDetails,
      selectedBDCustomizationLength,
      selectedBDCustomizationColor,
      sku,
    } = this.props;
    const imageStr = generateCustomizationImage({
      colorCode: colorNames[selectedBDCustomizationColor],
      customizationIds: selectedCustomizationDetails,
      imgSizeStr: '800x800',
      length: selectedBDCustomizationLength,
      side,
      sku: sku.toLowerCase(),
    });
    return imageStr;
  }

  getSliderImages() {
    const frontAndBackImages = [
      this.generateImageNameForSelections({ side: 'front' }),
      this.generateImageNameForSelections({ side: 'back' }),
    ].map(img => ({
      id: img,
      bigImg: img,
    }));

    return frontAndBackImages;
  }

  render() {
    const {
      // breakpoint,
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
          { sliderImages.map(img => (
            <Slide key={img.id}>
              <img
                alt="Something"
                src={img.bigImg}
                className="u-height--full"
              />
            </Slide>
            ))}
        </Slider>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
BDProductImageSlider.propTypes = {
  // Redux Properties
  addonOptions: PropTypes.array.isRequired,
  selectedBDCustomizationLength: PropTypes.string.isRequired,
  selectedBDCustomizationColor: PropTypes.func.isRequired,
  sku: PropTypes.string.isRequired,
  // garmentCareInformation: PropTypes.string,
  selectedCustomizationDetails: PropTypes.arrayOf(PropTypes.number),
  // Redux Actions
  activateModal: PropTypes.func.isRequired,
  // Decorator props
  breakpoint: PropTypes.string.isRequired,
  winHeight: PropTypes.number.isRequired,
  winWidth: PropTypes.number.isRequired,
};
BDProductImageSlider.defaultProps = {
  garmentCareInformation: 'Professional dry-clean only.\rSee label for further details.',
  selectedCustomizationDetails: [],
  winHeight: 640,
  winWidth: 320,
  selectedColorId: '',
};

export default
Resize(
  PDPBreakpoints,
)(connect(
  stateToProps, dispatchToProps,
)(BDProductImageSlider));
