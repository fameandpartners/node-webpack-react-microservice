import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { find } from 'lodash';

function stateToProps(state) {
  return {
    selectedColorId: state.$$customizationState.get('selectedColor').get('id'),
    productImages: state.$$productState.get('productImages').toJS(),
  };
}

class ProductGrid extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  /**
   * Splits the product images based on color and even/oddness
   * @param  {Number} remainder - even or odd number
   * @return {Array} productImages
   */
  splitProductImages(remainder) {
    const { selectedColorId, productImages } = this.props;
    const colorMatch = find(productImages, { colorId: selectedColorId });

    return productImages
      .filter(img => (colorMatch ? img.colorId === selectedColorId : true))
      .filter((img, i) => i % 2 === remainder)
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
  selectedColorId: PropTypes.number.isRequired,
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
