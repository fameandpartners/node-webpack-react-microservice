import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import Resize from '../../../decorators/Resize';
import PDPBreakpoints from '../../../libs/PDPBreakpoints';

// Assets
import summerWeddings from '../../../../img/SummerMenu.jpg';
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
        <a href="/weddings-and-parties">
          <img
            alt="Summer essentials, now customizable"
            className="u-width--full"
            src={summerWeddings}
          />
        </a>
        <a href="/fresh-for-summer-collection" className="link">
          <span>Summer essentials, now customizable</span>
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
              colTitle="Dresses"
              headerLink={NAVIGATION_LINKS.DRESSES_PATH}
              links={NAVIGATION_LINKS.DRESSES}
            />
            <NavLinkCol
              colTitle="Separates"
              links={NAVIGATION_LINKS.SEPARATES}
            />
            <NavLinkCol
              colTitle="Weddings"
              links={NAVIGATION_LINKS.WEDDINGS}
            />
            <NavLinkCol
              colClass="col_sm-6_md-2"
            />
            <NavLinkCol
              colTitle="Featured"
              links={NAVIGATION_LINKS.FEATURED}
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
