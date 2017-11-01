import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { formatCents } from '../../utilities/accounting';
import noop from '../../libs/noop';

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
        id,
        color,
        productCentsBasePrice,
        productImage,
        // productId, // TODO: @elgrecode, we'll need to compute something more that incorporates
        // color and addons selections, BELOW Math.random() will be replaced with a UID
        productTitle,
      } = lineItem;
      return (
        <div
          key={id}
          className="Cart__single-product-description grid-12"
        >
          <div className="col-5">
            <img className="u-width--full" alt="dress1" src={productImage} />
          </div>
          <div className="col-7 u-text-align--left">
            <span className="Cart__line-description">
              <span>{productTitle}</span> - <span>{formatCents(productCentsBasePrice, 2)}</span>
            </span>
            <span className="Cart__line-description">
              {color.presentation}
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
      <div className="Cart u-flex u-flex--1">
        <div className="Cart__contents u-flex--col">

          <div className="Cart__layout-container">
            <div className="Cart__subtotal u-text-align--center grid-12 u-mt-small">
              <span className="col-6 u-text-align--left">Subtotal</span>
              <span className="col-6 Cart__subtotal-price u-text-align--right">
                { formatCents(this.subTotal(), 2) }
              </span>
            </div>
            <Button
              tall
              className="u-mb-normal"
              url="/checkout"
              text="Checkout"
              handleClick={noop}
            />
          </div>


          <div className="u-flex u-flex--1">
            <div className="Cart__layout-container u-overflow-y--scroll">
              <div className="Cart__line-item-wrapper">
                { this.generateLineItems() }
              </div>
              <ProductCrossSell complementaryProducts={complementaryProducts} />
            </div>
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
    productId: PropTypes.number,
    productTitle: PropTypes.string,
    url: PropTypes.string,
  })).isRequired,
  lineItems: PropTypes.arrayOf(PropTypes.shape({
    addons: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
      centsTotal: PropTypes.number,
    })),
    color: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      centsTotal: PropTypes.number,
      hexValue: PropTypes.string,
    }),
    productCentsBasePrice: PropTypes.number,
    productImage: PropTypes.string,
    productTitle: PropTypes.string,
  })).isRequired,
};

export default Cart;
