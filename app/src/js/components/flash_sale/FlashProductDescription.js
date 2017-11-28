import React, { Component } from 'react';
import autoBind from 'react-autobind';
// import { bindActionCreators } from 'redux';

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

  render() {
    return (
      <div className="u-center">
        ProductDescription information
      </div>
    );
  }
}


export default FlashProductDescription;
