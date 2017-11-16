import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { string } from 'prop-types';

// Components
import ModalContainer from '../modal/ModalContainer';
import CreateFitID from '../size-profile/CreateFitID';
import Wizard from '../shared/wizard/Wizard';

// Constants
import ModalConstants from '../../constants/ModalConstants';

// CSS
import '../../../css/components/SizeProfile.scss';

function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    activeModalId: state.$$modalState.get('modalId'),
  };
}

function dispatchToProps() {
  return {};
}

class SizeProfileModal extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  injectModalStep() {
    const { activeModalId } = this.props;
    if (activeModalId === ModalConstants.SIZE_PROFILE_MODAL) {
      return <CreateFitID />;
    } else if (activeModalId === ModalConstants.FIT_ID_MODAL) {
      return <Wizard />;
    }
    return null;
  }

  render() {
    return (
      <ModalContainer
        modalContainerClass="grid-middle"
        modalIds={[
          ModalConstants.FIT_ID_MODAL,
          ModalConstants.SIZE_PROFILE_MODAL,
        ]}
      >
        <div
          className="SizeProfileModal u-width--full u-height--full"
        >
          { this.injectModalStep() }
        </div>
      </ModalContainer>
    );
  }
}

SizeProfileModal.propTypes = {
  activeModalId: string,
};

SizeProfileModal.defaultProps = {
  // Redux
  activeModalId: null,
};


export default connect(stateToProps, dispatchToProps)(SizeProfileModal);
