import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';
import { isDarkLuminance } from '../../utilities/color';

// UI Components
import Slider from '../shared/Slider';
import Slide from '../shared/Slide';
import ProductFabric from './ProductFabric';

// // TEST IMAGES
// import image1 from '../../../img/test/image_1.png';
import image1 from '../../../img/test/image_1.png';
import image2 from '../../../img/test/image_2.png';
import image3 from '../../../img/test/image_3.png';
import image4 from '../../../img/test/image_4.png';
import image5 from '../../../img/test/image_5.png';
import image6 from '../../../img/test/image_6.png';
import image7 from '../../../img/test/image_7.png';


// Constants
import ModalConstants from '../../constants/ModalConstants';

// Actions
import * as ModalActions from '../../actions/ModalActions';

// CSS
import '../../../css/components/ProductDisplayOptionsTouch.scss';


function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    fabric: state.$$productState.get('fabric').toJS(),
    garmentCareInformation: state.$$productState.get('garmentCareInformation'),
    selectedColor: state.$$customizationState.get('selectedColor').toJS(),
  };
}

function dispatchToProps(dispatch) {
  const { activateModal } = bindActionCreators(ModalActions, dispatch);
  return { activateModal };
}

class ProductDisplayOptionsTouch extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  generateBackgroundImageStyle(url) {
    // TODO: @elgrecode
    // Tentatively leaving this here until I have a better idea what to do with slides
    return {
      background: `url(${url})`,
      backgroundSize: 'cover',
    };
  }

  handleFabricInfoModalClick() {
    this.props.activateModal({ modalId: ModalConstants.FABRIC_MODAL });
  }

  handleColorOptionClick() {
    this.props.activateModal({ modalId: ModalConstants.COLOR_SELECTION_MODAL });
  }

  handleStyleOptionClick() {
    this.props.activateModal({ modalId: ModalConstants.STYLE_SELECTION_MODAL });
  }

  render() {
    const {
      breakpoint,
      fabric,
      garmentCareInformation,
      selectedColor,
    } = this.props;

    return (
      <div className="ProductDisplayOptionsTouch">
        <Slider>
          <Slide>
            <div
              className="u-width--full height--full"
              style={this.generateBackgroundImageStyle(image1)}
            />
          </Slide>
          <Slide>
            <ProductFabric
              breakpoint={breakpoint}
              fabric={fabric}
              garmentCareInformation={garmentCareInformation}
              handleFabricInfoModalClick={this.handleFabricInfoModalClick}
            />
          </Slide>
          <Slide>
            <div
              className="u-width--full height--full"
              style={this.generateBackgroundImageStyle(image2)}
            />
          </Slide>


          <Slide>
            <div
              className="u-width--full height--full"
              style={this.generateBackgroundImageStyle(image3)}
            />
          </Slide>
          <Slide>
            <div
              className="u-width--full height--full"
              style={this.generateBackgroundImageStyle(image4)}
            />
          </Slide>
          <Slide>
            <div
              className="u-width--full height--full"
              style={this.generateBackgroundImageStyle(image5)}
            />
          </Slide>
          <Slide>
            <div
              className="u-width--full height--full"
              style={this.generateBackgroundImageStyle(image6)}
            />
          </Slide>
          <Slide>
            <div
              className="u-width--full height--full"
              style={this.generateBackgroundImageStyle(image7)}
            />
          </Slide>

        </Slider>
        <div className="ProductDisplayOptionsTouch__options u-mb-normal u-mt-normal">
          <div
            onClick={this.handleColorOptionClick}
            className={classnames(
              'ProductDisplayOptionsTouch__option display--inline-block u-cursor--pointer',
              { 'ProductDisplayOptionsTouch__option--dark': isDarkLuminance(selectedColor.hexValue) },
            )}
            style={{ background: selectedColor.hexValue }}
          >
            <span>Color</span><br />
            <span>{selectedColor.presentation}</span>
          </div>
          <div
            onClick={this.handleStyleOptionClick}
            className="ProductDisplayOptionsTouch__option display--inline-block"
          >
            <span>Style Addons</span><br />
            <span>-</span>
          </div>
        </div>
      </div>
    );
  }
}

ProductDisplayOptionsTouch.propTypes = {
  // Redux Properties
  fabric: PropTypes.shape({
    id: PropTypes.string,
    smallImg: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  garmentCareInformation: PropTypes.string,
  selectedColor: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    centsTotal: PropTypes.number,
    hexValue: PropTypes.string,
  }).isRequired,
  // Redux Actions
  activateModal: PropTypes.func.isRequired,
  // Decorator props
  breakpoint: PropTypes.string.isRequired,
};
ProductDisplayOptionsTouch.defaultProps = {
  garmentCareInformation: 'Professional dry-clean only.\rSee label for further details.',
};

export default
Resize(
  PDPBreakpoints,
)(connect(
  stateToProps, dispatchToProps,
)(ProductDisplayOptionsTouch));
