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
import '../../../css/flash-sale-overrides.scss';

function stateToProps({ $$flashSaleState }) {
  return {
    lineItem: $$flashSaleState.get('$$lineItem').toJS(),
  };
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
    const { lineItem } = this.props;
    return (
      <div className="FlashProductOptions grid-12-noGutter">
        <div className="FlashProductOptions__primary-image-container brick col-6">
          <div
            className="FlashProductOptions__primary-image-wrapper u-cursor--pointer"
            style={{ backgroundImage: `url(${lineItem.images[0]})` }}
          />
        </div>
        <div className="FlashProductOptions__col grid-middle col-6 u-center">
          <div className="FlashProductOptions__ctas grid-1 u-mb-small">
            <div className="col-12">
              <FlashProductDescription
                lineItem={lineItem}
              />
            </div>
            <div className="col-12 u-mt-huge">
              <FlashAddToCartButton
                showTotal={false}
                shouldActivateCartDrawer
              />
              <p className="u-mt-normal">
                All sample sale items are final sale. Offer valid for shipments to US only.
              </p>
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
  // eslint-disable-next-line
  lineItem: PropTypes.object.isRequired,
  expressMakingSelected: PropTypes.bool,

};

FlashProductOptions.defaultProps = {
  addonOptions: [],
  colorCentsTotal: 0,
  selectedDressSize: null,
  selectedHeightValue: null,
  activateModal: noop,
  deliveryCopy: '',
  lineItem: null,
  expressMakingSelected: false,

};

export default connect(stateToProps, dispatchToProps)(FlashProductOptions);
