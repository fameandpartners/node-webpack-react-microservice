import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import autobind from 'react-autobind';
import classnames from 'classnames';

// Utilities
import win from '../polyfills/windowPolyfill';

export default class TrackVisibility extends Component {
  constructor(props) {
    super(props);
    autobind(this);
    this.state = {
      isVisible: false,
    };
    this.throttleCb = throttle(
      this.isComponentVisible,
      this.props.throttleInterval,
    );

    if (props.nodeRef) {
      this.setNodeRef(props.nodeRef);
    }
  }

  attachListener() {
    win.addEventListener('scroll', this.throttleCb);
    win.addEventListener('resize', this.throttleCb);
  }

  removeListener() {
    win.removeEventListener('scroll', this.throttleCb);
    win.removeEventListener('resize', this.throttleCb);
  }

  getChildProps() {
    const props = {};
    Object.keys(this.props).forEach((key) => {
      if (!{}.hasOwnProperty.call(TrackVisibility.defaultProps, key)) {
        props[key] = this.props[key];
      }
    });
    return props;
  }

  isVisible({ top, left, bottom, right, width, height }, windowWidth, windowHeight) {
    const { offset, partialVisibility } = this.props;

    if (top + right + bottom + left === 0) {
      return false;
    }

    const topThreshold = 0 - offset;
    const leftThreshold = 0 - offset;
    const widthCheck = windowWidth + offset;
    const heightCheck = windowHeight + offset;

    return partialVisibility
      ? top + height >= topThreshold
        && left + width >= leftThreshold
        && bottom - height <= heightCheck
        && right - width <= widthCheck
      : top >= topThreshold
        && left >= leftThreshold
        && bottom <= heightCheck
        && right <= widthCheck;
  }

  isComponentVisible() {
    console.log('this.props', this.props);
    const html = win.document.documentElement;
    const { once } = this.props;
    console.log('this.nodeRef', this.nodeRef);
    const boundingClientRect = this.nodeRef.getBoundingClientRect();
    const windowWidth = win.innerWidth || html.clientWidth;
    const windowHeight = win.innerHeight || html.clientHeight;

    const isVisible = this.isVisible(boundingClientRect, windowWidth, windowHeight);

    if (isVisible && once) {
      this.removeListener();
    }

    this.setState({ isVisible });
  }

  setNodeRef(ref) {
    return this.nodeRef = ref;
  }

  getChildren() {
    if (typeof this.props.children === 'function') {
      return this.props.children({
        ...this.getChildProps(),
        isVisible: this.state.isVisible,
      });
    }

    return React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        ...this.getChildProps(),
        isVisible: this.state.isVisible,
      }),
    );
  }

  componentDidMount() {
    this.attachListener();
    setTimeout(() => this.isComponentVisible(), 0);
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { className, style, nodeRef } = this.props;
    const props = {
      ...(className !== null && { className }),
      ...(style !== null && { style }),
    };

    return (
      <div
        className={classnames(
          'TrackVisibility',
          { 'TrackVisibility--is-visible': this.state.isVisible },
        )}
        ref={!nodeRef && this.setNodeRef} {...props}
      >
        {this.getChildren()}
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
TrackVisibility.propTypes = {
  /**
   * Define if the visibility need to be tracked once
   */
  once: PropTypes.bool,

  /**
   * Tweak the throttle interval
   * Check https://css-tricks.com/debouncing-throttling-explained-examples/ for more details
   */
  throttleInterval: (props, propName, component) => {
    const currentProp = props[propName];
    if (!Number.isInteger(currentProp) || currentProp < 0) {
      return new Error(
        `The ${propName} prop you provided to ${component} is not a valid integer >= 0.`,
      );
    }
    return null;
  },
  /**
   * Pass one or more children to track
   */
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  /**
   * Additional style to apply
   */
  style: PropTypes.object,

  /**
   * Additional className to apply
   */
  className: PropTypes.string,

  /**
   * Define an offset. Can be useful for lazy loading
   */
  offset: PropTypes.number,

  /**
   * Update the visibility state as soon as a part of the tracked component is visible
   */
  partialVisibility: PropTypes.bool,

  /**
   * Exposed for testing but allows node other than internal wrapping <div /> to be tracked
   * for visibility
   */
  nodeRef: PropTypes.object,
};

TrackVisibility.defaultProps = {
  once: false,
  throttleInterval: 150,
  style: null,
  className: null,
  offset: 0,
  children: null,
  partialVisibility: false,
  nodeRef: null,
};
