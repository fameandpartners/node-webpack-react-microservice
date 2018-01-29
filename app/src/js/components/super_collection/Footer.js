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
      <div className="SuperCollection-Footer">
        <a href={footer.url}>
          <picture>
            <source srcSet={footer.img} media="(min-width: 1200px)" />
            <source srcSet={footer.img_tablet} media="(min-width: 768px) and (max-width: 1199px)" />
            <source srcSet={footer.img_mobile} media="(max-width: 767px)" />
            <img
              src={footer.img}
              srcSet={footer.img}
              alt="Buy custom bridesmaid dresses"
              className="SuperCollection-Footer--img"
            />
          </picture>
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
