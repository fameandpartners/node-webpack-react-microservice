/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { find } from 'lodash';


function stateToProps(state) {
  const lineItem = state.$$flashSaleState.get('$$lineItem').toJS();
  return {
    lineItemImages: lineItem ? lineItem.images.slice(1) : [],
  };
}

class ProductGrid extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  getProductImages() {
    const { lineItemImages } = this.props;

    return lineItemImages
      .map((img, idx) => (
        <div className="col-6" key={img}>
          <div className="brick u-cursor--pointer">
            <img className="u-width--full" alt={`Dress photo ${idx+1}`} src={img.bigImg} />
          </div>
        </div>
      ));
  }


  render() {
    return (
      <div className="ProductGrid">
        <div className="App__photo-montage masonry grid-12">
          {this.getProductImages()}
        </div>
      </div>
    );
  }
}

ProductGrid.propTypes = {
  lineItemImages: PropTypes.arrayOf(PropTypes.string),
};

export default connect(stateToProps, null)(ProductGrid);
