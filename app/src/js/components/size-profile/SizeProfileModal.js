import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import classnames from 'classnames';

// Components
import WizardContainer from '../wizard/WizardContainer';
import SelectSizeProfile from './SelectSizeProfile';
import StandardSizing from './StandardSizing';
import AboutYouCombined from './AboutYouCombined';
import AboutYouMobile from './AboutYouMobile';
import PetiteOrPlusSurvey from './PetiteOrPlusSurvey';
import PetiteOrPlusMobile from './PetiteOrPlusMobile';
import CurrentDressFitCombined from './CurrentDressFitCombined';
import CurrentDressFitMobile from './CurrentDressFitMobile';
import FitIDOverview from './FitIDOverview';
import FitIDOverviewMobile from './FitIDOverviewMobile';
import CompletedFitID from './CompletedFitID';
import CompletedFitIDMobile from './CompletedFitIDMobile';
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
    const { activeStepId, breakpoint } = this.props;
    const isMobile = (breakpoint === 'tablet' || breakpoint === 'mobile');

    switch (activeStepId) {
      case WizardConstants.SELECT_SIZE_PROFILE_STEP:
        return <SelectSizeProfile />;
      case WizardConstants.STANDARD_SIZING_STEP:
        return <StandardSizing />;
      case WizardConstants.OVERALL_FIT_STEP:
        return isMobile ? <AboutYouMobile /> : <AboutYouCombined />;
      case WizardConstants.PETITE_PLUS_SURVEY_STEP:
        return isMobile ? <PetiteOrPlusMobile /> : <PetiteOrPlusSurvey />;
      case WizardConstants.CURRENT_DRESS_FIT_COMBINED_STEP:
        return isMobile ? <CurrentDressFitMobile /> : <CurrentDressFitCombined />;
      case WizardConstants.FIT_ID_OVERVIEW_STEP:
        return isMobile ? <FitIDOverviewMobile /> : <FitIDOverview />;
      case WizardConstants.CALCULATE_FIT_ID_STEP:
        return <CalculateFitID />;
      case WizardConstants.COMPLETED_FIT_ID_STEP:
        return isMobile ? <CompletedFitIDMobile /> : <CompletedFitID />;
      default:
        return null;
    }
  }

  stepClassName() {
    const { activeStepId, breakpoint } = this.props;
    const isMobile = (breakpoint === 'tablet' || breakpoint === 'mobile');

    switch (activeStepId) {
      case WizardConstants.STANDARD_SIZING_STEP:
        return isMobile ? '' : 'SizeProfileModal__fixed-width-small';
      case WizardConstants.CALCULATE_FIT_ID_STEP:
        return isMobile ? 'u-mt--huge' : 'SizeProfileModal__fixed-width-small_square';
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
        wizardContainerClass={classnames(
          'SizeProfileWizardContainer grid-middle',
          {
            'mobile-version': isMobile,
          },
        )}
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
        flexWidth={!isMobile}
        slideUp={isMobile}
        fullScreen={isMobile}
        dimBackground={!isMobile}
      >
        <div className={this.stepClassName()} >
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
