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

  handleKeyPress(evt, val) {
    console.log('keypress', evt.which);
    console.log('keypress', evt.keyCode);
    if (evt.which === 13 || evt.keyCode === 13) {
      evt.preventDefault();
      console.log('this.input', this.inputEl);
      this.props.onSubmit(evt, val);
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
          onBlur={onBlur}
          onKeyPress={this.handleKeyPress}
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
