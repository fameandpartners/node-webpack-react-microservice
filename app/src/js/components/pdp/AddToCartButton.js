import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { find } from 'lodash';

// Utilities
import { accumulateCustomizationSelections, calculateSubTotal } from '../../utilities/pdp';

// Breakpoint Decoration
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

// Actions
import * as CartActions from '../../actions/CartActions';
import * as CustomizationActions from '../../actions/CustomizationActions';

// UI
import Button from '../generic/Button';

// Constants
import CustomizationConstants from '../../constants/CustomizationConstants';

// temp. helpers (for Rails merge)
import { addToCart } from '../../utilities/cart-helper';

function stateToProps(state) {
  const selectedStyleCustomizations = state.$$customizationState.get('selectedStyleCustomizations').toJS();
  const addonOptions = state.$$customizationState.get('addons').get('addonOptions').toJS();

  return {
    $$productState: state.$$productState,
    $$customizationState: state.$$customizationState,
    productCentsBasePrice: state.$$productState.get('productCentsBasePrice'),
    selectedAddonOptions: addonOptions.filter(a => selectedStyleCustomizations.indexOf(a.id) > -1),
    heightValue: state.$$customizationState.get('temporaryHeightValue'),
    sizeValue: state.$$customizationState.get('selectedDressSize'),
    productSecondaryColors: state.$$productState.get('productSecondaryColors').toJS(),
    productSecondaryColorsCentsPrice: state.$$productState.get('productSecondaryColorsCentsPrice'),
    selectedColor: state.$$customizationState.get('selectedColor').toJS(),
  };
}

function dispatchToProps(dispatch) {
  const { activateCartDrawer, addItemToCart } = bindActionCreators(CartActions, dispatch);
  const { activateCustomizationDrawer } = bindActionCreators(CustomizationActions, dispatch);
  return { activateCartDrawer, activateCustomizationDrawer, addItemToCart };
}


class AddToCartButton extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  subTotal() {
    const {
      productCentsBasePrice,
      selectedAddonOptions,
      productSecondaryColors,
      productSecondaryColorsCentsPrice,
      selectedColor,
    } = this.props;

    const hasSelectedSecondaryColor = find(productSecondaryColors, selectedColor);
    const colorCentsTotal = hasSelectedSecondaryColor ? productSecondaryColorsCentsPrice : 0;

    return calculateSubTotal({ productCentsBasePrice, colorCentsTotal, selectedAddonOptions });
  }

  /**
   * Handles adding item to cart
   */
  handleAddToBag() {
    const {
      // addItemToCart,
      $$customizationState,
      $$productState,
      heightValue,
      sizeValue,
    } = this.props;
    if (!heightValue || !sizeValue) {
      this.props.activateCustomizationDrawer({
        productCustomizationDrawer: CustomizationConstants.SIZE_CUSTOMIZE,
        heightError: !heightValue,
        sizeError: !sizeValue,
      });
    } else {
      const lineItem = accumulateCustomizationSelections({ $$customizationState, $$productState });
      addToCart(lineItem);
    }
  }

  generateText() {
    if (this.props.showTotal) {
      return `${this.subTotal()} - Add to Bag`;
    }

    return 'Add to Bag';
  }

  render() {
    return (
      <Button
        tall
        uppercase
        className="AddToCartButton"
        text={this.generateText()}
        handleClick={this.handleAddToBag}
      />
    );
  }
}

/*  eslint-disable react/forbid-prop-types */
AddToCartButton.propTypes = {
  // Passed Props
  showTotal: PropTypes.bool,
  // Redux Props
  $$productState: PropTypes.object.isRequired,
  $$customizationState: PropTypes.object.isRequired,
  productCentsBasePrice: PropTypes.number.isRequired,
  selectedAddonOptions: PropTypes.array,
  productSecondaryColors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      presentation: PropTypes.string,
      hexValue: PropTypes.string,
      patternUrl: PropTypes.string,
    }),
  ),
  productSecondaryColorsCentsPrice: PropTypes.number,
  selectedColor: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    presentation: PropTypes.string,
    hexValue: PropTypes.string,
    patternUrl: PropTypes.string,
  }).isRequired,
  // Redux Actions
  // addItemToCart: PropTypes.func.isRequired,
  activateCustomizationDrawer: PropTypes.func.isRequired,
  heightValue: PropTypes.string,
  sizeValue: PropTypes.string,
};

AddToCartButton.defaultProps = {
  productSecondaryColors: [],
  productSecondaryColorsCentsPrice: 0,
  selectedAddonOptions: [],
  showTotal: true,
  sizeValue: null,
  heightValue: null,
};

export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(AddToCartButton));
