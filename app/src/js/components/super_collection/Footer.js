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
        <img
          src={footer.img}
          alt="Buy custom bridesmaid dresses"
          className="SuperCollection-Footer--img u-overlay-area__media"
        />
        <div className="SuperCollection-Footer--ctaWrapper u-overlay-area__overlay">
          <div className="u-overlay-area__caption u-overlay-area__caption--center">
            <a href="/" className="SuperCollection-Footer--cta">
              <h2 className="SuperCollection-Footer--ctaHeading">Dress Filter</h2>
              <h3 className="SuperCollection-Footer--ctaSubheading">Create your own dress collection</h3>
              <p className="SuperCollection-Footer--ctaCopy">Get started</p>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  footer: PropTypes.shape({
    img: PropTypes.string,
  }).isRequired,
};

Footer.defaultProps = {
  footer: {},
};

export default connect(stateToProps, dispatchToProps)(Footer);
