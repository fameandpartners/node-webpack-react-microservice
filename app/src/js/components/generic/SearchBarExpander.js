import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { spring, TransitionMotion } from 'react-motion';

import SearchBar from './SearchBar';

class SearchBarExpander extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  defaultStyles() {
    const DEFAULT_STYLES = {
      key: 'search',
      style: {
        opacity: spring(1),
        width: spring(240),
      },
    };

    return DEFAULT_STYLES;
  }

  willEnter() {
    const WILL_ENTER = {
      opacity: 0,
      width: 0,
    };
    return WILL_ENTER;
  }

  willLeave() {
    const WILL_LEAVE = {
      opacity: spring(0),
      width: spring(0),
    };
    return WILL_LEAVE;
  }

  render() {
    return (
      <TransitionMotion
        styles={this.props.isActive ? [this.defaultStyles()] : []}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {(items) => {
          if (items.length) {
            const style = items[0].style;
            return (
              <div
                className="SearchBarExpander"
                key={items[0].key}
                style={{
                  width: `${style.width}px`,
                  opacity: style.opacity,
                }}
              >
                <SearchBar onBlur={this.props.onBlur} />
              </div>
            );
          }
          return null;
        }}
      </TransitionMotion>
    );
  }
}

SearchBarExpander.propTypes = {
  isActive: PropTypes.bool,
  onBlur: PropTypes.func.isRequired,
};

SearchBarExpander.defaultProps = {
  isActive: false,
};

export default SearchBarExpander;
