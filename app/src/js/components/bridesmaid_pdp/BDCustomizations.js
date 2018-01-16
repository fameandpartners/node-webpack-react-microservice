import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import noop from '../../libs/noop';

// Actions
import BDActions from '../../actions/BDActions';

// UI Components
import BDProductCustomization from '../bridesmaid_pdp/BDProductCustomization';
import BDCustomizationSelections from '../bridesmaid_pdp/BDCustomizationSelections';

function stateToProps(state) {
  return {
    productCustomizationDrawer: state.$$customizationState.get('productCustomizationDrawer'),
    activeBDCustomizationHeading: state.$$bdCustomizationState.get('activeBDCustomizationHeading'),
  };
}

function dispatchToProps(dispatch) {
  const {
    setBDCustomizationSection,
  } = bindActionCreators(BDActions, dispatch);

  return {
    setBDCustomizationSection,
  };
}

class BDProductCustomizationColor extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleHeadingClick(groupName) {
    this.props.setBDCustomizationSection({
      sectionId: groupName,
    });
  }

  render() {
    const {
      activeBDCustomizationHeading,
      hasNavItems,
      productCustomizationDrawer,
    } = this.props;

    return (
      <BDProductCustomization
        hasNavItems={hasNavItems}
        handleDrawerSelection={this.handleDrawerSelection}
        productCustomizationDrawer={productCustomizationDrawer}
        activeHeading={activeBDCustomizationHeading}
        onCustomizationHeadingGroupClick={this.handleHeadingClick}
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
  activeBDCustomizationHeading: PropTypes.string,
  productCustomizationDrawer: PropTypes.string,
  // Redux Funcs
  setBDCustomizationSection: PropTypes.func.isRequired,
};

BDProductCustomizationColor.defaultProps = {
  activeBDCustomizationHeading: null,
  hasNavItems: true,
  productCustomizationDrawer: null,
  productSecondaryColorsCentsPrice: 0,
  temporaryColorId: '',
  setExpressMakingStatus: noop,
};


export default connect(stateToProps, dispatchToProps)(BDProductCustomizationColor);
