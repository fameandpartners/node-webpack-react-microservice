import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TransitionMotion } from 'react-motion';

// CSS
import '../../../css/components/ProductButtonLedge.scss';

// Actions
import * as ProductActions from '../../actions/ProductActions';

// Constants
import * as modalAnimations from '../../utilities/modal-animation';

// UI Components
import ButtonLedge from '../generic/ButtonLedge';

function stateToProps(state) {
  return {
    productCustomizationDrawerOpen: state.$$productState.get('productCustomizationDrawerOpen'),
  };
}

function dispatchToProps(dispatch) {
  const productActions = bindActionCreators(ProductActions, dispatch);
  return {
    activateColorDrawer: productActions.activateColorDrawer,
  };
}

class ProductButtonLedge extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleCancelColorDrawer() {
    this.props.activateColorDrawer({ isActive: false });
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
                className="ProductButtonLedge"
                style={{
                  transform: `translate3d(0, ${style.y}%, 0)`,
                }}
              >
                <ButtonLedge
                  handleLeftButtonClick={this.handleCancelColorDrawer}
                  handleRightButtonClick={this.handleCancelColorDrawer}
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
  // Redux Actions
  activateColorDrawer: PropTypes.func.isRequired,
};

ProductButtonLedge.defaultProps = {
  productCustomizationDrawerOpen: false,
};

export default connect(stateToProps, dispatchToProps)(ProductButtonLedge);
