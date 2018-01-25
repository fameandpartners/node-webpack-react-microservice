import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import Resize from '../../../decorators/Resize';
import PDPBreakpoints from '../../../libs/PDPBreakpoints';

// Assets
import fallWeddings from '../../../../img/ShopAll-Tile.jpg';
import '../../../../css/components/ShopAllNavigationDesktop.scss';

// Constants
import { NAVIGATION_LINKS } from '../../../constants/AppConstants';

// Components
import NavLinkCol from './NavLinkCol';


class ShopAllNavigationDesktop extends PureComponent {
  constructor(props) {
    super(props);
    autobind(this);
  }

  render() {
    const {
      breakpoint,
      childRef,
    } = this.props;

    const headerAd = (
      <div className="HeaderNavigationDesktop__ad">
        <a href="/coming-soon-custom-bridesmaid-dresses">
          <img
            alt="Custom Bridesmaid Dresses Ad"
            className="u-width--full"
            src={fallWeddings}
          />
        </a>
        <a href="/coming-soon-custom-bridesmaid-dresses" className="link">
          <span>Get 20&#37; Off CUSTOM BRIDESMAID DRESSES</span>
        </a>
      </div>
    );

    return (
      <div
        ref={childRef}
        className="ShopAllNavigationDesktop u-width--full layout-container"
      >
        <div className="grid-center">
          <div
            className="ShopAllNavigationDesktop__link-container u-center grid"
          >
            <NavLinkCol
              colTitle="Weddings"
              links={NAVIGATION_LINKS.WEDDINGS}
            />
            <NavLinkCol
              colTitle="Dresses"
              headerLink={NAVIGATION_LINKS.DRESSES_PATH}
              links={NAVIGATION_LINKS.DRESSES}
            />
            <NavLinkCol
              colTitle="Separates"
              links={NAVIGATION_LINKS.SEPARATES}
            />
            <NavLinkCol
              colTitle="Featured"
              links={NAVIGATION_LINKS.FEATURED}
            />
            <NavLinkCol
              colTitle="Collections"
              links={NAVIGATION_LINKS.COLLECTIONS}
            />
            { (breakpoint === 'mobile' || breakpoint === 'tablet' || breakpoint === 'desktop-sm') ? null :
              headerAd
            }
          </div>
        </div>
      </div>
    );
  }
}

ShopAllNavigationDesktop.propTypes = {
  breakpoint: PropTypes.string.isRequired,
  childRef: PropTypes.func.isRequired,
};

export default Resize(PDPBreakpoints)(ShopAllNavigationDesktop);
