import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TransitionMotion } from 'react-motion';

// CSS
import '../../../css/components/ProductButtonLedge.scss';

// Utilities
import noop from '../../libs/noop';

// Actions
import * as ProductActions from '../../actions/ProductActions';

// Constants
import * as modalAnimations from '../../utilities/modal-animation';

// UI Components
import ButtonLedge from '../generic/ButtonLedge';

function stateToProps(state) {
  return {
    productCustomizationDrawerOpen: state.$$customizationState.get('productCustomizationDrawerOpen'),
  };
}

function dispatchToProps(dispatch) {
  const productActions = bindActionCreators(ProductActions, dispatch);
  return {
    activateCustomizationDrawer: productActions.activateCustomizationDrawer,
  };
}

class ProductButtonLedge extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  activateCustomizationDrawer() {

  }

  handleLeftButtonClick() {
    this.props.activateCustomizationDrawer({ isActive: false });
  }

  handleRightButtonClick() {
    if (this.props.rightNodeClick) {
      this.props.rightNodeClick();
    }
  }

  defaultStyles() {
    return modalAnimations.SLIDE_UP_DEFAULT_STYLES;
  }

  willEnter() {
    return modalAnimations.SLIDE_UP_WILL_ENTER;
  }

  willLeave() {
    return modalAnimations.SLIDE_UP_WILL_LEAVE;
  }

  render() {
    const { productCustomizationDrawerOpen } = this.props;
    return (
      <TransitionMotion
        styles={productCustomizationDrawerOpen ? [this.defaultStyles()] : []}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {
        (items) => {
          if (items.length) {
            const { key, style } = items[0];
            return (
              <div
                key={key}
                className="ProductButtonLedge width--full"
                style={{
                  transform: `translate3d(0, ${style.y}%, 0)`,
                }}
              >
                <ButtonLedge
                  handleLeftButtonClick={this.activateCustomizationDrawer}
                  handleRightButtonClick={this.activateCustomizationDrawer}
                />
              </div>
            );
          }
          return null;
        }
      }
      </TransitionMotion>
    );
  }
}

ProductButtonLedge.propTypes = {
  // Redux Props
  productCustomizationDrawerOpen: PropTypes.bool,
  rightNodeClick: PropTypes.func,
  // Redux Actions
  activateCustomizationDrawer: PropTypes.func.isRequired,
};

ProductButtonLedge.defaultProps = {
  productCustomizationDrawerOpen: false,
};

export default connect(stateToProps, dispatchToProps)(ProductButtonLedge);
