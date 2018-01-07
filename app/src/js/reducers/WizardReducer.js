import Immutable from 'immutable';
import WizardConstants from '../constants/WizardConstants';

export const $$initialState = Immutable.fromJS({
  activeStepId: null,
  shouldAppear: false,
  isEditingStep: false,
  editSectionId: null,
});

export default function WizardReducer($$state = $$initialState, action = null) {
  switch (action.type) {
    case WizardConstants.ACTIVATE_STEP: {
      return $$state.merge({
        // Do not wipe activeStepId, if one is not provided
        activeStepId: action.activeStepId ? action.activeStepId : $$state.get('activeStepId'),
        shouldAppear: action.shouldAppear,
      });
    }
    case WizardConstants.EDIT_STEP: {
      return $$state.merge({
        isEditingStep: action.isEditingStep,
        editSectionId: action.editSectionId,
      });
    }
    default: {
      return $$state;
    }
  }
}
