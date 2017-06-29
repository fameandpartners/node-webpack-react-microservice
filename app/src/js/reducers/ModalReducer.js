import Immutable from 'immutable';
import ModalConstants from '../constants/ModalConstants';

export const $$initialState = Immutable.fromJS({
  modalId: null,
});

export default function ModalReducer($$state = $$initialState, action = null) {
  switch (action.type) {
    case ModalConstants.ACTIVATE_MODAL: {
      return $$state.merge({
        modalId: action.modalId,
      });
    }
    default: {
      return $$state;
    }
  }
}
