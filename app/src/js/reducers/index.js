import AppReducer, { $$initialState as $$appState } from './AppReducer';
import BDCustomizationReducer, { $$initialState as $$bdCustomizationState } from './BDCustomizationReducer';
import ModalReducer, { $$initialState as $$modalState } from './ModalReducer';
import ProductReducer, { $$initialState as $$productState } from './ProductReducer';
import CartReducer, { $$initialState as $$cartState } from './CartReducer';
import CustomizationReducer, { $$initialState as $$customizationState } from './CustomizationReducer';
import CollectionFilterSortReducer, { $$initialState as $$collectionFilterSortState } from './CollectionFilterSortReducer';
import FlashSaleReducer, { $$initialState as $$flashSaleState } from './FlashSaleReducer';

export default {
  $$appState: AppReducer,
  $$bdCustomizationState: BDCustomizationReducer,
  $$modalState: ModalReducer,
  $$productState: ProductReducer,
  $$cartState: CartReducer,
  $$collectionFilterSortState: CollectionFilterSortReducer,
  $$customizationState: CustomizationReducer,
  $$flashSaleState: FlashSaleReducer,
};

export const initialStates = {
  $$appState,
  $$bdCustomizationState,
  $$modalState,
  $$productState,
  $$cartState,
  $$collectionFilterSortState,
  $$customizationState,
  $$flashSaleState,
};
