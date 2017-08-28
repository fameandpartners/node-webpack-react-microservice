/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';

// Decorators
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

// Utilities
import { isDarkLuminance } from '../../utilities/color';
import { addonSelectionDisplayText } from '../../utilities/pdp';

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
    addonOptions: state.$$customizationState.get('addons').get('addonOptions').toJS(),
    fabric: state.$$productState.get('fabric').toJS(),
    garmentCareInformation: state.$$productState.get('garmentCareInformation'),
    selectedColor: state.$$customizationState.get('selectedColor').toJS(),
    selectedStyleCustomizations: state.$$customizationState.get('selectedStyleCustomizations').toJS(),
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

  retrieveSelectedAddonOptions() {
    const { addonOptions, selectedStyleCustomizations } = this.props;
    return addonOptions.filter(a => selectedStyleCustomizations.indexOf(a.id) > -1);
  }

  generateBackgroundImageStyle(url) {
    // TODO: @elgrecode
    // Tentatively leaving this here until I have a better idea what to do with slides
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

  render() {
    const {
      breakpoint,
      fabric,
      garmentCareInformation,
      selectedColor,
    } = this.props;
    const selectedAddonOptions = this.retrieveSelectedAddonOptions();

    return (
      <div className="ProductDisplayOptionsTouch">
        <Slider>
          <Slide>
            <div
              className="u-width--full u-height--full"
              style={this.generateBackgroundImageStyle(image1)}
            />
          </Slide>
          <Slide>
            <ProductFabric
              breakpoint={breakpoint}
              fabric={fabric}
              garmentCareInformation={garmentCareInformation}
              handleFabricInfoModalClick={this.handleOpenModalClick(ModalConstants.FABRIC_MODAL)}
            />
          </Slide>
          <Slide>
            <div
              className="u-width--full u-height--full"
              style={this.generateBackgroundImageStyle(image2)}
            />
          </Slide>


          <Slide>
            <div
              className="u-width--full u-height--full"
              style={this.generateBackgroundImageStyle(image3)}
            />
          </Slide>
          <Slide>
            <div
              className="u-width--full u-height--full"
              style={this.generateBackgroundImageStyle(image4)}
            />
          </Slide>
          <Slide>
            <div
              className="u-width--full u-height--full"
              style={this.generateBackgroundImageStyle(image5)}
            />
          </Slide>
          <Slide>
            <div
              className="u-width--full u-height--full"
              style={this.generateBackgroundImageStyle(image6)}
            />
          </Slide>
          <Slide>
            <div
              className="u-width--full u-height--full"
              style={this.generateBackgroundImageStyle(image7)}
            />
          </Slide>

        </Slider>
        <div className="ProductDisplayOptionsTouch__options u-mb-normal u-mt-normal">
          <div
            onClick={this.handleOpenModalClick(ModalConstants.COLOR_SELECTION_MODAL)}
            className={classnames(
              'ProductDisplayOptionsTouch__option display--inline-block u-cursor--pointer',
              { 'ProductDisplayOptionsTouch__option--dark': isDarkLuminance(selectedColor.hexValue) },
            )}
            style={{ background: selectedColor.hexValue }}
          >
            <div className="grid-middle-noGutter u-height--full">
              <div className="col">
                <span>Color</span><br />
                <span>{selectedColor.presentation}</span>
              </div>
            </div>
          </div>
          <div
            role="button"
            onClick={this.handleOpenModalClick(ModalConstants.STYLE_SELECTION_MODAL)}
            className={classnames(
              'Button Button--tertiary ProductDisplayOptionsTouch__option display--inline-block',
              { 'Button--selected': selectedAddonOptions.length },
            )}
          >
            <div className="grid-middle-noGutter u-height--full">
              <div className="col">
                <span>Style Addons</span><br />
                <span>{this.generateAddonButtonText(selectedAddonOptions)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
ProductDisplayOptionsTouch.propTypes = {
  // Redux Properties
  addonOptions: PropTypes.array.isRequired,
  fabric: PropTypes.shape({
    id: PropTypes.string,
    smallImg: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  garmentCareInformation: PropTypes.string,
  selectedColor: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    centsTotal: PropTypes.number,
    hexValue: PropTypes.string,
  }).isRequired,
  selectedStyleCustomizations: PropTypes.arrayOf(PropTypes.number),
  // Redux Actions
  activateModal: PropTypes.func.isRequired,
  // Decorator props
  breakpoint: PropTypes.string.isRequired,
};
ProductDisplayOptionsTouch.defaultProps = {
  garmentCareInformation: 'Professional dry-clean only.\rSee label for further details.',
  selectedStyleCustomizations: [],
};

export default
Resize(
  PDPBreakpoints,
)(connect(
  stateToProps, dispatchToProps,
)(ProductDisplayOptionsTouch));
