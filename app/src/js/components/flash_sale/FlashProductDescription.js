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
      <div className="FlashProductDescription typography u-center">
        <div className="FlashProductDescription__title-section u-text-align--left">
          <h2 className="FlashProductDescription__title u-display--inline-block">
          [[Siana, Size 8 US]]
          </h2>

          <div className="FlashProductDescription__price u-display--inline-block float--right">
            <span className="FlashProductDescription__old-price">
              [[299]]
            </span>
            <span className="FlashProductDescription__current-price">
              [[179]]
            </span>
          </div>
        </div>

        <div className="FlashProductDescription__description u-mt-normal">
          [[
            Welcome to the future. The Collins is a metallic lurex woven, strapless mini
            dress feature a sweetheart neckline, a weap-style fit, and an exaggerated bow
            at the wast. It has an invisible zip closure
          ]]
        </div>

        <div className="FlashProductDescription__customization-details u-mt-normal">
          <p>[[Customizations: Remove Train (Note  featured)]]</p>
          <p>[[Color: Navy]]</p>
          <div>[COLOR]</div>
        </div>
      </div>
    );
  }
}


export default FlashProductDescription;
