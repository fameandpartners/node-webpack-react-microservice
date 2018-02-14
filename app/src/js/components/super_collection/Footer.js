import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


function stateToProps(state) {
  const footer = state.$$superCollectionState.get('$$footer').toJS();
  return { footer };
}

function dispatchToProps() {
  return {};
}

class Footer extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const { footer } = this.props;

    return (
      <div className="SuperCollection-Footer u-overlay-area">
        <a href={footer.url}>
          <picture>
            <source srcSet={footer.img} media="(min-width: 1025px)" />
            <source srcSet={footer.img_tablet} media="(min-width: 577px) and (max-width: 1024px)" />
            <img
              src={footer.img}
              srcSet={footer.img}
              alt="Buy custom bridesmaid dresses"
              className="SuperCollection-Footer--img u-overlay-area__media"
            />
          </picture>
          <div className="SuperCollection-Footer--ctaWrapper u-overlay-area__overlay">
            <div className="grid grid-noGutter grid-center SuperCollection-Footer--grid">
              <div className="col-12_md-7_sm-9_xs-11">
                <span className="SuperCollection-Footer--cta">
                  <h2 className="SuperCollection-Footer--ctaHeading">
                    Create Your <br className="u-lg-hidden" />Custom Collection
                  </h2>
                  <h3
                    className="SuperCollection-Footer--ctaSubheading"
                  >
                    Filter based on your wedding colors, <br className="u-lg-hidden" />
                    preferred silhouette, and more.
                  </h3>
                  <p className="CtaSlimBorder">Get started</p>
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>
    );
  }
}

Footer.propTypes = {
  footer: PropTypes.shape({
    url: PropTypes.string,
    img: PropTypes.string,
    img_tablet: PropTypes.string,
  }).isRequired,
};

export default connect(stateToProps, dispatchToProps)(Footer);
