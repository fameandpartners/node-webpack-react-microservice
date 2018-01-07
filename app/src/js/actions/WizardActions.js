import WizardConstants from '../constants/WizardConstants';

export function jumpToStep({ activeStepId, previousStepId, shouldAppear = true }) {
  return {
    type: WizardConstants.ACTIVATE_STEP,
    activeStepId,
    previousStepId,
    shouldAppear,
  };
}

export function updateEditingStep({ isEditingStep, editSectionId = null }) {
  return {
    type: WizardConstants.EDIT_STEP,
    isEditingStep,
    editSectionId,
  };
}

export default {
  jumpToStep,
  updateEditingStep,
};
