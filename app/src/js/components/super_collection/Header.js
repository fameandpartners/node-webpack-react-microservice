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
      <div className="grid-noGutter">
        <div className="col-12">
          <picture>
            <source srcSet={header.img} media="(min-width: 1200px)" />
            <source srcSet={header.img_tablet} media="(min-width: 768px) and (max-width: 1199px)" />
            <source srcSet={header.img_mobile} media="(max-width: 767px)" />
            <img
              src={header.img}
              srcSet={header.img}
              alt="Buy custom bridesmaid dresses"
              className="SuperCollection-Header--img"
            />
          </picture>
        </div>
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
