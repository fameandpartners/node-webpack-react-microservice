import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';

// CSS
import '../../../css/components/FlashSaleProductGrid.scss';


class FlashSaleProductGrid extends Component {
  constructor(props) {
    super(props);
    autobind(this);
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
          >
            <div className="FlashSaleProduct__image">
              <a href={dress.permalink}>
                <img src={dress.images[0].url} alt={dress.name} />
              </a>
            </div>
            <div className="FlashSaleProduct__info grid-12">
              <div className="col-8">
                <a href={dress.permalink}>
                  {dress.name}
                </a>
              </div>
              <div className="col-4 FlashSaleProduct__original-price">
                {dress.originalPrice}
              </div>
              <div className="col-8">
                {dress.color}, {dress.size}
              </div>
              <div className="col-4 FlashSaleProduct__current-price">
                {dress.currentPrice}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

FlashSaleProductGrid.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    images: PropTypes.array,
    originalPrice: PropTypes.string,
    currentPrice: PropTypes.string,
    size: PropTypes.string,
    color: PropTypes.string,
    permalink: PropTypes.string,
  })).isRequired,
};

export default FlashSaleProductGrid;
