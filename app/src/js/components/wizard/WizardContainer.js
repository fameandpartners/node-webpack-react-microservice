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
import * as WizardActions from '../../actions/WizardActions';

// Constants
import * as modalAnimations from '../../utilities/modal-animation';
import KEYS from '../../constants/keys';

// CSS
import '../../../css/components/Wizard.scss';

function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    shouldAppear: state.$$wizardState.get('shouldAppear'),
    activeStepId: state.$$wizardState.get('activeStepId'),
  };
}

function dispatchToProps(dispatch) {
  const actions = bindActionCreators(WizardActions, dispatch);
  return {
    jumpToStep: actions.jumpToStep,
    updateEditingStep: actions.updateEditingStep,
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
    const { jumpToStep, closeOnBackgroundClick, updateEditingStep } = this.props;
    if (closeOnBackgroundClick) {
      updateEditingStep({ isEditingStep: false });
      jumpToStep({ shouldAppear: false });
    }
  }

  handleForegroundClick(e) {
    e.stopPropagation();
  }

  wizardIsActive() {
    const { activeStepId, stepIds } = this.props;
    return stepIds.indexOf(activeStepId) > -1;
  }

  hasActivatedStep() {
    const { shouldAppear } = this.props;
    return shouldAppear && this.wizardIsActive();
  }

  handleEscapeKeydown(evt) {
    const { jumpToStep, updateEditingStep } = this.props;
    if (evt.keyCode === KEYS.ESC && this.wizardIsActive()) {
      updateEditingStep({ isEditingStep: false });
      jumpToStep({ shouldAppear: false });
    }
  }

  renderWizardContainer(key, style) {
    const {
      dimBackground,
      height,
      wizardContainerClass,
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
          wizardContainerClass,
          {
            'WizardContainer--dim-background': dimBackground,
            'u-pointerEvents--none': !this.hasActivatedStep(),
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
        styles={this.hasActivatedStep() ? [this.defaultStyles()] : []}
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
  wizardContainerClass: PropTypes.string,
  fullScreen: PropTypes.bool,
  flexWidth: PropTypes.bool,
  fullWidth: PropTypes.bool,
  zIndex: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.node]),
  // Redux
  jumpToStep: PropTypes.func.isRequired,
  updateEditingStep: PropTypes.func.isRequired,
  activeStepId: PropTypes.string,
  stepIds: PropTypes.arrayOf(PropTypes.string),
  shouldAppear: PropTypes.bool,
};

WizardContainer.defaultProps = {
  closeOnBackgroundClick: true,
  closeOnEscapeKey: true,
  dimBackground: true,
  children: null,
  fullScreen: false,
  flexWidth: false,
  fullWidth: false,
  height: null,
  wizardContainerClass: '',
  zIndex: 999,
  stepIds: [],
  // Redux
  activeStepId: null,
  shouldAppear: false,
};


export default connect(stateToProps, dispatchToProps)(WizardContainer);
