import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import noop from '../../libs/noop';

// Actions
import ModalActions from '../../actions/ModalActions';
import CustomizationActions from '../../actions/CustomizationActions';

// UI Components
import ColorSwatches from './ColorSwatches';
import ProductCustomization from './ProductCustomization';

function stateToProps(state) {
  const fabrics = state.$$productState.get('fabrics').toJS();
  return {
    fabrics,
    hasFabrics: fabrics && fabrics.length > 0,
    productDefaultColors: state.$$productState.get('productDefaultColors').toJS(),
    productSecondaryColors: state.$$productState.get('productSecondaryColors').toJS(),
    productSecondaryColorsCentsPrice: state.$$productState.get('productSecondaryColorsCentsPrice'),
    productCustomizationDrawer: state.$$customizationState.get('productCustomizationDrawer'),
    temporaryColorId: state.$$customizationState.get('temporaryColor').get('id'),
  };
}

function dispatchToProps(dispatch) {
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

  handleCloseModal() {
    this.props.activateModal({ shouldAppear: false });
  }

  handleColorSelection(temporaryColor) {
    const {
      selectProductColor,
      productDefaultColors,
      setExpressMakingStatus,
    } = this.props;
    if (!this.isExpressEligible(temporaryColor.id, productDefaultColors)) {
      setExpressMakingStatus(false);
    }
    selectProductColor({ temporaryColor });
  }

  isExpressEligible(colorId, defaultColors) {
    return defaultColors.filter(color => color.id === colorId).length > 0;
  }

  render() {
    const {
      hasFabrics,
      hasNavItems,
      productCustomizationDrawer,
      productDefaultColors,
      productSecondaryColors,
      productSecondaryColorsCentsPrice,
      temporaryColorId,
    } = this.props;

    return (
      <ProductCustomization
        hasNavItems={hasNavItems}
        handleDrawerSelection={this.handleDrawerSelection}
        productCustomizationDrawer={productCustomizationDrawer}
      >
        { hasFabrics
          ? (
            <div>Fabric Selection Modal</div>
          )
          : (
            <ColorSwatches
              productDefaultColors={productDefaultColors}
              productSecondaryColors={productSecondaryColors}
              productSecondaryColorsCentsPrice={productSecondaryColorsCentsPrice}
              temporaryColorId={temporaryColorId}
              handleColorSelection={this.handleColorSelection}
            />
          )
        }
      </ProductCustomization>
    );
  }
}

ProductCustomizationColor.propTypes = {
  // Normal Props
  hasFabrics: PropTypes.bool,
  hasNavItems: PropTypes.bool,
  // Redux Props
  productCustomizationDrawer: PropTypes.string,
  productDefaultColors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    hexValue: PropTypes.string,
    patternUrl: PropTypes.string,
  })).isRequired,
  productSecondaryColors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    hexValue: PropTypes.string,
    patternUrl: PropTypes.string,
  })).isRequired,
  productSecondaryColorsCentsPrice: PropTypes.number,
  temporaryColorId: PropTypes.number,
  // Redux Actions
  activateModal: PropTypes.func.isRequired,
  changeCustomizationDrawer: PropTypes.func.isRequired,
  selectProductColor: PropTypes.func.isRequired,
  setExpressMakingStatus: PropTypes.func,
};

ProductCustomizationColor.defaultProps = {
  hasFabrics: true,
  hasNavItems: true,
  productCustomizationDrawer: null,
  productSecondaryColorsCentsPrice: 0,
  temporaryColorId: '',
  setExpressMakingStatus: noop,
};


export default connect(stateToProps, dispatchToProps)(ProductCustomizationColor);
