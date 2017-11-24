import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { string } from 'prop-types';

// Components
import WizardContainer from '../wizard/WizardContainer';
import SelectSizeProfile from '../size-profile/SelectSizeProfile';
import StandardSizing from '../size-profile/StandardSizing';

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
      return <SelectSizeProfile />;
    } else if (activeModalId === ModalConstants.STANDARD_SIZING_MODAL) {
      return <StandardSizing />;
    } else if (activeModalId === ModalConstants.START_FIT_ID_WIZARD) {
      return <SelectSizeProfile />;
    }
    return null;
  }

  render() {
    return (
      <WizardContainer
        modalContainerClass="SizeProfileWizardContainer grid-middle"
        modalIds={[
          ModalConstants.SIZE_PROFILE_MODAL,
          ModalConstants.STANDARD_SIZING_MODAL,
          ModalConstants.START_FIT_ID_WIZARD,
        ]}
        flexWidth
      >
        <div
          className="SizeProfileModal u-width-big"
        >
          { this.injectModalStep() }
        </div>
      </WizardContainer>
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
