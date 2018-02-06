/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import classnames from 'classnames';

// Utilities
import {
  isExtremeLightLuminance,
  generateBackgroundValueFromColor,
} from '../../utilities/color';
// import { formatSizePresentationUS } from '../../utilities/helpers';

// Components
import FadeIn from '../generic/FadeIn';
import BridesmaidsProductGridImage from './BridesmaidsProductGridImage';

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

  render() {
    const {
      bridesmaidsColors,
      products,
      selectedLength,
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
        { products.map(dress => (
          <BridesmaidsProductGridImage
            bridesmaidsColors={bridesmaidsColors}
            dress={dress}
            selectedLength={selectedLength}
          />
        ))}
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
BridesmaidsProductGrid.propTypes = {
  bridesmaidsColors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    presentation: PropTypes.string,
    hexValue: PropTypes.string,
    patternUrl: PropTypes.string,
  })),
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
  selectedLength: PropTypes.object.isRequired,
};

BridesmaidsProductGrid.defaultProps = {
  bridesmaidsColors: [],
};

export default BridesmaidsProductGrid;
