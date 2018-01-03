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
import '../../../css/components/BDColorSelection.scss';

class BDColorSelection extends PureComponent {
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
      <div className="u-display--inline-block" key={color.id}>
        <div
          onClick={this.handleColorSelection(color)}
          className={classnames([
            'BDColorSelection__wrapper',
            'col u-cursor--pointer u-height--full u-position--relative',
            {
              'BDColorSelection__wrapper--active': isActive,
              'BDColorSelection__wrapper--extreme-light': isExtremeLightLuminance(color),
            },
          ])}
          style={{ background }}
        >
          <div className="BDColorSelection__transform-wrapper">
            <div
              className={classnames(
              'BDColorSelection__swatch',
                {
                  'BDColorSelection__swatch--pattern': !!color.patternUrl,
                },
            )}
            />
          </div>
        </div>
        <span
          className={classnames(
              'BDColorSelection__touch-display-text',
              'u-width--full u-left',
            )}
        >
          <h6 className="BDColorSelection__text">
            {color.presentation}
            {price ? <span>&nbsp;{formatCents(price, 0)}</span> : null }
          </h6>
        </span>
      </div>
    );
  }

  render() {
    const {
      productColors,
      // productSecondaryColors,
      // productSecondaryColorsCentsPrice,
    } = this.props;

    return (
      // eslint-disable-next-line
      <div className="BDColorSelection u-white-space--nowrap u-text-align-left u-height--full u-overflow-x--scroll">
        { productColors.map(c => this.generateColorSwatch(c, 0))}

        {
          // productSecondaryColors.length
          // ? (
          //   <div>
          //     <h5 className="u-mb-small textAlign--left">
          //       Additional Colors +{formatCents(productSecondaryColorsCentsPrice, 0)}
          //     </h5>
          //     <div className="u-mb-normal grid-12">
          //       { productSecondaryColors.map(c =>
          //         this.generateColorSwatch(c, productSecondaryColorsCentsPrice))
          //       }
          //     </div>
          //   </div>
          // ) : null
        }
      </div>
    );
  }
}

BDColorSelection.propTypes = {
  // Passed Props
  productColors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    hexValue: PropTypes.string,
    patternUrl: PropTypes.string,
  })).isRequired,
  // productSecondaryColors: PropTypes.arrayOf(PropTypes.shape({
  //   id: PropTypes.number,
  //   centsPrice: PropTypes.number,
  //   name: PropTypes.string,
  //   hexValue: PropTypes.string,
  //   patternUrl: PropTypes.string,
  // })).isRequired,
  // productSecondaryColorsCentsPrice: PropTypes.number.isRequired,
  temporaryColorId: PropTypes.number.isRequired,
  handleColorSelection: PropTypes.func.isRequired,
};

BDColorSelection.defaultProps = {};


export default BDColorSelection;
