import WizardConstants from '../constants/WizardConstants';

export function jumpToStep({ activeStepId, previousStepId, shouldAppear = true }) {
  return {
    type: WizardConstants.ACTIVATE_STEP,
    activeStepId,
    previousStepId,
    shouldAppear,
  };
}

export function updateEditingStep({ isEditingStep }) {
  return {
    type: WizardConstants.EDIT_STEP,
    isEditingStep,
  };
}

export default {
  jumpToStep,
  updateEditingStep,
};
