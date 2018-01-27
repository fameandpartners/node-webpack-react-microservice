import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';


// Constants
import BDCustomizationConstants from '../../constants/BDCustomizationConstants';

// Utilities
import win from '../../polyfills/windowPolyfill';
// import { formatSizePresentationUS } from '../../utilities/helpers';
import { generateCustomizationImage } from '../../utilities/bridesmaids';

// CSS
import '../../../css/components/FlashSaleProductGrid.scss';

class BridesmaidsProductGrid extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  formatPrice(str) {
    const newPrice = str.substring(0, str.length - 2);

    return `$${newPrice}`;
  }

  goToImageHref(dress) {
    return () => {
      const colorName = dress.image_urls[0].color;
      const href = win.encodeURI(`/bridesmaid-dresses/${dress.id}?color=${colorName}`);
      win.location = href;
    };
  }

  generateImage(
    {
      style_number: styleNumber,
      customization_ids: customizationIds,
    },
    side,
  ) {
    const {
      selectedColor,
      selectedLength,
    } = this.props;

    const { colorNames } = BDCustomizationConstants;
    const imageStr = generateCustomizationImage({
      side,
      sku: styleNumber.toLowerCase(),
      customizationIds,
      imgSizeStr: '800x800',
      length: selectedLength.name.replace('-', '_'),
      colorCode: colorNames[selectedColor.presentation],
    });

    return imageStr;
  }

  render() {
    const {
      products,
    } = this.props;

    return (
      <div className="BridesmaidsProductGrid__wrapper grid-12">
        { products.map((dress, index) => (
          <div
            // eslint-disable-next-line
            key={index}
            className="FlashSaleProduct__container col-4_sm-6"
            onClick={this.goToImageHref(dress)}
          >
            <a className="FlashSaleProduct__image-wrapper u-cursor--pointer">
              <img
                className="FlashSaleProduct__image--original"
                alt={dress.product_name}
                src={this.generateImage(dress, 'front')}
              />
              <img
                className="FlashSaleProduct__image--hover"
                alt={dress.name}
                src={this.generateImage(dress, 'back')}
              />
            </a>
            <div className="FlashSaleProduct__info grid-12">
              <div className="col-8">
                <a href={`/bridesmaid-dresses/${dress.id}`}>
                  {dress.product_name}
                </a>
              </div>
              <div className="col-4 FlashSaleProduct__current-price">
                {this.formatPrice(dress.price.amount)}
              </div>
              {/* <div className="col-8 FlashSaleProductLine">
                {dress.color}, {formatSizePresentationUS(dress.size)}, {dress.height}&nbsp;
                {HEIGHT_VALS[dress.height.toLowerCase()]}
              </div>
            */}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
BridesmaidsProductGrid.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    // id: PropTypes.number,
    product_name: PropTypes.string,
    // images: PropTypes.array,
    // original_price: PropTypes.number,
    // current_price: PropTypes.number,
    // size: PropTypes.string,
    // color: PropTypes.string,
    // permalink: PropTypes.string,
  })).isRequired,
  selectedColor: PropTypes.object.isRequired,
  selectedLength: PropTypes.object.isRequired,
};

export default BridesmaidsProductGrid;
