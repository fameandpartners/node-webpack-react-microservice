import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionMotion, spring } from 'react-motion';

import noop from '../../libs/noop';

// CSS
import '../../../css/components/Modal.scss';

class Modal extends Component {
  defaultStyles() {
    return {
      key: 'modal',
      data: {},
      style: {
        opacity: spring(1), position: spring(0),
      },
    };
  }

  willEnter() {
    return { opacity: 0, position: -10 };
  }

  willLeave() {
    return { opacity: spring(0), position: spring(-10) };
  }

  handleForegroundClick(e) {
    e.stopPropagation();
  }

  renderModal(key, style) {
    const {
      width,
      zIndex,
      children,
      onClose,
    } = this.props;

    return (
      <div
        className="Modal grid-middle"
        style={{ zIndex, opacity: style.opacity }}
        key={key}
        onClick={onClose}
      >
        <div
          onClick={this.handleForegroundClick}
          className="Modal__content-container u-center col"
          style={{
            width,
            zIndex,
            transform: `translate3d(0, ${style.position}px, 0)`,
          }}
        >
          {children}
          <span onClick={onClose}>×</span>
        </div>
      </div>
    );
  }

  render() {
    const { isOpen } = this.props;

    return (
      <TransitionMotion
        styles={isOpen ? [this.defaultStyles()] : []}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {
            (items) => {
              if (items.length) {
                return this.renderModal(items[0].key, items[0].style);
              } return null;
            }
          }
      </TransitionMotion>
    );
  }
}

Modal.propTypes = {
  width: PropTypes.number || PropTypes.string,
  isOpen: PropTypes.bool,
  zIndex: PropTypes.number,
  children: PropTypes.arrayOf(PropTypes.node),
  onClose: PropTypes.func,
};

Modal.defaultProps = {
  children: null,
  isOpen: false,
  width: '400px',
  height: '400px',
  zIndex: 999,
  onClose: noop,
};

export default Modal;
