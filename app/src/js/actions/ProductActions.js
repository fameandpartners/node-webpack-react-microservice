import CustomizationConstants from '../constants/CustomizationConstants';
import ProductConstants from '../constants/ProductConstants';

export function activateColorDrawer({ isActive }) {
  return {
    type: CustomizationConstants.ACTIVATE_COLOR_DRAWER,
    isActive,
  };
}

export function selectFabricColorGroup({ presentation }) {
  return {
    type: ProductConstants.SELECT_FABRIC_COLOR_GROUP,
    presentation,
  };
}

export function selectFabricGroup(name) {
  return {
    type: ProductConstants.SELECT_FABRIC_GROUP,
    name,
  };
}

export default {
  activateColorDrawer,
  selectFabricColorGroup,
  selectFabricGroup,
};
