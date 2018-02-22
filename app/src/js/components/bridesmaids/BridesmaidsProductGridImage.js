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
    const { colorNames } = BDCustomizationConstants;
    this.state = {
      isHoveringDetails: false,
      selectedColorCode: colorNames[props.dress.image_urls[0].color],
    };
  }

  formatPrice(str) {
    const newPrice = str.substring(0, str.length - 2);

    return `$${newPrice}`;
  }

  handleSwatchColorSelection(colorCode) {
    return () => {
      this.setState({
        selectedColorCode: colorCode,
      });
    };
  }

  generateBridesmaidsColorOptions() {
    const { bridesmaidsColors } = this.props;
    const { selectedColorCode } = this.state;

    return bridesmaidsColors.map((color) => {
      const currentColorCode = BDCustomizationConstants.colorNames[color.presentation];
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
            onClick={this.handleSwatchColorSelection(currentColorCode)}
            style={{ background }}
            className={classnames(
            'BridesmaidsProductGrid__color-swatch u-display--inline-block',
              {
                'BridesmaidsProductGrid__color-swatch--extreme-light': isExtremeLightLuminance({ hexValue }),
                'BridesmaidsProductGrid__color-swatch--is-active': currentColorCode === selectedColorCode,
              },
          )}
          />
        </div>
      );
    });
  }

  generateImageUrl(dressId, selectedColorCode, length) {
    const { colorNames } = BDCustomizationConstants;
    const colorKeyNames = Object.keys(colorNames);
    const color = colorKeyNames.find(colorKey => colorNames[colorKey] === selectedColorCode);
    return win.encodeURI(`/bridesmaid-dresses/${dressId}?color=${color}&length=${length}`);
  }

  generateImage(
    {
      image_urls: imageUrls,
      style_number: styleNumber,
      customization_ids: customizationIds,
    },
    side,
  ) {
    const { selectedLength } = this.props;
    const { selectedColorCode } = this.state;

    const imageStr = generateCustomizationImage({
      side,
      sku: styleNumber.toLowerCase(),
      customizationIds,
      imgSizeStr: '800x800',
      length: selectedLength.name.replace('-', '_'),
      colorCode: selectedColorCode,
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
      selectedColorCode,
    } = this.state;

    return (
      <div
        key={dress.id}
        className="FlashSaleProduct__container col-4_sm-6"
      >
        <a
          className="BridesmaidsProduct__image-wrapper FlashSaleProduct__image-wrapper u-cursor--pointer"
          href={this.generateImageUrl(dress.id, selectedColorCode, dress.length)}
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
                'BridesmaidsProductGrid__color-selection u-position--absolute u-width--full grid-12-noGutter',
                { 'BridesmaidsProductGrid__color-selection--active': isHoveringDetails },
              )}
          >
            <div className="col-10 grid-9-noGutter">
              {this.generateBridesmaidsColorOptions()}
            </div>
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
          <div className="col-3 BridesmaidsProductGrid__current-price FlashSaleProduct__current-price u-mt-small">
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
    image_urls: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string.isRequired,
      }),
    ).isRequired,
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
