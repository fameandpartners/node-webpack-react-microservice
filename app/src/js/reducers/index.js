import AppReducer, { $$initialState as $$appState } from './AppReducer';
import BDCustomizationReducer, { $$initialState as $$bdCustomizationState } from './BDCustomizationReducer';
import ModalReducer, { $$initialState as $$modalState } from './ModalReducer';
import WizardReducer, { $$initialState as $$wizardState } from './WizardReducer';
import ProductReducer, { $$initialState as $$productState } from './ProductReducer';
import CartReducer, { $$initialState as $$cartState } from './CartReducer';
import CustomizationReducer, { $$initialState as $$customizationState } from './CustomizationReducer';
import CollectionFilterSortReducer, { $$initialState as $$collectionFilterSortState } from './CollectionFilterSortReducer';
import FlashSaleReducer, { $$initialState as $$flashSaleState } from './FlashSaleReducer';
import BridesmaidsFilterReducer, { $$initialState as $$bridesmaidsFilterState } from './BridesmaidsFilterReducer';
import FabricSwatchReducer, { $$initialState as $$fabricSwatchState } from './FabricSwatchReducer';
import SizeProfileReducer, { $$initialState as $$sizeProfileState } from './SizeProfileReducer';

export default {
  $$appState: AppReducer,
  $$bdCustomizationState: BDCustomizationReducer,
  $$modalState: ModalReducer,
  $$wizardState: WizardReducer,
  $$productState: ProductReducer,
  $$cartState: CartReducer,
  $$collectionFilterSortState: CollectionFilterSortReducer,
  $$customizationState: CustomizationReducer,
  $$flashSaleState: FlashSaleReducer,
  $$bridesmaidsFilterState: BridesmaidsFilterReducer,
  $$fabricSwatchState: FabricSwatchReducer,
  $$sizeProfileState: SizeProfileReducer,
};

export const initialStates = {
  $$appState,
  $$bdCustomizationState,
  $$modalState,
  $$wizardState,
  $$productState,
  $$cartState,
  $$collectionFilterSortState,
  $$customizationState,
  $$flashSaleState,
  $$bridesmaidsFilterState,
  $$fabricSwatchState,
  $$sizeProfileState,
};
