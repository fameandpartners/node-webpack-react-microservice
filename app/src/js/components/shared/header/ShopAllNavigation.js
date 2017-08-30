import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
// CSS
import '../../../../css/components/ShopAllNavigation.scss';

// Constants
import { NAVIGATION_LINKS } from '../../../constants/AppConstants';

// Components
import NavLinkCol from './NavLinkCol';

class ShopAllNavigation extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const { childRef } = this.props;
    return (
      <div
        ref={childRef}
        className="ShopAllNavigation u-width--full layout-container"
      >
        <div className="ShopAllNavigation__link-container u-center grid">
          <NavLinkCol
            colTitle="Weddings"
            links={NAVIGATION_LINKS.WEDDINGS}
          />
          <NavLinkCol
            colTitle="Dresses"
            links={NAVIGATION_LINKS.DRESSES}
          />
          <NavLinkCol
            colTitle="Separates"
            links={NAVIGATION_LINKS.SEPARATES}
          />
          <NavLinkCol
            colTitle="New Arrivals"
            links={NAVIGATION_LINKS.NEW_ARRIVALS}
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

ShopAllNavigation.propTypes = {
  childRef: PropTypes.func.isRequired,
};

export default ShopAllNavigation;
