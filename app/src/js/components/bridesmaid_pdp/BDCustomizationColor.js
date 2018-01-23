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
import BDColorSelections from '../bridesmaid_pdp/BDColorSelections';
import BDProductCustomization from '../bridesmaid_pdp/BDProductCustomization';

function stateToProps(state) {
  return {
    productDefaultColors: state.$$productState.get('productDefaultColors').toJS(),
    bdProductCustomizationDrawer: state.$$customizationState.get('bdProductCustomizationDrawer'),
    temporaryBDCustomizationColor: state.$$bdCustomizationState.get('temporaryBDCustomizationColor'),
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
      hasNavItems,
      bdProductCustomizationDrawer,
      productDefaultColors,
      temporaryBDCustomizationColor,
    } = this.props;

    return (
      <BDProductCustomization
        hasNavItems={hasNavItems}
        handleDrawerSelection={this.handleDrawerSelection}
        activeHeading={bdProductCustomizationDrawer}
      >
        <BDColorSelections
          productColors={productDefaultColors}
          selectedColor={temporaryBDCustomizationColor}
          handleColorSelection={this.handleColorSelection}
        />
      </BDProductCustomization>
    );
  }
}

BDProductCustomizationColor.propTypes = {
  // Normal Props
  hasNavItems: PropTypes.bool,
  // Redux Props
  bdProductCustomizationDrawer: PropTypes.string,
  productDefaultColors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    hexValue: PropTypes.string,
    patternUrl: PropTypes.string,
  })).isRequired,
  temporaryBDCustomizationColor: PropTypes.string,
  // Redux Actions
  activateModal: PropTypes.func.isRequired,
  changeCustomizationDrawer: PropTypes.func.isRequired,
  selectProductColor: PropTypes.func.isRequired,
  setExpressMakingStatus: PropTypes.func,
};

BDProductCustomizationColor.defaultProps = {
  hasNavItems: true,
  bdProductCustomizationDrawer: null,
  temporaryBDCustomizationColor: '',
  setExpressMakingStatus: noop,
};


export default connect(stateToProps, dispatchToProps)(BDProductCustomizationColor);
