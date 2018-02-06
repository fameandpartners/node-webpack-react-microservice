/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import classnames from 'classnames';

// Constants
import BDCustomizationConstants from '../../constants/BDCustomizationConstants';

// Utilities
import win from '../../polyfills/windowPolyfill';
import {
  isExtremeLightLuminance,
  generateBackgroundValueFromColor,
} from '../../utilities/color';
// import { formatSizePresentationUS } from '../../utilities/helpers';
import { generateCustomizationImage } from '../../utilities/bridesmaids';

// CSS
import '../../../css/components/FlashSaleProductGrid.scss';
import '../../../css/components/BridesmaidsProductGrid.scss';

class BridesmaidsProductGridImage extends Component {
  constructor(props) {
    super(props);
    autobind(this);
    this.state = {
      isHoveringDetails: false,
    };
  }

  formatPrice(str) {
    const newPrice = str.substring(0, str.length - 2);

    return `$${newPrice}`;
  }

  generateBridesmaidsColorOptions() {
    const { bridesmaidsColors } = this.props;
    return bridesmaidsColors.map((color) => {
      const {
        hexValue,
        patternUrl,
      } = color;
      const background = generateBackgroundValueFromColor({
        hexValue,
        patternUrl,
      });

      return (
        <div className="col" key={hexValue}>
          <span
            style={{ background }}
            className={classnames(
            'BridesmaidsProductGrid__color-swatch u-display--inline-block',
            { 'BridesmaidsProductGrid__color-swatch--extreme-light': isExtremeLightLuminance({ hexValue }) },
          )}
          />
        </div>
      );
    });
  }

  generateImageUrl(dressId, colorName, length) {
    return win.encodeURI(`/bridesmaid-dresses/${dressId}?color=${colorName}&length=${length}`);
  }

  generateImage(
    {
      image_urls: imageUrls,
      style_number: styleNumber,
      customization_ids: customizationIds,
    },
    side,
  ) {
    const {
      selectedLength,
    } = this.props;

    const { colorNames } = BDCustomizationConstants;
    const imageStr = generateCustomizationImage({
      side,
      sku: styleNumber.toLowerCase(),
      customizationIds,
      imgSizeStr: '800x800',
      length: selectedLength.name.replace('-', '_'),
      colorCode: colorNames[imageUrls[0].color],
    });

    return imageStr;
  }

  handleMouseEnterDetails() {
    this.setState({
      isHoveringDetails: true,
    });
  }

  handleMouseLeaveDetails() {
    this.setState({
      isHoveringDetails: false,
    });
  }

  render() {
    const {
      dress,
    } = this.props;
    const {
      isHoveringDetails,
    } = this.state;

    return (
      <div
        key={dress.id}
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
        <div
          className="grid-12 BridesmaidsProductGrid__details u-position--relative"
          onMouseEnter={this.handleMouseEnterDetails}
          onMouseLeave={this.handleMouseLeaveDetails}
        >
          <div
            className={classnames(
                'BridesmaidsProductGrid__color-selection u-position--absolute u-width--full grid-9',
                { 'BridesmaidsProductGrid__color-selection--active': isHoveringDetails },
              )}
          >
            {this.generateBridesmaidsColorOptions()}
          </div>
          <div
            className={classnames(
                'col-9 BridesmaidsProductGrid__product-text',
                { 'BridesmaidsProductGrid__product-text--active': !isHoveringDetails },
              )}
          >
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
    );
  }
}

/* eslint-disable react/forbid-prop-types */
BridesmaidsProductGridImage.propTypes = {
  bridesmaidsColors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    presentation: PropTypes.string,
    hexValue: PropTypes.string,
    patternUrl: PropTypes.string,
  })).isRequired,
  dress: PropTypes.shape({
    // id: PropTypes.number,
    product_name: PropTypes.string,
    // images: PropTypes.array,
    // original_price: PropTypes.number,
    // current_price: PropTypes.number,
    // size: PropTypes.string,
    // color: PropTypes.string,
    // permalink: PropTypes.string,
  }).isRequired,
  selectedLength: PropTypes.object.isRequired,
};

export default BridesmaidsProductGridImage;
