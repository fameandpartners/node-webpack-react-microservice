/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';

// Constants
import BDCustomizationConstants from '../../constants/BDCustomizationConstants';

// Utilities
import win from '../../polyfills/windowPolyfill';
// import { formatSizePresentationUS } from '../../utilities/helpers';
import { generateCustomizationImage } from '../../utilities/bridesmaids';

// Components
import FadeIn from '../generic/FadeIn';

// CSS
import '../../../css/components/FlashSaleProductGrid.scss';
import '../../../css/components/BridesmaidsProductGrid.scss';

class BridesmaidsProductGrid extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  formatPrice(str) {
    const newPrice = str.substring(0, str.length - 2);

    return `$${newPrice}`;
  }

  generateImageUrl(dressId, colorName, length) {
    return win.encodeURI(`/bridesmaid-dresses/${dressId}?color=${colorName}&length=${length}`);
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
      <div className="BridesmaidsProductGrid__wrapper grid-12 layout-container">
        {
          (products && products.length === 0) ?
            (
              <FadeIn className="u-center">
                <div className="u-mt--huge u-center">
                  <h1 className="BridesmaidsProductGrid__wrapper-heading font-family-secondary">Sorry we're not finding&nbsp;anything</h1>
                  <div className="BridesmaidsProductGrid__wrapper-text">
                    <p>
                      Try using different filters to broaden your results, or browse our&nbsp;
                      <a href="" className="u-text-decoration--underline">Bridesmaids Collection</a>
                    </p>
                  </div>
                </div>
              </FadeIn>
            ) :
            null
        }
        { products.map((dress, index) => (
          <div
            // eslint-disable-next-line
            key={index}
            className="FlashSaleProduct__container col-4_sm-6"
          >
            <a
              className="BridesmaidsProduct__image-wrapper FlashSaleProduct__image-wrapper u-cursor--pointer"
              href={this.generateImageUrl(dress.id, dress.image_urls[0].color, dress.length)}
            >
              <img
                className="FlashSaleProduct__image--original u-vertical-align--top"
                alt={dress.product_name}
                src={this.generateImage(dress, 'front')}
              />
              <img
                className="FlashSaleProduct__image--hover u-vertical-align--top"
                alt={dress.name}
                src={this.generateImage(dress, 'back')}
              />
            </a>
            <div className="grid-12">
              <div className="col-9">
                <p className="u-text-align--left u-mt-small">
                  <a
                    href={this.generateImageUrl(dress.id, dress.image_urls[0].color, dress.length)}
                  >
                    {dress.product_name}
                  </a>
                </p>
              </div>
              <div className="col-3 FlashSaleProduct__current-price u-mt-small">
                {this.formatPrice(dress.price.amount)}
              </div>
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
