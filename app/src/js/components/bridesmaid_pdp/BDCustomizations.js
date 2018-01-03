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
import BDProductCustomization from '../bridesmaid_pdp/BDProductCustomization';
import BDCustomizationSelections from '../bridesmaid_pdp/BDCustomizationSelections';

function stateToProps(state) {
  return {
    productCustomizationDrawer: state.$$customizationState.get('productCustomizationDrawer'),
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

class BDProductCustomizationColor extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const {
      hasNavItems,
      productCustomizationDrawer,
    } = this.props;

    return (
      <BDProductCustomization
        hasNavItems={hasNavItems}
        handleDrawerSelection={this.handleDrawerSelection}
        productCustomizationDrawer={productCustomizationDrawer}
      >
        <BDCustomizationSelections />
      </BDProductCustomization>
    );
  }
}

BDProductCustomizationColor.propTypes = {
  // Normal Props
  hasNavItems: PropTypes.bool,
  // Redux Props
  productCustomizationDrawer: PropTypes.string,
};

BDProductCustomizationColor.defaultProps = {
  hasNavItems: true,
  productCustomizationDrawer: null,
  productSecondaryColorsCentsPrice: 0,
  temporaryColorId: '',
  setExpressMakingStatus: noop,
};


export default connect(stateToProps, dispatchToProps)(BDProductCustomizationColor);
