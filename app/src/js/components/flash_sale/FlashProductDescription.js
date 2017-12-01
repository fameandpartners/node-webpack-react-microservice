import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';

// Utilities
import { formatCents } from '../../utilities/accounting';

// CSS
import '../../../css/components/FlashProductDescription.scss';


class FlashProductDescription extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      customizations: [],
    };
  }

  calculateInstallment(divisor, currencySymbol) {
    return currencySymbol + (Number(this.calculateSubTotal('')) / divisor).toFixed(2);
  }

  generateFlashColorSwatch() {
    const { lineItem } = this.props;
    const value = lineItem.color_value;
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

  setCustomizations() {
    const { lineItem } = this.props;

    if (lineItem.customisations.length) {
      this.setState({
        customizations: lineItem.customisations,
      });
    }
  }

  componentWillMount() {
    this.setCustomizations();
  }

  render() {
    const { lineItem } = this.props;
    const presentation = lineItem.color_presentation;
    const { customizations } = this.state;

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
          { customizations.length ?
            (
              <div className="FlashProductDescription__addons-details">
                <h5 className="FlashProductDescription__addons-header">
                  Customizations
                </h5>
                <ul className="FlashProductDescription__addons-list">
                  {/* eslint-disable react/no-array-index-key */}
                  {customizations.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            ) : null
          }
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
