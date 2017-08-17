import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { TransitionMotion } from 'react-motion';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';

// UI Components
import ColorSwatches from './ColorSwatches';
import ProductCustomizationNavigation from './ProductCustomizationNavigation';

// Actions
import ModalActions from '../../actions/ModalActions';
import ProductActions from '../../actions/ProductActions';

// Constants
import * as modalAnimations from '../../utilities/modal-animation';

// CSS
import '../../../css/components/ColorSelection.scss';

function mapStateToProps(state) {
  return {
    productCustomizationDrawer: state.$$productState.get('productCustomizationDrawer'),
    productCustomizationDrawerOpen: state.$$productState.get('productCustomizationDrawerOpen'),
    productDefaultColors: state.$$productState.get('productDefaultColors').toJS(),
    productSecondaryColors: state.$$productState.get('productSecondaryColors').toJS(),
    productSecondaryColorCentsPrice: state.$$productState.get('productSecondaryColorCentsPrice'),
    selectedColorId: state.$$productState.get('selectedColor').get('id'),
  };
}

function mapDispatchToProps(dispatch) {
  const { activateModal } = bindActionCreators(ModalActions, dispatch);
  const { activateColorDrawer, selectProductColor } = bindActionCreators(ProductActions, dispatch);
  return {
    activateColorDrawer,
    activateModal,
    selectProductColor,
  };
}

class ColorSelectionDrawer extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleDrawerSelection(drawerName) {
    console.log('this is the drawer I choose', drawerName);
  }

  handleColorSelection(color) {
    const {
      activateColorDrawer,
      productCustomizationDrawerOpen,
      selectProductColor,
    } = this.props;

    if (productCustomizationDrawerOpen) {
      selectProductColor({ color });
      activateColorDrawer({ isActive: false });
    }
  }

  willEnter() {
    return modalAnimations.SLIDE_OVER_WILL_ENTER;
  }

  willLeave() {
    return modalAnimations.SLIDE_OVER_WILL_LEAVE;
  }

  render() {
    const {
      productCustomizationDrawer,
      productCustomizationDrawerOpen,
      productDefaultColors,
      productSecondaryColors,
      productSecondaryColorCentsPrice,
      selectedColorId,
    } = this.props;

    return (
      <TransitionMotion
        styles={productCustomizationDrawerOpen ? [modalAnimations.SLIDE_OVER_DEFAULT_STYLES] : []}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {(items) => {
          if (items.length) {
            const { key, style } = items[0];
            return (
              <div
                key={key}
                className={classnames(
                  'ColorSelectionDrawer__wrapper u-flex--col height--full width--full',
                  { 'u-pointerEvents--none': !productCustomizationDrawerOpen },
                )}
                style={{
                  opacity: style.opacity,
                  transform: `translate3d(${style.x}%, 0, 0)`,
                }}
              >
                <div className="ColorSelectionDrawer__header">
                  <div className="grid-12">
                    <div className="col-3">
                      <ProductCustomizationNavigation
                        handleDrawerSelection={this.handleDrawerSelection}
                        productCustomizationDrawer={productCustomizationDrawer}
                      />
                    </div>
                  </div>
                </div>
                <div className="ColorSelectionDrawer u-overflow-y--scroll textAlign--center">
                  <div className="grid-center-noGutter">
                    <div className="ColorSelectionDrawer__content col-6">
                      <ColorSwatches
                        productDefaultColors={productDefaultColors}
                        productSecondaryColors={productSecondaryColors}
                        productSecondaryColorCentsPrice={productSecondaryColorCentsPrice}
                        selectedColorId={selectedColorId}
                        handleColorSelection={this.handleColorSelection}
                      />
                    </div>

                  </div>
                </div>
              </div>
            );
          }
          return null;
        }}
      </TransitionMotion>
    );
  }
}

ColorSelectionDrawer.propTypes = {
  // Redux Props
  productCustomizationDrawer: PropTypes.string.isRequired,
  productCustomizationDrawerOpen: PropTypes.bool.isRequired,
  productDefaultColors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    hexValue: PropTypes.string,
    patternUrl: PropTypes.string,
  })).isRequired,
  // Redux Props
  productSecondaryColorCentsPrice: PropTypes.number.isRequired,
  productSecondaryColors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    hexValue: PropTypes.string,
    patternUrl: PropTypes.string,
  })).isRequired,
  selectedColorId: PropTypes.string,
  // Redux Actions
  activateColorDrawer: PropTypes.func.isRequired,
  selectProductColor: PropTypes.func.isRequired,
};

ColorSelectionDrawer.defaultProps = {
  selectedColorId: '',
  activeModalId: null,
};


export default connect(mapStateToProps, mapDispatchToProps)(ColorSelectionDrawer);
