import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


function stateToProps(state) {
  const header = state.$$superCollectionState.get('$$header').toJS();
  return { header };
}

function dispatchToProps() {
  return {};
}

class Header extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const { header } = this.props;

    return (
      <div className="SuperCollection-Header u-overlay-area">
        <a href={header.url}>
          <picture>
            <source srcSet={header.img} media="(min-width: 1025px)" />
            <source srcSet={header.img_tablet} media="(min-width: 577px) and (max-width: 1024px)" />
            <source srcSet={header.img_mobile} media="(max-width: 576px)" />
            <img
              src={header.img}
              srcSet={header.img}
              alt="Buy custom bridesmaid dresses"
              className="SuperCollection-Header--img u-overlay-area__media"
            />
          </picture>
          <div className="SuperCollection-Header--ctaWrapper u-overlay-area__overlay">
            <div className="grid grid-noGutter SuperCollection-Header--grid">
              <div className="col-4_md-8_sm-10_xs-10" data-push-left="off-1_md-2_sm-1_xs-1">
                <span className="SuperCollection-Header--cta">
                  <h1 className="SuperCollection-Header--ctaHeading">
                    Millions of options.
                  </h1>
                  <h1 className="SuperCollection-Header--ctaHeading">
                    Only one you.
                  </h1>
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>
    );
  }
}

Header.propTypes = {
  header: PropTypes.shape({
    img: PropTypes.string,
    img_tablet: PropTypes.string,
    img_mobile: PropTypes.string,
  }).isRequired,
};

export default connect(stateToProps, dispatchToProps)(Header);
