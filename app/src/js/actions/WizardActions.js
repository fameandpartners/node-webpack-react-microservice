import WizardConstants from '../constants/WizardConstants';

export function jumpToStep({ activeStepId, previousStepId, shouldAppear = true }) {
  return {
    type: WizardConstants.ACTIVATE_STEP,
    activeStepId,
    previousStepId,
    shouldAppear,
  };
}

export default {
  jumpToStep,
};
