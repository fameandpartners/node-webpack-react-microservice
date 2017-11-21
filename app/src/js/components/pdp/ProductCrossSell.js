import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { formatCents } from '../../utilities/accounting';

/* eslint-disable react/prefer-stateless-function */
class ProductCrossSell extends PureComponent {
  render() {
    const { complementaryProducts } = this.props;
    return (
      <div>
        <h3>Complete the Look</h3>
        <div className="ProductCrossSell__wrapper grid-12">
          { complementaryProducts.map(p => (
            <div key={p.productId} className="col-6">
              <a href={p.url}>
                <img className="u-width--full" alt="dress1" src={p.smallImg} />
              </a>
              <span className="ProductCrossSell__title">{p.productTitle}</span>
              <span className="ProductCrossSell__price display--block">
                {formatCents(p.centsPrice, 0)}
              </span>
              <span
                className="ProductCrossSell__cta link display--block"
                onClick={() => console.log(`Add Complementary w/ID: ${p.productId} to cart...`)}
              >
                  Add to Cart
              </span>
            </div>
            ))}
        </div>
      </div>
    );
  }
}

ProductCrossSell.propTypes = {
  complementaryProducts: PropTypes.arrayOf(PropTypes.shape({
    centsPrice: PropTypes.number,
    smallImg: PropTypes.string,
    productId: PropTypes.number,
    productTitle: PropTypes.string,
    url: PropTypes.string,
  })).isRequired,
};

export default ProductCrossSell;
