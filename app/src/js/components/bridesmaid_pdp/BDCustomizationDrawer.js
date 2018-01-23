import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { TransitionMotion } from 'react-motion';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

// CSS
import '../../../css/components/BDCustomizationDrawer.scss';

// UI Components
import BDCustomizations from './BDCustomizations';
import ProductCustomizationColor from '../pdp/ProductCustomizationColor';
import ProductCustomizationStyle from '../pdp/ProductCustomizationStyle';
// import ProductCustomizationSize from '../pdp/ProductCustomizationSize';

// Constants
import * as modalAnimations from '../../utilities/modal-animation';
import { COLOR_CUSTOMIZE, LENGTH_CUSTOMIZE } from '../../constants/CustomizationConstants';

function stateToProps(state) {
  const selectedColor = state.$$bdCustomizationState.get('selectedColor');
  const selectedColorId = selectedColor ? selectedColor.get('id') : null;
  return {
    bdProductCustomizationDrawer: state.$$bdCustomizationState.get('bdProductCustomizationDrawer'),
    bdProductCustomizationDrawerOpen: state.$$bdCustomizationState.get('bdProductCustomizationDrawerOpen'),
    selectedColorId,
  };
}

class BDCustomizationDrawer extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  willEnter() {
    return modalAnimations.SLIDE_OVER_WILL_ENTER;
  }

  willLeave() {
    return modalAnimations.SLIDE_OVER_WILL_LEAVE;
  }

  renderCustomizationContents() {
    const { breakpoint, bdProductCustomizationDrawer } = this.props;
    const hasNavItems = breakpoint === 'desktop';

    switch (bdProductCustomizationDrawer) {
      case LENGTH_CUSTOMIZE:
        return (
          <ProductCustomizationStyle
            hasNavItems={hasNavItems}
          />
        );
      default:
        return (
          <BDCustomizations
            hasNavItems={false}
          />
        );
    }
  }

  render() {
    const {
      bdProductCustomizationDrawerOpen,
    } = this.props;

    return (
      <TransitionMotion
        styles={bdProductCustomizationDrawerOpen ? [modalAnimations.SLIDE_OVER_DEFAULT_STYLES] : []}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {(items) => {
          if (items.length) {
            const { key, style } = items[0];
            return (
              <div
                key={key}
                className={classnames(
                  'BDCustomizationDrawer__wrapper u-height--full u-width--full typography',
                  { 'u-pointerEvents--none': !bdProductCustomizationDrawerOpen },
                )}
                style={{
                  opacity: style.opacity,
                  transform: `translate3d(${style.x}%, 0, 0)`,
                }}
              >
                { this.renderCustomizationContents() }
              </div>
            );
          }
          return null;
        }}
      </TransitionMotion>
    );
  }
}

BDCustomizationDrawer.propTypes = {
  // Decorator Props
  breakpoint: PropTypes.string.isRequired,
  // Redux Props
  bdProductCustomizationDrawer: PropTypes.string,
  bdProductCustomizationDrawerOpen: PropTypes.bool,
};

BDCustomizationDrawer.defaultProps = {
  bdProductCustomizationDrawer: null,
  bdProductCustomizationDrawerOpen: false,
  selectedColorId: '',
  activeModalId: null,
};


export default Resize(PDPBreakpoints)(connect(stateToProps)(BDCustomizationDrawer));
