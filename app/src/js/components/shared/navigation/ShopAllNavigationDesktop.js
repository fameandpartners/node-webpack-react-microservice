import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import Resize from '../../../decorators/Resize';
import PDPBreakpoints from '../../../libs/PDPBreakpoints';

// Assets
import sampleSale from '../../../../img/SampleSale-ShopAllTile.jpg';
import '../../../../css/components/ShopAllNavigationDesktop.scss';

// Constants
import { NAVIGATION_LINKS } from '../../../constants/AppConstants';

// Components
import NavLinkCol from './NavLinkCol';

class ShopAllNavigationDesktop extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const { breakpoint, childRef } = this.props;
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
            <div className="ShopAllNavigationDesktop__ad">
              <a href="/sample-sale">
                <img
                  alt="Fall Weddings Ad"
                  className="ShopAllNavigationDesktop__image u-width--full"
                  src={sampleSale}
                />
              </a>
              <a href="/dresses/fall-weddings" className="link">
                <span>Shop up to 40% OFF SAMPLE SALE</span>
              </a>
            </div>
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
