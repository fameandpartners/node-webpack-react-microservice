import AppReducer, { $$initialState as $$appState } from './AppReducer';
import ModalReducer, { $$initialState as $$modalState } from './ModalReducer';
import ProductReducer, { $$initialState as $$productState } from './ProductReducer';
import CartReducer, { $$initialState as $$cartState } from './CartReducer';

export default {
  $$appState: AppReducer,
  $$modalState: ModalReducer,
  $$productState: ProductReducer,
  $$cartState: CartReducer,
};

export const initialStates = {
  $$appState,
  $$modalState,
  $$productState,
  $$cartState,
};
