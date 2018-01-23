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
import '../../../css/components/BridesmaidColorSwatches.scss';

class BridesmaidsColorSwatches extends PureComponent {
  constructor(props) {
    super(props);
    autobind(this);
  }

  handleColorSelection(color) {
    return () => { this.props.handleColorSelection(color); };
  }

  generateColorSwatch(color) {
    const { selectedColorId } = this.props;
    const isActive = selectedColorId === color.id;
    const background = generateBackgroundValueFromColor(color);

    return (
      <div
        key={color.id}
        className="col u-mb-big"
      >
        <div
          onClick={this.handleColorSelection(color)}
          className={classnames([
            'BridesmaidColorSwatches__wrapper',
            'col u-cursor--pointer u-height--full u-position--relative',
            {
              'BridesmaidColorSwatches__wrapper--active': isActive,
              'BridesmaidColorSwatches__wrapper--extreme-light': isExtremeLightLuminance(color),
            },
          ])}
          style={{ background }}
        >
          <div className="BridesmaidColorSwatches__transform-wrapper">
            <div
              className={classnames(
              'BridesmaidColorSwatches__swatch',
                {
                  'BridesmaidColorSwatches__swatch--pattern': !!color.patternUrl,
                },
            )}
            />
          </div>
          <span
            className={classnames(
            'BridesmaidColorSwatches__touch-display-text',
            'u-width--full u-left',
          )}
          >
            <h6 className="BridesmaidColorSwatches__text">
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
      <div className="BridesmaidColorSwatches layout-container u-mt-normal u-text-align-left">
        <div className="grid-9">
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
  selectedColorId: PropTypes.number,
  handleColorSelection: PropTypes.func.isRequired,
};

BridesmaidsColorSwatches.defaultProps = {
  selectedColorId: null,
};


export default BridesmaidsColorSwatches;
