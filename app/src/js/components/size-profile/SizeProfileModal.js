import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { string } from 'prop-types';

// Components
import WizardContainer from '../wizard/WizardContainer';
import SelectSizeProfile from './SelectSizeProfile';
import StandardSizing from './StandardSizing';
import FitIdOverallFit from './FitIdOverallFit';

// Constants
import WizardConstants from '../../constants/WizardConstants';

// CSS
import '../../../css/components/SizeProfile.scss';

function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    activeStepId: state.$$wizardState.get('activeStepId'),
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

  injectWizardStep() {
    const { activeStepId } = this.props;
    switch (activeStepId) {
      case WizardConstants.SELECT_SIZE_PROFILE_STEP:
        return <SelectSizeProfile />;
      case WizardConstants.STANDARD_SIZING_STEP:
        return <StandardSizing />;
      case WizardConstants.FIT_ID_OVERALL_FIT_STEP:
        return <FitIdOverallFit />;
      default:
        return null;
    }
  }

  render() {
    return (
      <WizardContainer
        wizardContainerClass="SizeProfileWizardContainer grid-middle"
        stepIds={[
          WizardConstants.SELECT_SIZE_PROFILE_STEP,
          WizardConstants.STANDARD_SIZING_STEP,
          WizardConstants.FIT_ID_OVERALL_FIT_STEP,
        ]}
        flexWidth
      >
        <div
          className="SizeProfileModal u-width-big"
        >
          { this.injectWizardStep() }
        </div>
      </WizardContainer>
    );
  }
}

SizeProfileModal.propTypes = {
  activeStepId: string,
};

SizeProfileModal.defaultProps = {
  // Redux
  activeStepId: null,
};


export default connect(stateToProps, dispatchToProps)(SizeProfileModal);
