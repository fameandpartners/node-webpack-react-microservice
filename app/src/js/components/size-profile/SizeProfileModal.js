import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';

// Components
import WizardContainer from '../wizard/WizardContainer';
import SelectSizeProfile from './SelectSizeProfile';
import StandardSizing from './StandardSizing';
import AboutYouCombined from './AboutYouCombined';
import PetiteOrPlusSurvey from './PetiteOrPlusSurvey';
import CurrentDressFitCombined from './CurrentDressFitCombined';
import FitIDOverview from './FitIDOverview';
import CompletedFitID from './CompletedFitID';
import CalculateFitID from './CalculateFitID';

// Constants
import WizardConstants from '../../constants/WizardConstants';

// Breakpoint Decoration
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

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
      case WizardConstants.OVERALL_FIT_STEP:
        return <AboutYouCombined />;
      case WizardConstants.PETITE_PLUS_SURVEY_STEP:
        return <PetiteOrPlusSurvey />;
      case WizardConstants.CURRENT_DRESS_FIT_COMBINED_STEP:
        return <CurrentDressFitCombined />;
      case WizardConstants.FIT_ID_OVERVIEW_STEP:
        return <FitIDOverview />;
      case WizardConstants.CALCULATE_FIT_ID_STEP:
        return <CalculateFitID />;
      case WizardConstants.COMPLETED_FIT_ID_STEP:
        return <CompletedFitID />;
      default:
        return null;
    }
  }

  containerClassName() {
    const { activeStepId, breakpoint } = this.props;
    const isMobile = (breakpoint === 'tablet' || breakpoint === 'mobile');
    switch (activeStepId) {
      case WizardConstants.STANDARD_SIZING_STEP:
        return 'SizeProfileModal__fixed-width-small';
      case WizardConstants.CALCULATE_FIT_ID_STEP:
        return 'SizeProfileModal__fixed-width-small_square';
      default:
        return isMobile ? '' : 'SizeProfileModal__fixed-width-big u-height-big';
    }
  }

  wrapperClassName() {
    const { activeStepId } = this.props;
    switch (activeStepId) {
      case WizardConstants.CALCULATE_FIT_ID_STEP:
        return '';
      default:
        return 'u-height-big';
    }
  }

  render() {
    const { breakpoint } = this.props;
    const isMobile = (breakpoint === 'tablet' || breakpoint === 'mobile');

    return (
      <WizardContainer
        wizardContainerClass="SizeProfileWizardContainer grid-middle"
        wizardWrapperClass={this.wrapperClassName()}
        stepIds={[
          WizardConstants.SELECT_SIZE_PROFILE_STEP,
          WizardConstants.STANDARD_SIZING_STEP,
          WizardConstants.OVERALL_FIT_STEP,
          WizardConstants.PETITE_PLUS_SURVEY_STEP,
          WizardConstants.CURRENT_DRESS_FIT_COMBINED_STEP,
          WizardConstants.FIT_ID_OVERVIEW_STEP,
          WizardConstants.CALCULATE_FIT_ID_STEP,
          WizardConstants.COMPLETED_FIT_ID_STEP,
        ]}
        flexWidth
        slideUp={isMobile}
        fullScreen={isMobile}
        dimBackground={!isMobile}
      >
        <div className={this.containerClassName()} >
          {this.injectWizardStep()}
        </div>
      </WizardContainer>
    );
  }
}

SizeProfileModal.propTypes = {
  breakpoint: PropTypes.string.isRequired,
  activeStepId: PropTypes.string,
};

SizeProfileModal.defaultProps = {
  // Redux
  activeStepId: null,
};


export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(SizeProfileModal));
