import React, { Component } from 'react';
import autobind from 'react-autobind';

// CSS
import '../../../css/components/FlashSaleProductGrid.scss';


class FlashSaleProductGrid extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      dresses: [
        {
          id: 1,
          name: 'Dress 1',
          images: [{ url: 'http://via.placeholder.com/250x400' }],
          originalPrice: '$299',
          currentPrice: '$179',
          size: '8 US',
          color: 'Black',
          permalink: '/dresses/flash',
        },
        {
          id: 2,
          name: 'Dress 2',
          images: [{ url: 'http://via.placeholder.com/250x400' }],
          originalPrice: '$299',
          currentPrice: '$179',
          size: '8 US',
          color: 'Black',
          permalink: '/dresses/flash',
        },
        {
          id: 3,
          name: 'Dress 3',
          images: [{ url: 'http://via.placeholder.com/250x400' }],
          originalPrice: '$299',
          currentPrice: '$179',
          size: '8 US',
          color: 'Black',
          permalink: '/dresses/flash',
        },
        {
          id: 4,
          name: 'Dress 4',
          images: [{ url: 'http://via.placeholder.com/250x400' }],
          originalPrice: '$299',
          currentPrice: '$179',
          size: '8 US',
          color: 'Black',
          permalink: '/dresses/flash',
        },
        {
          id: 5,
          name: 'Dress 5',
          images: [{ url: 'http://via.placeholder.com/250x400' }],
          originalPrice: '$299',
          currentPrice: '$179',
          size: '8 US',
          color: 'Black',
          permalink: '/dresses/flash',
        },
        {
          id: 6,
          name: 'Dress 6',
          images: [{ url: 'http://via.placeholder.com/250x400' }],
          originalPrice: '$299',
          currentPrice: '$179',
          size: '8 US',
          color: 'Black',
          permalink: '/dresses/flash',
        },
      ],
    };
  }

  render() {
    const {
      dresses,
    } = this.state;

    return (
      <div className="FlashSaleProductGrid__wrapper grid-12">
        { dresses.map(dress => (
          <div
            key={dress.id}
            className="FlashSaleProduct__container col-4"
          >
            <div className="FlashSaleProduct__image">
              <a href={dress.permalink}>
                <img src={dress.images[0].url} alt={dress.name} />
              </a>
            </div>
            <div className="FlashSaleProduct__info grid-12">
              <div className="col-9">
                <a href={dress.permalink}>
                  {dress.name}
                </a>
              </div>
              <div className="col-3 FlashSaleProduct__original-price">
                {dress.originalPrice}
              </div>
              <div className="col-9">
                {dress.color}, {dress.size}
              </div>
              <div className="col-3 FlashSaleProduct__current-price">
                {dress.currentPrice}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default FlashSaleProductGrid;
