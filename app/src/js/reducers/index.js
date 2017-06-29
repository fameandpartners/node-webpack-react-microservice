import AppReducer, { $$initialState as $$appState } from './AppReducer';
import ModalReducer, { $$initialState as $$modalState } from './ModalReducer';

export default {
  $$appState: AppReducer,
  $$modalState: ModalReducer,
};

export const initialStates = {
  $$appState,
  $$modalState,
};
