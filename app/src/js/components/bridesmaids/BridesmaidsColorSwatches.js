import React, { PureComponent } from 'react';
import autobind from 'react-autobind';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Utilities
import {
  generateBackgroundValueFromColor,
  isExtremeLightLuminance,
} from '../../utilities/color';

// CSS
import '../../../css/components/ColorSwatches.scss';

class BridesmaidsColorSwatches extends PureComponent {
  constructor(props) {
    super(props);
    autobind(this);
  }

  handleColorSelection(color) {
    return () => { this.props.handleColorSelection(color); };
  }

  generateColorSwatch(color) {
    const { temporaryColorId } = this.props;
    const isActive = temporaryColorId === color.id;
    const background = generateBackgroundValueFromColor(color);

    return (
      <div
        key={color.id}
        className="col-2 u-mb-big"
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
            </h6>
          </span>
        </div>
      </div>
    );
  }

  render() {
    const {
      productDefaultColors,
    } = this.props;

    return (
      <div className="ColorSwatches u-mt-normal u-text-align-left">
        <div className="grid-12">
          { productDefaultColors.map(c => this.generateColorSwatch(c, 0))}
        </div>
      </div>
    );
  }
}

BridesmaidsColorSwatches.propTypes = {
  // Passed Props
  productDefaultColors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    hexValue: PropTypes.string,
    patternUrl: PropTypes.string,
  })).isRequired,
  temporaryColorId: PropTypes.number.isRequired,
  handleColorSelection: PropTypes.func.isRequired,
};

BridesmaidsColorSwatches.defaultProps = {};


export default BridesmaidsColorSwatches;
