import CustomizationConstants from '../constants/CustomizationConstants';
import ProductConstants from '../constants/ProductConstants';

export function activateColorDrawer({ isActive }) {
  return {
    type: CustomizationConstants.ACTIVATE_COLOR_DRAWER,
    isActive,
  };
}

export function selectFabricColorGroup({ id }) {
  return {
    type: ProductConstants.SELECT_FABRIC_COLOR_GROUP,
    id,
  };
}

export default {
  activateColorDrawer,
  selectFabricColorGroup,
};
