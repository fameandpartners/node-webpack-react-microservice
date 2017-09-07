/* eslint-disable */
import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { find } from 'lodash';

// Actions
import ModalActions from '../../actions/ModalActions';

// Constants
import ModalConstants from '../../constants/ModalConstants';

function stateToProps(state) {
  return {
    selectedColorId: state.$$customizationState.get('selectedColor').get('id'),
    $$productImages: state.$$productState.get('productImages'),
  };
}

function dispatchToProps(dispatch) {
  const actions = bindActionCreators(ModalActions, dispatch);
  return { activateModal: actions.activateModal };
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
    const { selectedColorId, $$productImages } = this.props;
    const productImages = $$productImages.toJS();
    const colorMatch = find(productImages, { colorId: selectedColorId });
    const firstColorId = productImages[0].colorId;

    return productImages
      .filter(img => (colorMatch ? img.colorId === selectedColorId : img.colorId === firstColorId))
      .filter((img, i) => i % 2 === remainder)
      .map(img => (
        <div key={img.id} className="brick" onClick={this.showZoomModal}>
          <img className="u-width--full" alt="dress2" src={img.bigImg} />
        </div>
        ));
  }

  showZoomModal() {
    this.props.activateModal({
      modalId: ModalConstants.ZOOM_MODAL,
      shouldAppear: true,
    });
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
  $$productImages: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
    id: PropTypes.number,
    colorId: PropTypes.number,
    smallImg: PropTypes.string,
    bigImg: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    position: PropTypes.number,
  })).isRequired,
};

export default connect(stateToProps, dispatchToProps)(ProductGrid);
