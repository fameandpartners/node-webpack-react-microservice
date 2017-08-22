import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import ModalActions from '../../actions/ModalActions';
import CustomizationActions from '../../actions/CustomizationActions';

// UI Components
import ColorSwatches from './ColorSwatches';
import ProductCustomization from './ProductCustomization';

function mapStateToProps(state) {
  return {
    productDefaultColors: state.$$productState.get('productDefaultColors').toJS(),
    productSecondaryColors: state.$$productState.get('productSecondaryColors').toJS(),
    productSecondaryColorCentsPrice: state.$$productState.get('productSecondaryColorCentsPrice'),
    productCustomizationDrawer: state.$$customizationState.get('productCustomizationDrawer'),
    productCustomizationDrawerOpen: state.$$customizationState.get('productCustomizationDrawerOpen'),
    temporaryColorId: state.$$customizationState.get('temporaryColor').get('id'),
  };
}

function mapDispatchToProps(dispatch) {
  const { activateModal } = bindActionCreators(ModalActions, dispatch);
  const {
    changeCustomizationDrawer,
    selectProductColor,
  } = bindActionCreators(CustomizationActions, dispatch);

  return {
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

  handleDrawerSelection(drawerSelected) {
    const { changeCustomizationDrawer } = this.props;
    changeCustomizationDrawer({ productCustomizationDrawer: drawerSelected });
  }

  handleColorSelection(temporaryColor) {
    const {
      productCustomizationDrawerOpen,
      selectProductColor,
    } = this.props;

    if (productCustomizationDrawerOpen) {
      selectProductColor({ temporaryColor });
    }
  }

  render() {
    const {
      hasNavItems,
      productCustomizationDrawer,
      productDefaultColors,
      productSecondaryColors,
      productSecondaryColorCentsPrice,
      temporaryColorId,
    } = this.props;

    return (
      <ProductCustomization
        hasNavItems={hasNavItems}
        handleDrawerSelection={this.handleDrawerSelection}
        productCustomizationDrawer={productCustomizationDrawer}
      >
        <ColorSwatches
          productDefaultColors={productDefaultColors}
          productSecondaryColors={productSecondaryColors}
          productSecondaryColorCentsPrice={productSecondaryColorCentsPrice}
          temporaryColorId={temporaryColorId}
          handleColorSelection={this.handleColorSelection}
        />
      </ProductCustomization>
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
  temporaryColorId: PropTypes.string,
  // Redux Actions
  changeCustomizationDrawer: PropTypes.func.isRequired,
  selectProductColor: PropTypes.func.isRequired,
};

ProductCustomizationColor.defaultProps = {
  hasNavItems: true,
  temporaryColorId: '',
};


export default connect(mapStateToProps, mapDispatchToProps)(ProductCustomizationColor);
