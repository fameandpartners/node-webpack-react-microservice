import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Breakpoint stuff
import Resize from '../../../decorators/Resize';
import PDPBreakpoints from '../../../libs/PDPBreakpoints';

// Assets
import internshipImg from '../../../../img/internship.jpg';
import '../../../../css/components/WhoWeAreNavigation.scss';

// Constants
import { NAVIGATION_LINKS } from '../../../constants/AppConstants';

// Components
import NavLinkCol from './NavLinkCol';

class WhoWeAreNavigation extends PureComponent {
  splitLinks(remainder) {
    return NAVIGATION_LINKS.WHO_WE_ARE.filter((l, i) => i % 2 === remainder);
  }

  render() {
    const { breakpoint } = this.props;
    return (
      <div
        ref={this.props.childRef}
        className="WhoWeAreNavigation u-width--full layout-container"
      >
        <div className="WhoWeAreNavigation__link-container u-center grid">
          <NavLinkCol
            links={this.splitLinks(1)}
          />
          <NavLinkCol
            links={this.splitLinks(0)}
          />
          { (breakpoint === 'mobile' || breakpoint === 'tablet' || breakpoint === 'desktop-sm') ? null :
          <div className="WhoWeAreNavigation__ad">
            <a href="/dresses/fall-weddings">
              <img
                alt="Internship Ad"
                className="WhoWeAreNavigation__image u-width--full"
                src={internshipImg}
              />
            </a>
            <a href="/it-girl" className="link">
              <span>Win an Internship</span>
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
