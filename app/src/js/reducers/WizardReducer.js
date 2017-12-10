import Immutable from 'immutable';
import WizardConstants from '../constants/WizardConstants';

export const $$initialState = Immutable.fromJS({
  activeStepId: null,
  shouldAppear: false,
});

export default function WizardReducer($$state = $$initialState, action = null) {
  switch (action.type) {
    case WizardConstants.ACTIVATE_STEP: {
      return $$state.merge({
        // Do not wipe activeStepId or previousStepId, if one is not provided
        activeStepId: action.activeStepId ? action.activeStepId : $$state.get('activeStepId'),
        shouldAppear: action.shouldAppear,
      });
    }
    default: {
      return $$state;
    }
  }
}