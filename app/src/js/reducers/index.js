import AppReducer, { $$initialState as $$appState } from './AppReducer';
import ModalReducer, { $$initialState as $$modalState } from './ModalReducer';
import ProductReducer, { $$initialState as $$productState } from './ProductReducer';
import CartReducer, { $$initialState as $$cartState } from './CartReducer';
import CustomizationReducer, { $$initialState as $$customizationState } from './CustomizationReducer';
import CollectionFilterSortReducer, { $$initialState as $$collectionFilterSortState } from './CollectionFilterSortReducer';
import FlashSaleReducer, { $$initialState as $$flashSaleState } from './FlashSaleReducer';
import SuperCollectionReducer, { $$initialState as $$superCollectionState } from './SuperCollectionReducer';

export default {
  $$appState: AppReducer,
  $$modalState: ModalReducer,
  $$productState: ProductReducer,
  $$cartState: CartReducer,
  $$collectionFilterSortState: CollectionFilterSortReducer,
  $$customizationState: CustomizationReducer,
  $$flashSaleState: FlashSaleReducer,
  $$superCollectionState: SuperCollectionReducer,
};

export const initialStates = {
  $$appState,
  $$modalState,
  $$productState,
  $$cartState,
  $$collectionFilterSortState,
  $$customizationState,
  $$flashSaleState,
  $$superCollectionState,
};
