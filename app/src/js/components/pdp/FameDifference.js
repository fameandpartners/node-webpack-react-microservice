import React, { PureComponent } from 'react';
import aerialImage from '../../../img/test/aerial.png';
import handmadeImage from '../../../img/test/handmade.png';

/* eslint-disable react/prefer-stateless-function */
class FameDifference extends PureComponent {
  render() {
    return (
      <div className="FameDifference typography">
        <h3>The Fame Difference</h3>
        <p>
          Our ethical, made-to-order model means less waste
          since we don't carry and store excess stock
        </p>
        <div className="grid">
          <div className="col-12">
            <img className="width--full" src={aerialImage} alt="Sewing and designing" />
          </div>
          <div className="FameDifference__artisan-quality col-6_md-4_sm-12">
            Artisan quality, our clothing is handmade by artisan seamstresses
            using time-honored techniques.
          </div>
          <div className="FameDifference__hand col_md-8_sm-12">
            <img className="width--full" src={handmadeImage} alt="Hand designing" />
          </div>
        </div>
      </div>
    );
  }
}

export default FameDifference;
