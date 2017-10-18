import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';

// Components
import Input from '../form/Input';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  onKeypress(evt) {
    if (evt.which === 13 || evt.keyCode === 13) {
      this.props.onSubmit(evt);
    }
  }

  render() {
    const { onBlur } = this.props;
    return (
      <div
        className="SearchBar"
      >
        <Input
          id="dress_query"
          focusOnMount
          lineInput
          indent
          ref={c => this.input = c}
          onBlur={onBlur}
          onKeypress={this.onKeypress}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  onBlur: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
