import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';

import Input from '../form/Input';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <div
        className="SearchBar"
      >
        <Input
          focusOnMount
          indent
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  isActive: PropTypes.bool,
};

SearchBar.defaultProps = {
  isActive: false,
};

export default SearchBar;
