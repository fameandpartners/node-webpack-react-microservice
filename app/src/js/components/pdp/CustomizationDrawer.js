import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { TransitionMotion } from 'react-motion';
import { connect } from 'react-redux';
import classnames from 'classnames';

// CSS
import '../../../css/components/CustomizationDrawer.scss';

// UI Components
import ProductCustomizationColor from './ProductCustomizationColor';
import ProductCustomizationStyle from './ProductCustomizationStyle';
import ProductCustomizationSize from './ProductCustomizationSize';

// Constants
import * as modalAnimations from '../../utilities/modal-animation';
import { COLOR_CUSTOMIZE, STYLE_CUSTOMIZE, SIZE_CUSTOMIZE } from '../../constants/CustomizationConstants';

function mapStateToProps(state) {
  return {
    productCustomizationDrawer: state.$$customizationState.get('productCustomizationDrawer'),
    productCustomizationDrawerOpen: state.$$customizationState.get('productCustomizationDrawerOpen'),
    selectedColorId: state.$$customizationState.get('selectedColor').get('id'),
  };
}

class CustomizationDrawer extends PureComponent {
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
    const { productCustomizationDrawer } = this.props;
    switch (productCustomizationDrawer) {
      case COLOR_CUSTOMIZE:
        return <ProductCustomizationColor />;
      case STYLE_CUSTOMIZE:
        return <ProductCustomizationStyle />;
      case SIZE_CUSTOMIZE:
        return <ProductCustomizationSize />;
      default:
        return null;
    }
  }

  render() {
    const {
      productCustomizationDrawerOpen,
    } = this.props;

    return (
      <TransitionMotion
        styles={productCustomizationDrawerOpen ? [modalAnimations.SLIDE_OVER_DEFAULT_STYLES] : []}
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
                  'CustomizationDrawer__wrapper height--full width--full',
                  { 'u-pointerEvents--none': !productCustomizationDrawerOpen },
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

CustomizationDrawer.propTypes = {
  // Redux Props
  productCustomizationDrawer: PropTypes.string,
  productCustomizationDrawerOpen: PropTypes.bool.isRequired,
};

CustomizationDrawer.defaultProps = {
  productCustomizationDrawer: null,
  selectedColorId: '',
  activeModalId: null,
};


export default connect(mapStateToProps)(CustomizationDrawer);
