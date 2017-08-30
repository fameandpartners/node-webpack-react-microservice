import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';

// Constants
import { NAVIGATION_CONTAINERS } from '../../../constants/AppConstants';

// Components
import ShopAllNavigation from './ShopAllNavigation';
import WhoWeAreNavigation from './WhoWeAreNavigation';

// CSS
import '../../../../css/components/HeaderNavigation.scss';

class HeaderNavigation extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }


  generateHeaderNavigationContents() {
    const { openNavItem } = this.props;
    switch (openNavItem) {
      case NAVIGATION_CONTAINERS.SHOP_ALL:
        return (
          <ShopAllNavigation
            childRef={el => this.childElement = el}
          />
        );
      case NAVIGATION_CONTAINERS.WHO_WE_ARE:
        return (
          <WhoWeAreNavigation
            childRef={el => this.childElement = el}
          />
        );
      default:
        return null;
    }
  }

  setToChildHeight() {
    if (this.childElement) {
      this.containerHeight = `${this.childElement.clientHeight}px`;
    }
  }

  componentDidMount() {
    this.setToChildHeight();
    this.forceUpdate();
  }

  componentDidUpdate(lastProps) {
    if (lastProps.openNavItem !== this.props.openNavItem) {
      this.setToChildHeight();
      this.forceUpdate();
    }
  }

  render() {
    return (
      <div
        style={{ height: this.containerHeight }}
        className="HeaderNavigation u-width--full"
        ref={(c) => { this.container = c; }}
      >
        {this.generateHeaderNavigationContents()}
      </div>
    );
  }
}

HeaderNavigation.propTypes = {
  openNavItem: PropTypes.string,
};

HeaderNavigation.defaultProps = {
  openNavItem: null,
};

export default HeaderNavigation;
