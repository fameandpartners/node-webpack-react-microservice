import AppReducer, { $$initialState as $$appState } from './AppReducer';
import ModalReducer, { $$initialState as $$modalState } from './ModalReducer';
import ProductReducer, { $$initialState as $$productState } from './ProductReducer';

export default {
  $$appState: AppReducer,
  $$modalState: ModalReducer,
  $$productState: ProductReducer,
};

export const initialStates = {
  $$appState,
  $$modalState,
  $$productState,
};
