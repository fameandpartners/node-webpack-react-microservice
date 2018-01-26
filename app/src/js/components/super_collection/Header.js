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
          <img
            src={header.img}
            alt="Buy custom bridesmaid dresses"
            className="SuperCollection-Header--img"
          />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  header: PropTypes.shape({
    img: PropTypes.string,
  }).isRequired,
};

Header.defaultProps = {
  header: {},
};

export default connect(stateToProps, dispatchToProps)(Header);
