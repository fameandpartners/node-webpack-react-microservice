import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { TransitionMotion } from 'react-motion';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';

// Polyfills
import win from '../../polyfills/windowPolyfill';

// Actions
import * as ModalActions from '../../actions/ModalActions';

// Constants
import * as modalAnimations from '../../utilities/modal-animation';
import KEYS from '../../constants/keys';

// CSS
import '../../../css/components/Wizard.scss';

function stateToProps(state) {
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


class WizardContainer extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  defaultStyles() {
    return modalAnimations.STANDARD_DEFAULT_STYLES;
  }

  willEnter() {
    return modalAnimations.STANDARD_WILL_ENTER;
  }

  willLeave() {
    return modalAnimations.STANDARD_WILL_LEAVE;
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

  modalIsActive() {
    const { activeModalId, modalIds } = this.props;
    return modalIds.indexOf(activeModalId) > -1;
  }

  hasActivatedModal() {
    const { shouldAppear } = this.props;
    return shouldAppear && this.modalIsActive();
  }

  handleEscapeKeydown(evt) {
    const { activateModal } = this.props;
    if (evt.keyCode === KEYS.ESC && this.modalIsActive()) {
      activateModal({ shouldAppear: false });
    }
  }

  renderWizardContainer(key, style) {
    const {
      dimBackground,
      height,
      modalContainerClass,
      zIndex,
      children,
      fullScreen,
      fullWidth,
      flexWidth,
    } = this.props;

    return (
      <div
        className={classnames([
          'WizardContainer u-center typography',
          modalContainerClass,
          {
            'WizardContainer--dim-background': dimBackground,
            'u-pointerEvents--none': !this.hasActivatedModal(),
          },
        ])}
        style={{ zIndex, opacity: style.opacity }}
        key={key}
        onClick={this.handleBackgroundClick}
      >
        <div
          className={classnames([
            'WizardContainer__content-wrapper u-center col',
            {
              WizardContainer__fullScreen: fullScreen,
              'u-width--full': fullWidth,
              WizardContainer__flexWidth: flexWidth,
            },
          ])}
          onClick={this.handleForegroundClick}
          style={{
            height,
            zIndex,
            transform: `translate3d(${style.x || 0}%, ${style.y || 0}%, 0)`,
          }}
        >
          {children}
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (this.props.closeOnEscapeKey) {
      win.document.addEventListener('keydown', this.handleEscapeKeydown);
    }
  }

  componentWillUnmount() {
    win.document.removeEventListener('keydown', this.handleEscapeKeydown);
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
            return this.renderWizardContainer(items[0].key, items[0].style);
          }
          return null;
        }
      }
      </TransitionMotion>
    );
  }
}


WizardContainer.propTypes = {
  closeOnBackgroundClick: PropTypes.bool,
  closeOnEscapeKey: PropTypes.bool,
  dimBackground: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  modalContainerClass: PropTypes.string,
  fullScreen: PropTypes.bool,
  flexWidth: PropTypes.bool,
  zIndex: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.node]),
  // Redux
  activateModal: PropTypes.func.isRequired,
  activeModalId: PropTypes.string,
  modalIds: PropTypes.arrayOf(PropTypes.string),
  shouldAppear: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

WizardContainer.defaultProps = {
  closeOnBackgroundClick: true,
  closeOnEscapeKey: true,
  dimBackground: true,
  children: null,
  fullScreen: false,
  flexWidth: false,
  height: null,
  modalContainerClass: '',
  zIndex: 999,
  modalIds: [],
  // Redux
  activeModalId: null,
  shouldAppear: false,
  fullWidth: false,
};


export default connect(stateToProps, dispatchToProps)(WizardContainer);
