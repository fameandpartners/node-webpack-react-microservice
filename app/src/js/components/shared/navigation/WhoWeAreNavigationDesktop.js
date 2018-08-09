import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Breakpoint stuff
import Resize from '../../../decorators/Resize';
import PDPBreakpoints from '../../../libs/PDPBreakpoints';

// Assets
import invitefriendsImg from '../../../../img/InsideFame-Tile.jpg';
import '../../../../css/components/WhoWeAreNavigation.scss';

// Constants
import { NAVIGATION_LINKS } from '../../../constants/AppConstants';

// Components
import NavLinkCol from './NavLinkCol';

class WhoWeAreNavigation extends PureComponent {
  render() {
    const { breakpoint } = this.props;
    return (
      <div
        ref={this.props.childRef}
        className="WhoWeAreNavigation u-width--full layout-container"
      >
        <div className="WhoWeAreNavigation__link-container u-center grid">
          <NavLinkCol
            colTitle="About"
            links={NAVIGATION_LINKS.ABOUT}
          />
          <NavLinkCol
            colTitle="Community"
            links={NAVIGATION_LINKS.COMMUNITY}
          />
          { (breakpoint === 'mobile' || breakpoint === 'tablet' || breakpoint === 'desktop-sm') ? null :
          <div className="WhoWeAreNavigation__ad">
            <a href="/shop-social?traffic_source=navimg">
              <img
                alt="Shop Instagram Ad"
                className="WhoWeAreNavigation__image u-width--full"
                src={invitefriendsImg}
              />
            </a>
            <a href="/shop-social?traffic_source=navimg" className="link">
              <span>Shop Instagram</span>
            </a>
          </div>
        }
        </div>
      </div>
    );
  }
}

WhoWeAreNavigation.propTypes = {
  breakpoint: PropTypes.string.isRequired,
  childRef: PropTypes.func.isRequired,
};

export default Resize(PDPBreakpoints)(WhoWeAreNavigation);
