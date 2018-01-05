import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import Resize from '../../../decorators/Resize';
import PDPBreakpoints from '../../../libs/PDPBreakpoints';

// Polyfills
import win from '../../../polyfills/windowPolyfill';

// Assets
import fallWeddings from '../../../../img/fall-weddings.jpg';
import sampleSale from '../../../../img/SampleSale-ShopAllTile.jpg';
import '../../../../css/components/ShopAllNavigationDesktop.scss';

// Constants
import { NAVIGATION_LINKS } from '../../../constants/AppConstants';

// Components
import NavLinkCol from './NavLinkCol';


class ShopAllNavigationDesktop extends PureComponent {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      auSite: win.ApplicationStateData ? win.ApplicationStateData.auSite : false,
    };
  }

  render() {
    const {
      breakpoint,
      childRef,
    } = this.props;

    const {
      auSite,
    } = this.state;

    let headerAd;

    headerAd = (
      <div className="HeaderNavigationDesktop__ad">
        <a href="/dresses/wedding-guests">
          <img
            alt="Fall Weddings Ad"
            className="u-width--full"
            src={fallWeddings}
          />
        </a>
        <a href="/dresses/wedding-guests" className="link">
          <span>Shop Wedding Guests</span>
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
