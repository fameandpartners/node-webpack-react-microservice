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

    // PRODUCT
    deliveryCopy: state.$$productState.get('deliveryCopy'),
    expressMakingStatus: state.$$customizationState.get('expressMakingSelected'),

    // SELECTIONS
    selectedDressSize: state.$$customizationState.get('selectedDressSize'),
    selectedHeightValue: state.$$customizationState.get('selectedHeightValue'),
    selectedMeasurementMetric: state.$$customizationState.get('selectedMeasurementMetric'),
    selectedStyleCustomizations: state.$$customizationState.get('selectedStyleCustomizations').toJS(),
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

  generateDeliveryCopy() {
    const { deliveryCopy, expressMakingSelected } = this.props;
    return expressMakingSelected ? '4-6 business days' : deliveryCopy;
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
    const { deliveryCopy, selectedStyleCustomizations } = this.props;
    return (
      <div className="BDAddToCartButtonLedge">
        <ButtonLedge
          addHeight
          leftText={this.generateSizingButtonText()}
          rightNode={(<AddToCartButton />)}
          handleLeftButtonClick={this.leftNodeSizeClick()}
        />
        <p className="u-mb-small">
          {
            selectedStyleCustomizations.length === 0
            ? 'Shipping and returns are free.'
            : 'Shipping is free on your customized item.'
          }&nbsp;
          <a
            className="link link--static"
            href="/faqs#collapse-returns-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
          Learn&nbsp;more
          </a>&nbsp;
          {
            deliveryCopy
            ? `Estimated delivery ${this.generateDeliveryCopy()}.`
            : null
          }
          <br />
        </p>
      </div>
    );
  }
}

BDAddToCartButtonLedge.propTypes = {
  // Decorator Props
  // breakpoint: PropTypes.string.isRequired,
  // Redux Props
  auSite: PropTypes.bool.isRequired,
  deliveryCopy: PropTypes.string,
  expressMakingSelected: PropTypes.bool,
  selectedDressSize: PropTypes.number,
  selectedHeightValue: PropTypes.number,
  selectedMeasurementMetric: PropTypes.string.isRequired,
  selectedStyleCustomizations: PropTypes.arrayOf(PropTypes.number).isRequired,
  isActive: PropTypes.bool.isRequired,
  // Redux Actions
  activateModal: PropTypes.func.isRequired,
};

BDAddToCartButtonLedge.defaultProps = {
  deliveryCopy: '',
  expressMakingSelected: false,
  selectedDressSize: null,
  selectedHeightValue: null,
};

// eslint-disable-next-line
export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(BDAddToCartButtonLedge));
