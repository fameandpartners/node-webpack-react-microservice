import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { formatCents } from '../../utilities/accounting';

// Utilities
import { isDarkLuminance } from '../../utilities/color';

// CSS
import '../../../css/components/ColorSelection.scss';

class ColorSelectionDrawer extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleColorSelection(color) {
    const { handleColorSelection } = this.props;
    return () => {
      handleColorSelection(color);
    };
  }

  generateColorSwatch(color, price = 0) {
    return (
      <div className="col-4">
        <div
          onClick={this.handleColorSelection(color)}
          className={classnames([
            'ProductFabricSwatches__swatch-wrapper',
            'col u-cursor--pointer height--full',
          ])}
          style={{ background: color.hexValue }}
        >
          <div
            className={classnames(
            'ProductFabricSwatches__swatch u-flex--center',
            { 'ProductFabricSwatches__swatch--dark': isDarkLuminance(color.hexValue) },
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
      <div className="ColorSwatches grid-12">
        { productDefaultColors.map(c => this.generateColorSwatch(c, 0))}
        { productSecondaryColors.map(c =>
            this.generateColorSwatch(c, productSecondaryColorCentsPrice))
          }
      </div>
    );
  }
}

ColorSelectionDrawer.propTypes = {
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
  handleColorSelection: PropTypes.func.isRequired,
};

ColorSelectionDrawer.defaultProps = {};


export default ColorSelectionDrawer;
