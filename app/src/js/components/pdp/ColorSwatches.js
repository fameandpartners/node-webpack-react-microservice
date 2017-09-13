import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { formatCents } from '../../utilities/accounting';

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

    return (
      <div
        key={color.id}
        className="col-4 u-mb-big"
      >
        <div
          onClick={this.handleColorSelection(color)}
          className={classnames([
            'ColorSwatches__wrapper',
            'col u-cursor--pointer u-height--full u-position--relative',
            { 'ColorSwatches__wrapper--active': isActive },
          ])}
          style={{ background: color.hexValue }}
        >
          <div className="ColorSwatches__swatch u-flex">
            <span
              className={classnames(
                'ColorSwatches__touch-display-text',
                'u-width--full u-position--absolute u-left',
              )}
            >
              <h6>
                {color.presentation}
                {price ? <span>&nbsp;{formatCents(price, 0)}</span> : null }
              </h6>
            </span>
          </div>
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
        className="ColorSwatches u-mt-normal u-text-align-left"
      >
        <h5 className="u-mb-small textAlign--left">
          Fame Recommends
        </h5>
        <div className="grid-12">
          { productDefaultColors.map(c => this.generateColorSwatch(c, 0))}
        </div>
        <h5 className="u-mb-small textAlign--left">
          Additional Colors +{formatCents(productSecondaryColorsCentsPrice, 0)}
        </h5>
        <div className="u-mb-normal grid-12">
          { productSecondaryColors.map(c =>
            this.generateColorSwatch(c, productSecondaryColorsCentsPrice))
          }
        </div>
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
