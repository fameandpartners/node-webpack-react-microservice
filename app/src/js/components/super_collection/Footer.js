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
            <source srcSet={footer.img} media="(min-width: 1200px)" />
            <source srcSet={footer.img_tablet} media="(min-width: 768px) and (max-width: 1199px)" />
            <source srcSet={footer.img_mobile} media="(max-width: 767px)" />
            <img
              src={footer.img}
              srcSet={footer.img}
              alt="Buy custom bridesmaid dresses"
              className="SuperCollection-Footer--img u-overlay-area__media"
            />
          </picture>
          <div className="SuperCollection-Footer--ctaWrapper u-overlay-area__overlay">
            <div className="u-overlay-area__caption u-overlay-area__caption--center">
              <span className="SuperCollection-Footer--cta">
                <h2 className="SuperCollection-Footer--ctaHeading">The Dress Filter</h2>
                <h3
                  className="SuperCollection-Footer--ctaSubheading"
                >
                  Create your own dress collection
                </h3>
                <p className="SuperCollection-Footer--ctaCopy">Get started</p>
              </span>
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
    img_mobile: PropTypes.string,
  }).isRequired,
};

export default connect(stateToProps, dispatchToProps)(Footer);
