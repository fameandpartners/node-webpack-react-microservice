import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';

// Components
import Caret from '../../generic/Caret';

// Constants
import { NAVIGATION_LINKS } from '../../../constants/AppConstants';

// Components
import NavLinkCol from './NavLinkCol';

class WhoWeAreNavigationMobile extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  splitLinks(remainder) {
    return NAVIGATION_LINKS.WHO_WE_ARE.filter((l, i) => i % 2 === remainder);
  }

  render() {
    return (
      /* eslint-disable max-len */
      <div className="ShopAllNavigationMobile u-width--full typography">
        <div className="ShopAllNavigationMobile__link-container u-center grid-noGutter">
          <div
            className="ShopAllNavigationMobile__heading u-cursor--pointer u-mb-normal"
            onClick={this.props.handleReturnClick}
          >
            <span className="u-position--relative u-display--inline u-mr-small">
              <Caret
                left
                width="10px"
                height="10px"
              />
            </span>
            <h3 className="h5 u-display--inline u-ml-small">Who We Are</h3>
          </div>
          <div className="ShopAllNavigationMobile__links u-flex--1">
            <NavLinkCol
              colClass="col-4_sm-6_md-3"
              links={this.splitLinks(1)}
            />
            <NavLinkCol
              colClass="col-4_sm-6_md-3"
              links={this.splitLinks(0)}
            />
          </div>
        </div>
      </div>
    );
  }
}

WhoWeAreNavigationMobile.propTypes = {
  handleReturnClick: PropTypes.func.isRequired,
};

export default WhoWeAreNavigationMobile;
