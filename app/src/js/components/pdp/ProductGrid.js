import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';

function stateToProps(state) {
  return {
    productImages: state.$$productState.get('productImages').toJS(),
  };
}

class ProductGrid extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  splitProductImages(mod) {
    const { productImages } = this.props;
    return productImages
      .filter((img, i) => i % 2 === mod)
      .map(img => (
        <div key={img.id} className="brick">
          <img className="u-width--full" alt="dress2" src={img.bigImg} />
        </div>
        ));
  }

  render() {
    return (
      <div className="ProductGrid">
        <div className="App__photo-montage masonry grid-12">
          <div className="col-6">
            {this.splitProductImages(0)}
          </div>
          <div className="col-6">
            {this.splitProductImages(1)}
          </div>
        </div>
      </div>
    );
  }
}

ProductGrid.propTypes = {
  productImages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    colorId: PropTypes.number,
    smallImg: PropTypes.string,
    bigImg: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    position: PropTypes.number,
  })).isRequired,
};

export default connect(stateToProps)(ProductGrid);
