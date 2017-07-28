import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';

// Actions
import ModalActions from '../../actions/ModalActions';
import ProductActions from '../../actions/ProductActions';

// UI Components
import ColorSwatches from './ColorSwatches';
import ProductCustomizationNavigation from './ProductCustomizationNavigation';

// CSS
// import '../../../css/components/ProductCustomizationColor.scss';

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
  const {
    activateColorDrawer,
    changeCustomizationDrawer,
    selectProductColor,
  } = bindActionCreators(ProductActions, dispatch);

  return {
    activateColorDrawer,
    activateModal,
    changeCustomizationDrawer,
    selectProductColor,
  };
}

class ProductCustomizationColor extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleDrawerSelection(productCustomizationDrawer) {
    this.props.changeCustomizationDrawer({ productCustomizationDrawer });
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

  render() {
    const {
      hasNavItems,
      productCustomizationDrawer,
      productDefaultColors,
      productSecondaryColors,
      productSecondaryColorCentsPrice,
      selectedColorId,
    } = this.props;

    return (
      <div className="ProductCustomizationColor height--full u-flex--col">
        <div className="ProductCustomizationColor__header">
          { hasNavItems
            ? (
              <div className="grid-12">
                <div className="col-3">
                  <ProductCustomizationNavigation
                    handleDrawerSelection={this.handleDrawerSelection}
                    productCustomizationDrawer={productCustomizationDrawer}
                  />
                </div>
              </div>
            )
            : null
          }
        </div>
        <div
          className={classnames(
            [
              'ProductCustomizationColor__wrapper',
              'height--full u-overflow-y--scroll textAlign--center',
            ],
        )}
        >

          <div className="grid-center-noGutter">
            <div
              className={classnames(
                'ProductCustomizationColor__content col-6',
              )}
            >
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
}

ProductCustomizationColor.propTypes = {
  // Normal Props
  hasNavItems: PropTypes.bool,
  // Redux Props
  productCustomizationDrawer: PropTypes.string.isRequired,
  productCustomizationDrawerOpen: PropTypes.bool.isRequired,
  productDefaultColors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    hexValue: PropTypes.string,
    patternUrl: PropTypes.string,
  })).isRequired,
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
  changeCustomizationDrawer: PropTypes.func.isRequired,
  selectProductColor: PropTypes.func.isRequired,
};

ProductCustomizationColor.defaultProps = {
  hasNavItems: true,
  selectedColorId: '',
};


export default connect(mapStateToProps, mapDispatchToProps)(ProductCustomizationColor);
