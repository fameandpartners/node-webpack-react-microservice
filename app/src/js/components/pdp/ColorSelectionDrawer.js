import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { TransitionMotion } from 'react-motion';
import { connect } from 'react-redux';
import classnames from 'classnames';

// UI Components
import ProductCustomizationColor from './ProductCustomizationColor';

// Constants
import * as modalAnimations from '../../utilities/modal-animation';

// CSS
import '../../../css/components/ColorSelection.scss';

function mapStateToProps(state) {
  return {
    productCustomizationDrawerOpen: state.$$productState.get('productCustomizationDrawerOpen'),
    selectedColorId: state.$$productState.get('selectedColor').get('id'),
  };
}

class ColorSelectionDrawer extends PureComponent {
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
                  'ColorSelectionDrawer__wrapper height--full width--full',
                  { 'u-pointerEvents--none': !productCustomizationDrawerOpen },
                )}
                style={{
                  opacity: style.opacity,
                  transform: `translate3d(${style.x}%, 0, 0)`,
                }}
              >
                <ProductCustomizationColor />
              </div>
            );
          }
          return null;
        }}
      </TransitionMotion>
    );
  }
}

ColorSelectionDrawer.propTypes = {
  // Redux Props
  productCustomizationDrawerOpen: PropTypes.bool.isRequired,
};

ColorSelectionDrawer.defaultProps = {
  selectedColorId: '',
  activeModalId: null,
};


export default connect(mapStateToProps)(ColorSelectionDrawer);
