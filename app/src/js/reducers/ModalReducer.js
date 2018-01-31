import Immutable from 'immutable';
import ModalConstants from '../constants/ModalConstants';

export const $$initialState = Immutable.fromJS({
  modalId: null,
  shouldAppear: false,
  activeSlideIndex: 0,
});

export default function ModalReducer($$state = $$initialState, action = null) {
  switch (action.type) {
    case ModalConstants.ACTIVATE_MODAL: {
      return $$state.merge({
        // Do not wipe modalId, if one is not provided
        modalId: action.modalId ? action.modalId : $$state.get('modalId'),
        shouldAppear: action.shouldAppear,
        // This makes me upset, dirty pollution v
        activeSlideIndex: action.activeSlideIndex ? action.activeSlideIndex : 0,
      });
    }
    default: {
      return $$state;
    }
  }
}
