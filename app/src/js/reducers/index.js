import AppReducer, { $$initialState as $$appState } from './AppReducer';
import BDCustomizationReducer, { $$initialState as $$bdCustomizationState } from './BDCustomizationReducer';
import BridesmaidsFilterReducer, { $$initialState as $$bridesmaidsFilterState } from './BridesmaidsFilterReducer';
import CartReducer, { $$initialState as $$cartState } from './CartReducer';
import CustomizationReducer, { $$initialState as $$customizationState } from './CustomizationReducer';
import CollectionFilterSortReducer, { $$initialState as $$collectionFilterSortState } from './CollectionFilterSortReducer';
import FabricSwatchReducer, { $$initialState as $$fabricSwatchState } from './FabricSwatchReducer';
import FlashSaleReducer, { $$initialState as $$flashSaleState } from './FlashSaleReducer';
import ModalReducer, { $$initialState as $$modalState } from './ModalReducer';
import ProductReducer, { $$initialState as $$productState } from './ProductReducer';
import SuperCollectionReducer, { $$initialState as $$superCollectionState } from './SuperCollectionReducer';
import ThemeReducer, { $$initialState as $$themeState } from './ThemeReducer';

export default {
  $$appState: AppReducer,
  $$bdCustomizationState: BDCustomizationReducer,
  $$bridesmaidsFilterState: BridesmaidsFilterReducer,
  $$cartState: CartReducer,
  $$collectionFilterSortState: CollectionFilterSortReducer,
  $$customizationState: CustomizationReducer,
  $$fabricSwatchState: FabricSwatchReducer,
  $$flashSaleState: FlashSaleReducer,
  $$modalState: ModalReducer,
  $$productState: ProductReducer,
  $$superCollectionState: SuperCollectionReducer,
  $$themeState: ThemeReducer,
};

export const initialStates = {
  $$appState,
  $$bdCustomizationState,
  $$bridesmaidsFilterState,
  $$fabricSwatchState,
  $$cartState,
  $$collectionFilterSortState,
  $$customizationState,
  $$flashSaleState,
  $$modalState,
  $$productState,
  $$superCollectionState,
  $$themeState,
};
