import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
// CSS
import '../../../../css/components/ShopAllNavigationMobile.scss';

// Constants
import { NAVIGATION_LINKS } from '../../../constants/AppConstants';

// Components
import Caret from '../../generic/Caret';

// Components
import NavLinkCol from './NavLinkCol';

class ShopAllNavigationMobile extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  /* eslint-disable max-len */
  render() {
    const { handleReturnClick } = this.props;
    return (
      <div className="ShopAllNavigationMobile u-width--full typography">
        <div className="ShopAllNavigationMobile__link-container u-center u-flex--col">
          <div
            onClick={handleReturnClick}
            className="ShopAllNavigationMobile__heading u-cursor--pointer u-mb--normal"
          >
            <span className="u-position--relative u-display--inline u-mr--small">
              <Caret
                left
                width="10px"
                height="10px"
              />
            </span>
            <h3 className="h5 u-display--inline u-ml-small">Shop All</h3>
          </div>
          <div className="ShopAllNavigationMobile__links u-flex--1">
            <div className="u-overflow-y--scroll">
              <div className="grid-center-noGutter">
                <NavLinkCol
                  colClass="col_sm-6_md-2"
                  colTitle="Dresses"
                  links={NAVIGATION_LINKS.DRESSES}
                  headerLink={NAVIGATION_LINKS.DRESSES_PATH}
                />
                <NavLinkCol
                  colClass="col_sm-6_md-2"
                  colTitle="Separates"
                  links={NAVIGATION_LINKS.SEPARATES}
                />
                <NavLinkCol
                  colClass="col_sm-6_md-2"
                  colTitle="Weddings"
                  links={NAVIGATION_LINKS.WEDDINGS}
                />
                <NavLinkCol
                  colClass="col_sm-6_md-2"
                  colTitle="Featured"
                  links={NAVIGATION_LINKS.FEATURED}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ShopAllNavigationMobile.propTypes = {
  handleReturnClick: PropTypes.func.isRequired,
};

export default ShopAllNavigationMobile;
