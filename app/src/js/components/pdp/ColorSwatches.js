import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { formatCents } from '../../utilities/accounting';

// Decorators
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

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
    return () => { this.props.handleColorSelection(color); };
  }

  generateColorSwatch(color, price = 0, isTouch) {
    const { temporaryColorId } = this.props;
    const isActive = temporaryColorId === color.id;

    return (
      <div
        key={color.id}
        className={classnames(
          'col-4',
          { 'u-mb-normal': isTouch },
        )}
      >
        <div
          onClick={this.handleColorSelection(color)}
          className={classnames([
            'ColorSwatches__wrapper',
            'col u-cursor--pointer height--full u-position--relative',
            { 'ColorSwatches__wrapper--active': isActive },
            { 'ColorSwatches__wrapper--touch': isTouch },
          ])}
          style={{ background: color.hexValue }}
        >
          <div
            className={classnames(
              'ColorSwatches__swatch',
              { 'ColorSwatches__swatch--dark': !isTouch && isDarkLuminance(color.hexValue) },
              { 'u-flex--center': !isTouch },
            )}
          >
            { isTouch
                ? (
                  <span
                    className={classnames(
                      'ColorSwatches__touch-display-text',
                      'u-width--full u-position--absolute u-left u-text-align-center',
                    )}
                  >
                    <span>{color.presentation}</span>
                    { price
                      ? <span>&nbsp;{formatCents(price, 0)}</span>
                      : null
                    }
                  </span>
                )
                : (
                  <div className="u-center">
                    <span>
                      <span>{color.presentation}</span>
                      <br />
                      { price
                      ? <span>{formatCents(price, 0)}</span>
                      : null
                    }
                    </span>
                  </div>
                )
              }
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {
      breakpoint,
      productDefaultColors,
      productSecondaryColors,
    } = this.props;
    const isTouch = (breakpoint === 'mobile' || breakpoint === 'tablet');

    return (
      <div
        className={
          classnames(
            'ColorSwatches u-mt-normal',
            {
              'u-text-align-center': isTouch,
              'u-text-align-left': !isTouch,
            },
        )}
      >
        <h3 className="u-mb-small textAlign--left">
          Fame Recommends
        </h3>
        <div className="u-mb-normal grid-12">
          { productDefaultColors.map(c => this.generateColorSwatch(c, 0, isTouch))}
        </div>
        <h3 className="u-mb-small textAlign--left">
          Additional Colors +$16
        </h3>
        <div className="u-mb-normal grid-12">
          { productSecondaryColors.map(c =>
            this.generateColorSwatch(c, c.centsTotal, isTouch))
          }
        </div>
      </div>
    );
  }
}

ColorSwatches.propTypes = {
  // Decorator Props
  breakpoint: PropTypes.string.isRequired,
  // Passed Props
  productDefaultColors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    hexValue: PropTypes.string,
    patternUrl: PropTypes.string,
  })).isRequired,
  productSecondaryColors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    hexValue: PropTypes.string,
    patternUrl: PropTypes.string,
  })).isRequired,
  temporaryColorId: PropTypes.number.isRequired,
  handleColorSelection: PropTypes.func.isRequired,
};

ColorSwatches.defaultProps = {};


export default Resize(PDPBreakpoints)(ColorSwatches);
