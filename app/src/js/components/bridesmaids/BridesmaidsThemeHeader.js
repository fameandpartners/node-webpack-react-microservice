/* eslint-disable max-len */
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';

class BridesmaidsThemeHeader extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const { themeName, themePresentation } = this.props;

    // Load images through our S3 bucket
    const heroImagePathBase = 'https://s3.amazonaws.com/fandp-web-production-marketing/custom-dresses/bridesmaid/hero-tiles/hero-';
    const heroImagePathDesktop = `${heroImagePathBase}${themeName}.jpg`;
    const heroImagePathTablet = `${heroImagePathBase}${themeName}--tablet.jpg`;
    const heroImagePathMobile = `${heroImagePathBase}${themeName}--mobile.jpg`;

    return (
      <div className="BridesmaidsHeader">
        <div className="BridesmaidsHeader__heroTile u-overlay-area">
          <picture>
            <source srcSet={heroImagePathDesktop} media="(min-width: 1025px)" />
            <source srcSet={heroImagePathTablet} media="(min-width: 577px) and (max-width: 1024px)" />
            <source srcSet={heroImagePathMobile} media="(max-width: 576px)" />
            <img
              src={heroImagePathDesktop}
              srcSet={heroImagePathDesktop}
              alt="Buy custom bridesmaid dresses"
              className="BridesmaidsHeader__heroTileImg u-overlay-area__media"
            />
          </picture>
        </div>
        <div className="BridesmaidsHeader__ctaWrapper u-overlay-area__overlay">
          <div className="grid grid-noGutter BridesmaidsHeader__grid">
            <div className="col-7_md-8_sm-8_xs-12" data-push-left="off-1_md-0_sm-0_xs-0">
              <span className="SuperCollection-Header--cta">
                <h1 className="BridesmaidsHeader__heading">
                  <span className="BridesmaidsHeader__headingTitle">{themePresentation}</span> Bridesmaid Dresses.
                </h1>
                <h2 className="BridesmaidsHeader__subheading">
                  Millions of options. Only one you.
                </h2>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BridesmaidsThemeHeader.propTypes = {
  themeName: PropTypes.string.isRequired,
  themePresentation: PropTypes.string.isRequired,
};

export default BridesmaidsThemeHeader;
