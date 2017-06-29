import React, { Component } from 'react';
import { func, node, number, object, oneOfType, string } from 'prop-types';
import autoBind from 'react-autobind';
import { TransitionMotion, spring } from 'react-motion';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Utilities
import noop from '../../libs/noop';

// Actions
import * as ModalActions from '../../actions/ModalActions';

// CSS
import '../../../css/components/Modal.scss';

function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    modalId: state.$$modalState.get('modalId'),
  };
}

function dispatchToProps(dispatch) {
  const actions = bindActionCreators(ModalActions, dispatch);
  return {
    activateModal: actions.activateModal,
  };
}


class ModalContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    autoBind(this);
  }

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
        </div>
      </div>
    );
  }

  // render() {
  //   console.log('this.props.children of modalContainer', this.props.children);
  //   return (
  //     <div className="ModalContainer Modal__content-container">
  //       {this.props.children}
  //     </div>
  //   );
  // }
  //
  render() {
    const { modalId } = this.props;
    console.log('modalId', modalId);
    // TODO: Check if we have child with this modalId

    return (
      <TransitionMotion
        styles={modalId ? [this.defaultStyles()] : []}
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


ModalContainer.propTypes = {
  width: oneOfType([number, string]),
  zIndex: number,
  children: oneOfType([object, node]),
  onClose: func,
  // Redux
  modalId: string,
};

ModalContainer.defaultProps = {
  children: null,
  width: '400px',
  height: '400px',
  zIndex: 999,
  onClose: noop,
  // Redux
  modalId: null,
};


export default connect(stateToProps, dispatchToProps)(ModalContainer);
