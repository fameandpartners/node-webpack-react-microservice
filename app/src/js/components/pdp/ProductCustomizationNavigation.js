import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
// import { TransitionMotion } from 'react-motion';
import classnames from 'classnames';

// Actions
// import ProductActions from '../../actions/ProductActions';

// Constants
import { COLOR_CUSTOMIZE, STYLE_CUSTOMIZE } from '../../constants/ProductConstants';

// CSS
import '../../../css/components/ProductCustomizationNavigation.scss';

class ProductCustomizationNavigation extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  // handleColorSelection(color) {
  //   const { activateColorDrawer, selectProductColor } = this.props;
  //   selectProductColor({ color });
  //   activateColorDrawer({ isActive: false });
  // }
  //
  // willEnter() {
  //   return modalAnimations.SLIDE_OVER_WILL_ENTER;
  // }
  //
  // willLeave() {
  //   return modalAnimations.SLIDE_OVER_WILL_LEAVE;
  // }
  //
  handleDrawerSelection(drawerName) {
    return () => {
      this.props.handleDrawerSelection(drawerName);
    };
  }

  render() {
    const { productCustomizationDrawer } = this.props;

    // <TransitionMotion
    // styles={productCustomizationDrawerOpen ? [modalAnimations.SLIDE_OVER_DEFAULT_STYLES] : []}
    // willEnter={this.willEnter}
    // willLeave={this.willLeave}
    // >
    return (
      <div className="ProductCustomizationNavigation__nav">
        <div className="grid-middle height--full position--absolute">
          <ul className="ProductCustomizationNavigation__nav-list">
            <li
              onClick={this.handleDrawerSelection(COLOR_CUSTOMIZE)}
              className={classnames(
                'ProductCustomizationNavigation__nav-item u-cursor--pointer',
                { 'ProductCustomizationNavigation__nav-item--active': productCustomizationDrawer === COLOR_CUSTOMIZE },
              )}
            >
              <span>Color</span>
            </li>
            <li
              onClick={this.handleDrawerSelection(STYLE_CUSTOMIZE)}
              className={classnames(
                'ProductCustomizationNavigation__nav-item u-cursor--pointer',
                { 'ProductCustomizationNavigation__nav-item--active': productCustomizationDrawer === STYLE_CUSTOMIZE },
              )}
            >
              <span>Style</span>
            </li>
          </ul>
        </div>
      </div>
    );
    // </TransitionMotion>
  }
}

ProductCustomizationNavigation.propTypes = {
  productCustomizationDrawer: PropTypes.string.isRequired,
  handleDrawerSelection: PropTypes.func.isRequired,
};

ProductCustomizationNavigation.defaultProps = {};


export default ProductCustomizationNavigation;
