import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Utilities
import { calculateSubTotal, getSelectedColor } from '../../utilities/pdp';

// Breakpoint Decoration
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

// Actions
import * as CartActions from '../../actions/CartActions';

// UI
import ButtonLedge from '../generic/ButtonLedge';

// CSS
import '../../../css/components/AddToCartMobile.scss';


function stateToProps(state) {
  const selectedColor = state.$$customizationState.get('selectedColor');
  const selectedColorObj = getSelectedColor(selectedColor, state.$$productState);
  const selectedStyleCustomizations = state.$$customizationState.get('selectedStyleCustomizations').toJS();
  const addonOptions = state.$$customizationState.get('addons').get('addonOptions').toJS();

  return {
    colorCentsTotal: selectedColorObj.centsTotal,
    productCentsBasePrice: state.$$productState.get('productCentsBasePrice'),
    selectedAddonOptions: addonOptions.filter(a => selectedStyleCustomizations.indexOf(a.id) > -1),
  };
}

function dispatchToProps(dispatch) {
  const { addItemToCart } = bindActionCreators(CartActions, dispatch);
  return { addItemToCart };
}


class AddToCartMobile extends Component {
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
    const { addItemToCart } = this.props;
    const lineItem = this.accumulateItemSelections();
    addItemToCart({ lineItem });
  }

  render() {
    const { breakpoint } = this.props;
    return (breakpoint === 'tablet' || breakpoint === 'mobile')
    ? (
      <div className="AddToCartMobile u-position--fixed u-width--full">
        <ButtonLedge
          leftText="Your Size"
          rightText={`${this.subTotal()} - Add to Bag`}
          handleLeftButtonClick={() => {}}
          handleRightButtonClick={() => {}}
        />
      </div>
    ) : null;
  }
}

AddToCartMobile.propTypes = {
  // Decorator Props
  breakpoint: PropTypes.string.isRequired,
  // Redux Props
  colorCentsTotal: PropTypes.number.isRequired,
  productCentsBasePrice: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  selectedAddonOptions: PropTypes.array,
  // Redux Actions
  addItemToCart: PropTypes.func.isRequired,
};

AddToCartMobile.defaultProps = {
  selectedAddonOptions: [],
};

export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(AddToCartMobile));
