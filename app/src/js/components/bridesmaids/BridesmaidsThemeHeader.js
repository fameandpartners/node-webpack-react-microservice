// eslint-disable max-len */
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const { themeName } = this.props;
    const heroImagePath = 'https://s3.amazonaws.com/fandp-web-production-marketing/custom-dresses/bridesmaid/hero-tiles/hero-';
    const imagePathDesktop = `${heroImagePath}${themeName}.jpg`;
    const imagePathTablet = `${heroImagePath}${themeName}--tablet.jpg`;
    const imagePathMobile = `${heroImagePath}${themeName}--mobile.jpg`;

    return (
      <div className="BridesmaidsProductGrid__heroTile u-overlay-area">
        <picture>
          <source srcSet={imagePathDesktop} media="(min-width: 1025px)" />
          <source srcSet={imagePathTablet} media="(min-width: 577px) and (max-width: 1024px)" />
          <source srcSet={imagePathMobile} media="(max-width: 576px)" />
          <img
            src={imagePathDesktop}
            srcSet={imagePathDesktop}
            alt="Buy custom bridesmaid dresses"
            className="BridesmaidsProductGrid__heroTileImg"
          />
        </picture>
      </div>
    );
  }
}

Header.propTypes = {
  themeName: PropTypes.string.isRequired,
};

export default Header;
