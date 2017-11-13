import React, { PureComponent } from 'react';

// CSS
import '../../../../css/components/CartEmpty.scss';

/* eslint-disable react/prefer-stateless-function */
class CartEmpty extends PureComponent {
  render() {
    return (
      <div className="CartEmpty">
        Your bag is empty
      </div>
    );
  }
}

export default CartEmpty;
