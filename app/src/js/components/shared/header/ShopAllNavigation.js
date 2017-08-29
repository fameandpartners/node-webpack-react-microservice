import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';

class ShopAllNavigation extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  render() {
    return (
      <div className="ShopAllNavigation u-position--absolute u-width--full">
        <div className="grid-12">
          <div className="col" />
          <div className="col" />
          <div className="col" />
          <div className="col" />
        </div>

      </div>
    );
  }
}

ShopAllNavigation.propTypes = {
  openNavItem: PropTypes.string,
};

ShopAllNavigation.defaultProps = {
  openNavItem: null,
};

export default ShopAllNavigation;
