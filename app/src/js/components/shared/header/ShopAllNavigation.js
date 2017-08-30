import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import classnames from 'classnames';

// CSS
import '../../../../css/components/ShopAllNavigation.scss';

// Constants
import { NAVIGATION_LINKS } from '../../../constants/AppConstants';

// Components
import NavLinkCol from './NavLinkCol';

class ShopAllNavigation extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      fadeIn: false,
    };
  }

  /* eslint-disable react/no-did-mount-set-state */
  componentDidMount() {
    this.setState({ fadeIn: true });
  }

  render() {
    const { childRef } = this.props;
    return (
      <div
        ref={childRef}
        className={classnames(
          'ShopAllNavigation u-width--full layout-container',
          { 'ShopAllNavigation--fade-in': this.state.fadeIn },
        )}
      >
        <div className="ShopAllNavigation__link-container u-mt-normal u-mb-big u-center grid">
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
