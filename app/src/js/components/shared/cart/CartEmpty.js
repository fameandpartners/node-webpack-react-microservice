import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ShoppingBagIcon from '../../../../svg/i-shopping-bag-2.svg';

// CSS
import '../../../../css/components/CartEmpty.scss';

/* eslint-disable react/prefer-stateless-function */
class CartEmpty extends PureComponent {
  render() {
    return (
      <div className="CartEmpty grid-middle u-flex u-flex--1">
        <div className="CartEmpty__contents u-center">
          <ShoppingBagIcon
            className="u-mb-small"
            width="18px"
            height="26px"
            opacity="0.5"
          />
          <p className="h5 u-mb-small">Your bag is empty</p>
          <p
            onClick={this.props.closeCartDrawer}
            className="link link__static"
            role="button"
          >
            Continue shopping
          </p>
        </div>
      </div>
    );
  }
}

CartEmpty.propTypes = {
  closeCartDrawer: PropTypes.func.isRequired,
};

export default CartEmpty;
