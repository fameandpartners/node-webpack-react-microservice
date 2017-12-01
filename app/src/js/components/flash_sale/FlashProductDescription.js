import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';

// Utilities
import { formatCents } from '../../utilities/accounting';
// import { addonSelectionDisplayText } from '../../utilities/pdp';

// CSS
import '../../../css/components/FlashProductDescription.scss';


class FlashProductDescription extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  calculateInstallment(divisor, currencySymbol) {
    return currencySymbol + (Number(this.calculateSubTotal('')) / divisor).toFixed(2);
  }

  generateCustomizationText() {
    return '[Customization info goes here Nav, I think you can just throw in the customizations into the function below]';
    // const { lineItem } = this.props;
    // console.log('lineItem', lineItem);
    // return addonSelectionDisplayText({ selectedAddonOptions: lineItem.customizations });
  }

  generateFlashColorSwatch() {
    const { lineItem } = this.props;
    const { value } = lineItem.color.option_value;
    const hasPatternImage = value ? value.indexOf('.') > -1 : false;

    if (hasPatternImage) {
      return {
        backgroundImage: `url(${value})`,
      };
    }

    return {
      background: value,
    };
  }

  render() {
    const { lineItem } = this.props;
    const { presentation } = lineItem.color.option_value;

    return (
      <div className="FlashProductDescription typography u-center">
        <div className="FlashProductDescription__title-section u-text-align--left">
          <h2 className="FlashProductDescription__title u-display--inline-block">
            {lineItem.name}
          </h2>

          <div className="FlashProductDescription__price u-display--inline-block float--right">
            <span className="FlashProductDescription__old-price u-text-decoration--line-through">
              {formatCents(lineItem.original_price * 100, 0)}
            </span>
            <span className="FlashProductDescription__current-price">
              {formatCents(lineItem.current_price * 100, 0)}
            </span>
          </div>
        </div>

        <p className="FlashProductDescription__description u-mt-normal">
          {lineItem.description}
        </p>

        <div className="FlashProductDescription__customization-details u-mt-normal">
          <p>{this.generateCustomizationText()}</p>
          <p>Color: {presentation}</p>
          <div
            style={this.generateFlashColorSwatch()}
            className="FlashProductDescription__color-swatch"
          />
        </div>
      </div>
    );
  }
}

FlashProductDescription.propTypes = {
  // eslint-disable-next-line
  lineItem: PropTypes.object.isRequired,
};

export default FlashProductDescription;
