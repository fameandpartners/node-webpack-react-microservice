import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { find } from 'lodash';

// Utilities
import noop from '../../libs/noop';

// UI components
import FlashProductDescription from './FlashProductDescription';
import FlashAddToCartButton from '../flash_sale/FlashAddToCartButton';

// Actions
import * as CustomizationActions from '../../actions/CustomizationActions';
import ModalActions from '../../actions/ModalActions';


// CSS
import '../../../css/components/FlashProductOptions.scss';

function stateToProps() {
  return {};
}


function dispatchToProps(dispatch) {
  const { activateCustomizationDrawer } = bindActionCreators(CustomizationActions, dispatch);
  const actions = bindActionCreators(ModalActions, dispatch);

  return {
    activateCustomizationDrawer,
    activateModal: actions.activateModal,
  };
}

class FlashProductOptions extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  /**
   * Checks for our current color amongst images and returns that image, or default
   * @return {String} imageUrl
   */
  findColorSpecificFirstImageUrl() {
    const { $$productImages, colorId } = this.props;
    const productImages = $$productImages.toJS();
    const hasMatch = find(productImages, { colorId });
    return hasMatch ? hasMatch.bigImg : productImages[0].bigImg;
  }

  generateDeliveryCopy() {
    const { deliveryCopy, expressMakingSelected } = this.props;
    return expressMakingSelected ? '4-6 business days' : deliveryCopy;
  }

  render() {
    return (
      <div className="FlashProductOptions grid-12-noGutter">
        <div className="FlashProductOptions__primary-image-container brick col-6">
          <div
            className="FlashProductOptions__primary-image-wrapper u-cursor--pointer"
            style={{ backgroundImage: 'url(http://via.placeholder.com/350x150)' }}
          />
        </div>
        <div className="FlashProductOptions__col grid-middle col-6 u-center">
          <div className="FlashProductOptions__ctas grid-1 u-mb-small">
            <div className="col-12">
              <FlashProductDescription />
            </div>
            <div className="col-12 u-mt-huge">
              <FlashAddToCartButton
                showTotal={false}
                shouldActivateCartDrawer
              />
              <div className="u-mt-normal">
                All sale items are final sale. Offer only available in US only
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FlashProductOptions.propTypes = {
  //* Redux Properties
  // PRODUCT
  $$productImages: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
    id: PropTypes.number,
    colorId: PropTypes.number,
    smallImg: PropTypes.string,
    bigImg: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    position: PropTypes.number,
  })).isRequired,
  // COLOR
  colorId: PropTypes.number.isRequired,
  deliveryCopy: PropTypes.string,
  expressMakingSelected: PropTypes.bool,

};

FlashProductOptions.defaultProps = {
  addonOptions: [],
  colorCentsTotal: 0,
  selectedDressSize: null,
  selectedHeightValue: null,
  activateModal: noop,
  deliveryCopy: '',
  expressMakingSelected: false,

};

export default connect(stateToProps, dispatchToProps)(FlashProductOptions);
