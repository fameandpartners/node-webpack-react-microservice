import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as ModalActions from '../../actions/ModalActions';

// Constants
import ModalConstants from '../../constants/ModalConstants';
import CustomizationConstants from '../../constants/CustomizationConstants';

// Breakpoint Decoration
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

// UI
import ButtonLedge from '../generic/ButtonLedge';
import AddToCartButton from '../pdp/AddToCartButton';

// Utilities
import { sizingDisplayText } from '../../utilities/pdp';

// CSS
import '../../../css/components/BDAddToCartButtonLedge.scss';

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
  const modalActions = bindActionCreators(ModalActions, dispatch);
  return { activateModal: modalActions.activateModal };
}

class BDAddToCartButtonLedge extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleSizeClick() {
    this.props.activateModal({ modalId: ModalConstants.SIZE_SELECTION_MODAL });
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
    return (
      <div className="BDAddToCartButtonLedge">
        <ButtonLedge
          addHeight
          leftText={this.generateSizingButtonText()}
          rightNode={(<AddToCartButton />)}
          handleLeftButtonClick={this.leftNodeSizeClick()}
        />
      </div>
    );
  }
}

BDAddToCartButtonLedge.propTypes = {
  // Decorator Props
  // breakpoint: PropTypes.string.isRequired,
  // Redux Props
  auSite: PropTypes.bool.isRequired,
  selectedDressSize: PropTypes.number,
  selectedHeightValue: PropTypes.number,
  selectedMeasurementMetric: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  // Redux Actions
  activateModal: PropTypes.func.isRequired,
};

BDAddToCartButtonLedge.defaultProps = {
  selectedDressSize: null,
  selectedHeightValue: null,
};

// eslint-disable-next-line
export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(BDAddToCartButtonLedge));
