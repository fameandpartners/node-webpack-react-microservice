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
    // ANIMATING TO:
    const STANDARD_DEFAULT_STYLES = {
      key: 'search',
      style: {
        opacity: spring(1),
        width: spring(240),
      },
    };

    return STANDARD_DEFAULT_STYLES;
  }

  willEnter() {
    const STANDARD_WILL_ENTER = {
      opacity: 0,
      width: 0,
    };
    return STANDARD_WILL_ENTER;
  }

  render() {
    return (
      <TransitionMotion
        styles={this.props.isActive ? [this.defaultStyles()] : []}
        willEnter={this.willEnter}
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
                <SearchBar />
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
};

SearchBarExpander.defaultProps = {
  isActive: false,
};

export default SearchBarExpander;
