import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as ModalActions from '../../actions/ModalActions';

// Constants
import ModalConstants from '../../constants/ModalConstants';

// Breakpoint Decoration
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

// UI
import ButtonLedge from '../generic/ButtonLedge';
import AddToCartButton from './AddToCartButton';

// Utilities
import objnoop from '../../libs/objnoop';

function dispatchToProps(dispatch) {
  const modalActions = bindActionCreators(ModalActions, dispatch);
  return { activateModal: modalActions.activateModal };
}

class AddToCartButtonLedgeMobile extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleSizeClick() {
    this.props.activateModal({ modalId: ModalConstants.SIZE_SELECTION_MODAL });
  }

  render() {
    const { breakpoint } = this.props;
    return (breakpoint === 'tablet' || breakpoint === 'mobile')
    ? (
      <div className="AddToCartButtonLedgeMobile">
        <ButtonLedge
          leftText="Your Size"
          rightNode={(<AddToCartButton />)}
          handleLeftButtonClick={this.handleSizeClick}
          handleRightButtonClick={this.handleAddToBag}
        />
      </div>
    ) : null;
  }
}

/*  eslint-disable react/forbid-prop-types */
AddToCartButtonLedgeMobile.propTypes = {
  // Decorator Props
  breakpoint: PropTypes.string.isRequired,
  // Redux Actions
  activateModal: PropTypes.func.isRequired,
};

AddToCartButtonLedgeMobile.defaultProps = {
  selectedAddonOptions: [],
};

// eslint-disable-next-line
export default Resize(PDPBreakpoints)(connect(objnoop, dispatchToProps)(AddToCartButtonLedgeMobile));
