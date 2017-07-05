import React, { Component } from 'react';
import { arrayOf, bool, func, node, number, object, oneOfType, string } from 'prop-types';
import autoBind from 'react-autobind';
import { TransitionMotion, spring } from 'react-motion';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as ModalActions from '../../actions/ModalActions';

// CSS
import '../../../css/components/Modal.scss';

function mapStateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    shouldAppear: state.$$modalState.get('shouldAppear'),
    activeModalId: state.$$modalState.get('modalId'),
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

  handleBackgroundClick() {
    const { activateModal, closeOnBackgroundClick } = this.props;
    if (closeOnBackgroundClick) {
      activateModal({ shouldAppear: false });
    }
  }

  handleForegroundClick(e) {
    e.stopPropagation();
  }

  hasActivatedModal() {
    const { activeModalId, modalIds, shouldAppear } = this.props;
    return shouldAppear && modalIds.indexOf(activeModalId) > -1;
  }

  renderModalContainer(key, style) {
    const {
      width,
      zIndex,
      children,
    } = this.props;

    return (
      <div
        className="ModalContainer grid-middle"
        style={{ zIndex, opacity: style.opacity }}
        key={key}
        onClick={this.handleBackgroundClick}
      >
        <div
          className="ModalContainer__content-wrapper u-center col"
          onClick={this.handleForegroundClick}
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

  render() {
    return (
      <TransitionMotion
        styles={this.hasActivatedModal() ? [this.defaultStyles()] : []}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {
        (items) => {
          if (items.length) {
            return this.renderModalContainer(items[0].key, items[0].style);
          } return null;
        }
      }
      </TransitionMotion>
    );
  }
}


ModalContainer.propTypes = {
  closeOnBackgroundClick: bool,
  width: oneOfType([number, string]),
  zIndex: number,
  children: oneOfType([object, node]),
  // Redux
  activateModal: func.isRequired,
  activeModalId: string,
  modalIds: arrayOf(string),
  shouldAppear: bool,
};

ModalContainer.defaultProps = {
  closeOnBackgroundClick: true,
  children: null,
  width: '400px',
  height: '400px',
  zIndex: 999,
  modalIds: [],
  // Redux
  activeModalId: null,
  shouldAppear: false,
};


export default connect(mapStateToProps, dispatchToProps)(ModalContainer);
