import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as ModalActions from '../../actions/ModalActions';

// Breakpoint Decoration
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

// UI
import ButtonLedge from '../generic/ButtonLedge';
import FlashAddToCartButton from './FlashAddToCartButton';

// CSS
import '../../../css/components/FlashAddToCartButtonLedgeMobile.scss';

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

class AddToCartButtonLedgeMobile extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const { breakpoint } = this.props;

    return (breakpoint === 'tablet' || breakpoint === 'mobile')
    ? (
      <div className="AddToCartButtonLedgeMobile">
        <ButtonLedge
          rightNode={(<FlashAddToCartButton />)}
        />
      </div>
    ) : null;
  }
}

AddToCartButtonLedgeMobile.propTypes = {
  // Decorator Props
  breakpoint: PropTypes.string.isRequired,
};

AddToCartButtonLedgeMobile.defaultProps = {
  selectedDressSize: null,
  selectedHeightValue: null,
};

// eslint-disable-next-line
export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(AddToCartButtonLedgeMobile));
