import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import WizardActions from '../../actions/WizardActions';

// Constants
import WizardConstants from '../../constants/WizardConstants';
import CustomizationConstants from '../../constants/CustomizationConstants';

// Breakpoint Decoration
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

// UI
import ButtonLedge from '../generic/ButtonLedge';
import AddToCartButton from './AddToCartButton';

// Utilities
import { sizingDisplayText } from '../../utilities/pdp';

function stateToProps(state) {
  return {
    // APP
    auSite: state.$$appState.get('siteVersion').toLowerCase() === 'australia',

    // SELECTIONS
    selectedDressSize: state.$$customizationState.get('selectedDressSize'),
    selectedHeightValue: state.$$customizationState.get('selectedHeightValue'),
    selectedMeasurementMetric: state.$$customizationState.get('selectedMeasurementMetric'),
    isActive: state.$$productState.get('isActive'),
  };
}

function dispatchToProps(dispatch) {
  const { jumpToStep } = bindActionCreators(WizardActions, dispatch);
  return {
    jumpToStep,
  };
}

class AddToCartButtonLedgeMobile extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleSizeClick() {
    this.props.jumpToStep({
      activeStepId: WizardConstants.SELECT_SIZE_PROFILE_STEP,
      shouldAppear: true,
    });
  }

  generateSizingButtonText() {
    const {
      auSite,
      selectedHeightValue,
      selectedMeasurementMetric,
      selectedDressSize,
    } = this.props;
    const sizingInformation = sizingDisplayText({
      selectedDressSize,
      selectedHeightValue,
      selectedMeasurementMetric,
      auSite,
    });
    if (sizingInformation) {
      return `${CustomizationConstants.SIZE_HEADLINE} - ${sizingInformation}`;
    }
    return CustomizationConstants.SIZE_HEADLINE;
  }

  leftNodeSizeClick() {
    if (this.props.isActive) {
      return this.handleSizeClick;
    }
    return null;
  }

  render() {
    const { breakpoint } = this.props;

    return (breakpoint === 'tablet' || breakpoint === 'mobile')
    ? (
      <div className="AddToCartButtonLedgeMobile">
        <ButtonLedge
          leftText={this.generateSizingButtonText()}
          rightNode={(<AddToCartButton />)}
          handleLeftButtonClick={this.leftNodeSizeClick()}
        />
      </div>
    ) : null;
  }
}

AddToCartButtonLedgeMobile.propTypes = {
  // Decorator Props
  breakpoint: PropTypes.string.isRequired,
  // Redux Props
  auSite: PropTypes.bool.isRequired,
  selectedDressSize: PropTypes.number,
  selectedHeightValue: PropTypes.number,
  selectedMeasurementMetric: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  // Redux Actions
  jumpToStep: PropTypes.func,
};

AddToCartButtonLedgeMobile.defaultProps = {
  jumpToStep: null,
  selectedDressSize: null,
  selectedHeightValue: null,
};

// eslint-disable-next-line
export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(AddToCartButtonLedgeMobile));
