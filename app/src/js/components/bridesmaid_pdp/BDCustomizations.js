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
// import BDCustomizationSelections from '../bridesmaid_pdp/BDCustomizationSelections';

// Inner Child Contents
// import BridesmaidsColorSelect from '../../components/bridesmaids/BridesmaidsColorSelect';
import BDCustomizationSilhouetteSelect from './BDCustomizationSilhouetteSelect';
import BDCustomizationDetailsSelect from './BDCustomizationDetailsSelect';
// import BridesmaidsLengthSelect from '../../components/bridesmaids/BridesmaidsLengthSelect';
// import BridesmaidsTopDetailSelect from '../../components/bridesmaids/BridesmaidsTopDetailSelect';

// Constants
import {
  COLOR_CUSTOMIZE,
  LENGTH_CUSTOMIZE,
  BODICE_CUSTOMIZE,
  STRAPS_SLEEVES_CUSTOMIZE,
  SILHOUTTE_CUSTOMIZE,
  DETAILS_CUSTOMIZE,
} from '../../constants/BDCustomizationConstants';


function stateToProps(state) {
  return {
    activeBDCustomizationHeading: state.$$bdCustomizationState.get('activeBDCustomizationHeading'),
    bdProductCustomizationDrawer: state.$$bdCustomizationState.get('bdProductCustomizationDrawer'),
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

  generateColorCustomizeOptions() {

  }

  generateCustomizationOptions() {
    const { bdProductCustomizationDrawer } = this.props;
    switch (bdProductCustomizationDrawer) {
      case COLOR_CUSTOMIZE:
      case LENGTH_CUSTOMIZE:
      case BODICE_CUSTOMIZE:
      case STRAPS_SLEEVES_CUSTOMIZE:
      case SILHOUTTE_CUSTOMIZE:
        return (
          <BDCustomizationSilhouetteSelect />
        );
      case DETAILS_CUSTOMIZE:
        return (
          <BDCustomizationDetailsSelect />
        );
      default:
        return null;
    }
  }

  render() {
    const {
      bdProductCustomizationDrawer,
      hasNavItems,
    } = this.props;

    return (
      <BDProductCustomization
        hasNavItems={hasNavItems}
        handleDrawerSelection={this.handleDrawerSelection}
        activeHeading={bdProductCustomizationDrawer}
        onCustomizationHeadingGroupClick={this.handleHeadingClick}
      >
        {this.generateCustomizationOptions()}
      </BDProductCustomization>
    );
  }
}

BDProductCustomizationColor.propTypes = {
  // Normal Props
  hasNavItems: PropTypes.bool,
  // Redux Props
  bdProductCustomizationDrawer: PropTypes.string,
  // Redux Funcs
  setBDCustomizationSection: PropTypes.func.isRequired,
};

BDProductCustomizationColor.defaultProps = {
  activeBDCustomizationHeading: null,
  hasNavItems: true,
  bdProductCustomizationDrawer: null,
  productSecondaryColorsCentsPrice: 0,
  temporaryColorId: '',
  setExpressMakingStatus: noop,
};


export default connect(stateToProps, dispatchToProps)(BDProductCustomizationColor);
