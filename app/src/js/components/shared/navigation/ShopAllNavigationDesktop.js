import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
// CSS
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
    const { childRef } = this.props;
    return (
      <div
        ref={childRef}
        className="ShopAllNavigationDesktop u-width--full layout-container"
      >
        <div className="ShopAllNavigationDesktop__link-container u-center grid">
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
        </div>
      </div>
    );
  }
}

ShopAllNavigationDesktop.propTypes = {
  childRef: PropTypes.func.isRequired,
};

export default ShopAllNavigationDesktop;
