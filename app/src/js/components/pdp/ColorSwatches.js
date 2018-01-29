import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Utilities
import { formatCents } from '../../utilities/accounting';
import {
  generateBackgroundValueFromColor,
  isExtremeLightLuminance,
} from '../../utilities/color';

// CSS
import '../../../css/components/ColorSwatches.scss';

class ColorSwatches extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleColorSelection(color) {
    return () => { this.props.handleColorSelection(color); };
  }

  generateColorSwatch(color, price = 0) {
    const { temporaryColorId } = this.props;
    const isActive = temporaryColorId === color.id;
    const background = generateBackgroundValueFromColor(color);

    return (
      <div
        key={color.id}
        className="col-4 u-mb--big"
      >
        <div
          onClick={this.handleColorSelection(color)}
          className={classnames([
            'ColorSwatches__wrapper',
            'col u-cursor--pointer u-height--full u-position--relative',
            {
              'ColorSwatches__wrapper--active': isActive,
              'ColorSwatches__wrapper--extreme-light': isExtremeLightLuminance(color),
            },
          ])}
          style={{ background }}
        >
          <div className="ColorSwatches__transform-wrapper">
            <div
              className={classnames(
              'ColorSwatches__swatch',
                {
                  'ColorSwatches__swatch--pattern': !!color.patternUrl,
                },
            )}
            />
          </div>
          <span
            className={classnames(
            'ColorSwatches__touch-display-text',
            'u-width--full u-left',
          )}
          >
            <h6 className="ColorSwatches__text">
              {color.presentation}
              {price ? <span>&nbsp;{formatCents(price, 0)}</span> : null }
            </h6>
          </span>
        </div>
      </div>
    );
  }

  render() {
    const {
      productDefaultColors,
      productSecondaryColors,
      productSecondaryColorsCentsPrice,
    } = this.props;

    return (
      <div
        className="ColorSwatches u-mt--normal u-text-align-left"
      >
        <h5 className="u-mb--small u-text-align--left">
          Fame Recommends
        </h5>
        <div className="grid-12">
          { productDefaultColors.map(c => this.generateColorSwatch(c, 0))}
        </div>

        { productSecondaryColors.length
          ? (
            <div>
              <h5 className="u-mb--small textAlign--left">
                Additional Colors +{formatCents(productSecondaryColorsCentsPrice, 0)}
              </h5>
              <div className="u-mb--normal grid-12">
                { productSecondaryColors.map(c =>
                  this.generateColorSwatch(c, productSecondaryColorsCentsPrice))
                }
              </div>
            </div>
          ) : null
        }
      </div>
    );
  }
}

ColorSwatches.propTypes = {
  // Passed Props
  productDefaultColors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    hexValue: PropTypes.string,
    patternUrl: PropTypes.string,
  })).isRequired,
  productSecondaryColors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    centsPrice: PropTypes.number,
    name: PropTypes.string,
    hexValue: PropTypes.string,
    patternUrl: PropTypes.string,
  })).isRequired,
  productSecondaryColorsCentsPrice: PropTypes.number.isRequired,
  temporaryColorId: PropTypes.number.isRequired,
  handleColorSelection: PropTypes.func.isRequired,
};

ColorSwatches.defaultProps = {};


export default ColorSwatches;
