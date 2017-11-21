import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { spring, TransitionMotion } from 'react-motion';
import classnames from 'classnames';
import noop from '../../libs/noop';

// Components
import SearchBar from './SearchBar';

// CSS
import '../../../css/components/SearchBarExpander.scss';

class SearchBarExpander extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  defaultStyles() {
    return {
      key: 'search',
      style: {
        opacity: spring(1),
        width: spring(240),
      },
    };
  }

  willEnter() {
    return {
      opacity: 0,
      width: 0,
    };
  }

  willLeave() {
    return {
      opacity: spring(0),
      width: spring(0),
    };
  }

  render() {
    const { isActive, onBlur, onSubmit } = this.props;
    return (
      <TransitionMotion
        styles={isActive ? [this.defaultStyles()] : []}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {(items) => {
          if (items.length) {
            const style = items[0].style;
            return (
              <div
                className={classnames(
                  'SearchBarExpander u-center u-display--inline-block',
                  { 'SearchBarExpander--active': isActive },
                )}
                key={items[0].key}
                style={{
                  width: `${style.width}px`,
                  opacity: style.opacity,
                }}
              >
                <SearchBar
                  onBlur={onBlur}
                  onSubmit={onSubmit}
                />
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
  onSubmit: PropTypes.func.isRequired,
};

SearchBarExpander.defaultProps = {
  hasIcon: true,
  handleSearchIconClick: noop,
  isActive: false,
};

export default SearchBarExpander;
