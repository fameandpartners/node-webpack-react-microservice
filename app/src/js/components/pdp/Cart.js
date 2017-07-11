import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import objnoop from '../../libs/objnoop';
import { formatCents } from '../../utilities/accounting';
// import { bindActionCreators } from 'redux';

// TEST IMAGES
import image1 from '../../../img/test/image_1.png';

// Actions
// import * as AppActions from '../../actions/AppActions';

// UI Components
import Button from '../generic/Button';

// CSS
import '../../../css/components/Cart.scss';


function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    lineItems: state.$$cartState.get('lineItems').toJS(),
  };
}


class Cart extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  subTotal() {
    const { lineItems } = this.props;
    if (lineItems.length > 0) {
      return lineItems.reduce(
        (prevTotal, currLineItem) => {
          const lineItemTotal = currLineItem.color.centsTotal + currLineItem.productCentsBasePrice;
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
        // color and addons selections
        productTitle,
      } = lineItem;
      return (
        <div
          key={Math.random()}
          className="Cart__single-product-description App--mt-normal grid-12"
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
                3 Addons
              </span>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="Cart">
        <div className="Cart__header">
          <h4>Shopping Bag</h4>
        </div>
        <div className="layout-container">

          { this.generateLineItems() }


          <div className="Cart__subtotal textAlign--center">
            <span>Subtotal</span>
            <span className="Cart__subtotal-price">
              { formatCents(this.subTotal(), 2) }
            </span>
          </div>
          <Button
            tall
            className="App--mb-normal"
            text="Checkout"
          />

        </div>
        <div className="layout-container">
          <h4>Complete the Look</h4>
          <div className="Cart__cross-sell grid-12">
            <div className="col-6">
              <img className="width--full" alt="dress1" src={image1} />
              <span className="">The Harreljj Top</span>
              <span className="Cart__cross-sell-cta link link--static display--block">
                Add to Cart
              </span>
            </div>
            <div className="col-6">
              <img className="width--full" alt="dress1" src={image1} />
              <span className="">The Marley Skirt</span>
              <span className="Cart__cross-sell-cta link link--static display--block">
                Add to Cart
              </span>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  lineItems: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      centsTotal: PropTypes.number,
      hexValue: PropTypes.string,
    }),
    //   addons: ObjectOf({
    //    ????????????
    //   },
    //   subTotal: Number,
    //   quanitty: Number
  })).isRequired,
  // modelDescription: PropTypes.string.isRequired,
};

export default connect(stateToProps, objnoop)(Cart);
