import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
// CSS
// import '../../../../css/components/ShopAllNavigationMobile.scss';

// Constants
import { NAVIGATION_LINKS } from '../../../constants/AppConstants';

// Components
import NavLinkCol from './NavLinkCol';

class ShopAllNavigationMobile extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <div className="ShopAllNavigationMobile u-width--full layout-container">
        <div className="ShopAllNavigationMobile__link-container u-center grid">
          <div className="ShopAllNavigationMobile__heading u-width--full typography">
            <h3 className="h5">Shop All</h3>
          </div>
          <NavLinkCol
            colClass="col-4_sm-6_md-3"
            colTitle="Weddings"
            links={NAVIGATION_LINKS.WEDDINGS}
          />
          <NavLinkCol
            colClass="col-4_sm-6_md-3"
            colTitle="Dresses"
            links={NAVIGATION_LINKS.DRESSES}
          />
          <NavLinkCol
            colClass="col-4_sm-6_md-3"
            colTitle="Separates"
            links={NAVIGATION_LINKS.SEPARATES}
          />
          <NavLinkCol
            colClass="col-4_sm-6_md-3"
            colTitle="New Arrivals"
            links={NAVIGATION_LINKS.NEW_ARRIVALS}
          />
          <NavLinkCol
            colClass="col-4_sm-6_md-3"
            colTitle="Collections"
            links={NAVIGATION_LINKS.COLLECTIONS}
          />
        </div>
      </div>
    );
  }
}

ShopAllNavigationMobile.propTypes = {
  childRef: PropTypes.func.isRequired,
};

export default ShopAllNavigationMobile;
