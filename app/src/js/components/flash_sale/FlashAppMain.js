import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Decorators
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

// Actions
import * as AppActions from '../../actions/AppActions';
import * as ModalActions from '../../actions/ModalActions';

// Constants
import ModalConstants from '../../constants/ModalConstants';

// PDP specific UI Components
// import AddToCartButtonLedgeMobile from '../pdp/AddToCartButtonLedgeMobile';
import FlashProductOptions from './FlashProductOptions';
import FlashProductGrid from './FlashProductGrid';
// import ProductFabricInfo from './ProductFabricInfo';

// import FameDifference from './FameDifference';

// CSS
import '../../../css/components/FlashAppMain.scss';

function stateToProps() {
  // Which part of the Redux global state does our component want to receive as props?
  return {};
}

function dispatchToProps(dispatch) {
  const actions = bindActionCreators(AppActions, dispatch);
  const modalActions = bindActionCreators(ModalActions, dispatch);

  return {
    activateSideMenu: actions.activateSideMenu,
    activateModal: modalActions.activateModal,
  };
}

class FlashAppMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    autoBind(this);
  }

  handleActivateModal() {
    this.props.activateModal({ modalId: ModalConstants.SIGN_UP_MODAL });
  }

  render() {
    const { breakpoint } = this.props;

    return (
      <div className="FlashAppMain__wrapper">
        <div className="FlashAppMain u-height--full">

          { breakpoint === 'mobile' || breakpoint === 'tablet'
            ? <div>FlashPRoductDisplayOptionsTouch</div>
            : (
              <div>
                <FlashProductOptions />
              </div>
            )
          }

          {
           breakpoint === 'mobile' || breakpoint === 'tablet'
            ? null
            : (
              <div className="u-gray-border--top u-mb-normal">
                <FlashProductGrid />
              </div>
            )
          }
        </div>


        <div className="u-position--fixed u-width--full u-bottom">
          {
            // <AddToCartButtonLedgeMobile />
          }
        </div>
      </div>
    );
  }
}

FlashAppMain.propTypes = {
  // Redux Props
  activateModal: PropTypes.func.isRequired,

  // Decorator Props
  breakpoint: PropTypes.string.isRequired,
};

FlashAppMain.defaultProps = {
  cartDrawerOpen: false,
  sku: null,
};

export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(FlashAppMain));
