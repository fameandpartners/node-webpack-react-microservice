import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { formatCents } from '../../utilities/accounting';

// Utilities
import { isDarkLuminance } from '../../utilities/color';

// CSS
import '../../../css/components/ColorSwatches.scss';

class ColorSwatches extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleColorSelection(color) {
    return () => {
      this.props.handleColorSelection(color);
    };
  }

  generateColorSwatch(color, price = 0) {
    const isActive = this.props.selectedColorId === color.id;
    return (
      <div className="col-4" key={color.id}>
        <div
          onClick={this.handleColorSelection(color)}
          className={classnames([
            'ColorSwatches__wrapper',
            'col u-cursor--pointer height--full',
            {
              'ColorSwatches__wrapper--active': isActive,
            },
          ])}
          style={{ background: color.hexValue }}
        >
          <div
            className={classnames(
            'ColorSwatches__swatch u-flex--center',
            { 'ColorSwatches__swatch--dark': isDarkLuminance(color.hexValue) },
          )}
          >
            <div className="u-center">
              <span>{color.name}</span>
              <br />
              { price
                ? <span>{formatCents(price, 0)}</span>
                : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {
      productDefaultColors,
      productSecondaryColors,
      productSecondaryColorCentsPrice,
    } = this.props;

    return (
      <div className="ColorSwatches">
        <h3 className="u-mb-small textAlign--left">
          Fame Recommends
        </h3>
        <div className="u-mb-normal grid-12">
          { productDefaultColors.map(c => this.generateColorSwatch(c, 0))}
        </div>
        <h3 className="u-mb-small textAlign--left">
          Additional Colors +$16
        </h3>
        <div className="u-mb-normal grid-12">
          { productSecondaryColors.map(c =>
            this.generateColorSwatch(c, productSecondaryColorCentsPrice))
          }
        </div>
      </div>
    );
  }
}

ColorSwatches.propTypes = {
  productDefaultColors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    hexValue: PropTypes.string,
    patternUrl: PropTypes.string,
  })).isRequired,
  productSecondaryColorCentsPrice: PropTypes.number.isRequired,
  productSecondaryColors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    hexValue: PropTypes.string,
    patternUrl: PropTypes.string,
  })).isRequired,
  selectedColorId: PropTypes.string.isRequired,
  handleColorSelection: PropTypes.func.isRequired,
};

ColorSwatches.defaultProps = {};


export default ColorSwatches;
