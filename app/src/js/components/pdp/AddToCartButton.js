import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Utilities
import { accumulateCustomizationSelections, calculateSubTotal } from '../../utilities/pdp';

// Breakpoint Decoration
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

// Actions
import * as CartActions from '../../actions/CartActions';

// UI
import Button from '../generic/Button';

// CSS
// import '../../../css/components/AddToCartButton.scss';


function stateToProps(state) {
  const selectedColor = state.$$customizationState.get('selectedColor');
  const selectedStyleCustomizations = state.$$customizationState.get('selectedStyleCustomizations').toJS();
  const addonOptions = state.$$customizationState.get('addons').get('addonOptions').toJS();

  return {
    $$productState: state.$$productState,
    $$customizationState: state.$$customizationState,
    colorCentsTotal: selectedColor.get('centsTotal'),
    productCentsBasePrice: state.$$productState.get('productCentsBasePrice'),
    selectedAddonOptions: addonOptions.filter(a => selectedStyleCustomizations.indexOf(a.id) > -1),
  };
}

function dispatchToProps(dispatch) {
  const { activateCartDrawer, addItemToCart } = bindActionCreators(CartActions, dispatch);
  return { activateCartDrawer, addItemToCart };
}


class AddToCartButton extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  subTotal() {
    const { productCentsBasePrice, colorCentsTotal, selectedAddonOptions } = this.props;
    return calculateSubTotal({ productCentsBasePrice, colorCentsTotal, selectedAddonOptions });
  }

  /**
   * Handles adding item to cart
   */
  handleAddToBag() {
    const {
      addItemToCart,
      activateCartDrawer,
      $$customizationState,
      $$productState,
    } = this.props;
    const lineItem = accumulateCustomizationSelections({ $$customizationState, $$productState });
    addItemToCart({ lineItem });
    activateCartDrawer({ cartDrawerOpen: true });
  }

  render() {
    return (
      <Button
        tall
        className="AddToCartButton"
        text={`${this.subTotal()} - Add to Bag`}
        handleClick={this.handleAddToBag}
      />
    );
  }
}

/*  eslint-disable react/forbid-prop-types */
AddToCartButton.propTypes = {
  // Redux Props
  $$productState: PropTypes.object.isRequired,
  $$customizationState: PropTypes.object.isRequired,
  colorCentsTotal: PropTypes.number.isRequired,
  productCentsBasePrice: PropTypes.number.isRequired,
  selectedAddonOptions: PropTypes.array,
  // Redux Actions
  addItemToCart: PropTypes.func.isRequired,
  activateCartDrawer: PropTypes.func.isRequired,
};

AddToCartButton.defaultProps = {
  selectedAddonOptions: [],
};

export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(AddToCartButton));
