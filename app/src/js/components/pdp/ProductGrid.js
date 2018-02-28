/* eslint-disable */
import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { find } from 'lodash';

// Actions
import * as ModalActions from '../../actions/ModalActions';
import * as AppActions from '../../actions/AppActions';

// Constants
import ModalConstants from '../../constants/ModalConstants';

function stateToProps(state) {
  return {
    selectedColorId: state.$$customizationState.get('selectedColor').get('id'),
    $$productImages: state.$$productState.get('productImages'),
  };
}

function dispatchToProps(dispatch) {
  const modalActions = bindActionCreators(ModalActions, dispatch);
  const appActions = bindActionCreators(AppActions, dispatch);
  return {
    activateModal: modalActions.activateModal,
    setGallerySlideActiveIndex: appActions.setGallerySlideActiveIndex,
  };
}

class ProductGrid extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  doesImageHaveColorIdMatch({ img, id, colorMatch, firstColorId }) {
    const { hasFabrics } = this.props;
    if (colorMatch) {
      return hasFabrics
        ? img.fabricId === id
        : img.colorId === id;
    }
    return hasFabrics
        ? img.fabricId === firstColorId
        : img.colorId === firstColorId;
  }

  getProductImages() {
    const { selectedColorId: id, $$productImages } = this.props;
    const productImages = $$productImages.toJS();
    const colorMatch = find(productImages, { colorId: id });
    const firstColorId = productImages[0].colorId;

    return productImages
      .filter(img => (this.doesImageHaveColorIdMatch({img, id, colorMatch, firstColorId})))
      .filter((img, i) => i !== 0) // slice off first image
      .map((img, idx) => (
        <div className="col-6" key={img.id}>
          <div className="brick u-cursor--pointer" onClick={() => this.showImageLightboxModal(idx)}>
            <img className="u-width--full" alt={`Dress photo ${idx+1}`} src={img.bigImg} />
          </div>
        </div>
        ));
  }

  showImageLightboxModal(idx) {
    const { activateModal, setGallerySlideActiveIndex} = this.props;
    setGallerySlideActiveIndex({
      index: idx + 1,
    });
    activateModal({
      modalId: ModalConstants.ZOOM_MODAL,
      shouldAppear: true,
    });
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
  // Redux Actions
  setGallerySlideActiveIndex: PropTypes.func.isRequired,
};

export default connect(stateToProps, dispatchToProps)(ProductGrid);
