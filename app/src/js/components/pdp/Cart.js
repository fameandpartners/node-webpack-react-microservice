import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { formatCents } from '../../utilities/accounting';
import image1 from '../../../img/test/image_1.png';


// UI Components
import Button from '../generic/Button';
import ProductCrossSell from './ProductCrossSell';

// CSS
import '../../../css/components/Cart.scss';

class Cart extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  subTotal() {
    const { lineItems } = this.props;
    if (lineItems.length > 0) {
      // Reduces subTotal based on base price, colors, and addons chosen
      return lineItems.reduce(
        (prevTotal, currLineItem) => {
          const lineItemTotal
            = currLineItem.color.centsTotal
            + currLineItem.productCentsBasePrice
            + currLineItem.addons.reduce((subTotal, c) => subTotal + c.centsTotal, 0);
          return prevTotal + lineItemTotal;
        }, 0,
      );
    }
    return '';
  }

  generateLineItems() {
    const { lineItems } = this.props;

    return lineItems.map((lineItem) => {
      const {
        color,
        productCentsBasePrice,
        // productId, // TODO: @elgrecode, we'll need to compute something more that incorporates
        // color and addons selections, BELOW Math.random() will be replaced with a UID
        productTitle,
      } = lineItem;
      return (
        <div
          key={Math.random()}
          className="Cart__single-product-description u-mt-normal grid-12"
        >
          <div className="col-5">
            <img className="width--full" alt="dress1" src={image1} />
          </div>
          <div className="col-7 textAlign--left">
            <span className="Cart__line-description">
              <span>{productTitle}</span> - <span>{formatCents(productCentsBasePrice, 2)}</span>
            </span>
            <span className="Cart__line-description">
              {color.name}
            </span>
            <span className="Cart__line-description">
              {lineItem.addons.length}&nbsp;Addon{lineItem.addons.length === 1 ? '' : 's'}
            </span>
          </div>
        </div>
      );
    });
  }

  render() {
    const { complementaryProducts } = this.props;
    return (
      <div className="Cart u-overflow-y--scroll">
        <div className="Cart__contents">
          <div className="Cart__layout-container">

            { this.generateLineItems() }


            <div className="Cart__subtotal textAlign--center">
              <span>Subtotal</span>
              <span className="Cart__subtotal-price">
                { formatCents(this.subTotal(), 2) }
              </span>
            </div>
            <Button
              tall
              className="u-mb-normal"
              text="Checkout"
            />
          </div>
          <div className="Cart__layout-container">
            <ProductCrossSell complementaryProducts={complementaryProducts} />
          </div>

        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  complementaryProducts: PropTypes.arrayOf(PropTypes.shape({
    centsPrice: PropTypes.number,
    smallImg: PropTypes.string,
    productId: PropTypes.string,
    productTitle: PropTypes.string,
    url: PropTypes.string,
  })).isRequired,
  lineItems: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      centsTotal: PropTypes.number,
      hexValue: PropTypes.string,
    }),
    addons: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      description: PropTypes.string,
      centsTotal: PropTypes.number,
    })),
  })).isRequired,
};

export default Cart;
