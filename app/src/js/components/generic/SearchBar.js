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
          id="dress_query"
          lineInput
          focusOnMount
          indent
          onBlur={this.props.onBlur}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  onBlur: PropTypes.func.isRequired,
};

export default SearchBar;
