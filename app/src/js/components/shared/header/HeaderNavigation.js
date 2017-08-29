import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';

// CSS
import '../../../../css/components/HeaderNavigation.scss';

class HeaderNavigation extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  render() {
    return (
      <div className="HeaderNavigation u-position--absolute u-width--full">
        Main Nav
      </div>
    );
  }
}

HeaderNavigation.propTypes = {
  openNavItem: PropTypes.string,
};

HeaderNavigation.defaultProps = {
  openNavItem: null,
};

export default HeaderNavigation;
