import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';

// Utilities
import win from '../../polyfills/windowPolyfill';
import { formatSizePresentationUS } from '../../utilities/helpers';

// CSS
import '../../../css/components/FlashSaleProductGrid.scss';


class FlashSaleProductGrid extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  formatPrice(str) {
    const newPrice = str.substring(0, str.length - 2);

    return `$${newPrice}`;
  }

  goToImageHref(href) {
    return () => {
      win.location = href;
    };
  }

  render() {
    const {
      products,
    } = this.props;

    return (
      <div className="FlashSaleProductGrid__wrapper grid-12">
        { products.map(dress => (
          <div
            key={dress.id}
            className="FlashSaleProduct__container col-4_sm-6"
            onClick={this.goToImageHref(`/sample-sale/${dress.id}`)}
          >
            <a className="FlashSaleProduct__image-wrapper u-cursor--pointer">
              <img
                className="FlashSaleProduct__image--original"
                alt={dress.name}
                src={dress.images[dress.images.length - 1]}
              />
              <img
                className="FlashSaleProduct__image--hover"
                alt={dress.name}
                src={dress.images[dress.images.length - 2]}
              />
            </a>
            <div className="FlashSaleProduct__info grid-12">
              <div className="col-8">
                <a href={`/sample-sale/${dress.id}`}>
                  {dress.name}
                </a>
              </div>
              <div className="col-4 FlashSaleProduct__original-price">
                {this.formatPrice(dress.original_price)}
              </div>
              <div className="col-8">
                {dress.color}, {formatSizePresentationUS(dress.size)}, {dress.height}
              </div>
              <div className="col-4 FlashSaleProduct__current-price">
                {this.formatPrice(dress.current_price)}
              </div>
            </div>
          </div>
        ))}
        <div className="col-12">
          <div className="FlashSaleProduct__footerMessageWrapper u-mt-normal">
            <span className="FlashSaleProduct__footerMessage">
              Didn't find what you are looking for?
              <br />
              <a href="/dresses/best-sellers">
                Shop Best Sellers
              </a>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

FlashSaleProductGrid.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    images: PropTypes.array,
    original_price: PropTypes.number,
    current_price: PropTypes.number,
    size: PropTypes.string,
    color: PropTypes.string,
    permalink: PropTypes.string,
  })).isRequired,
};

export default FlashSaleProductGrid;
