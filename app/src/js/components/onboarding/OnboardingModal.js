import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { string } from 'prop-types';

// Components
import ModalContainer from '../modal/ModalContainer';
import SignupModal from '../onboarding/SignupModal';
import LoginModal from '../onboarding/LoginModal';

// Constants
import ModalConstants from '../../constants/ModalConstants';

function mapStateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    activeModalId: state.$$modalState.get('modalId'),
  };
}

function dispatchToProps() {
  return {};
}


class OnboardingModal extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  injectModalStep() {
    const { activeModalId } = this.props;
    if (activeModalId === ModalConstants.SIGN_UP_MODAL) {
      return <SignupModal />;
    } else if (activeModalId === ModalConstants.LOG_IN_MODAL) {
      return <LoginModal />;
    }
    return null;
  }

  render() {
    return (
      <ModalContainer
        modalIds={[
          ModalConstants.SIGN_UP_MODAL,
          ModalConstants.LOG_IN_MODAL,
        ]}
      >
        { this.injectModalStep() }
      </ModalContainer>
    );
  }
}

OnboardingModal.propTypes = {
  activeModalId: string,
};

OnboardingModal.defaultProps = {
  // Redux
  activeModalId: null,
};


export default connect(mapStateToProps, dispatchToProps)(OnboardingModal);
