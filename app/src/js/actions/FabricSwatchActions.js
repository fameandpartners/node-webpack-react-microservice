import FabricSwatchConstants from '../constants/FabricSwatchConstants';

export function updateFabricSwatchOrder({ swatchOrder }) {
  return {
    type: FabricSwatchConstants.UPDATE_FABRIC_SWATCH_ORDER,
    swatchOrder,
  };
}

export default {
  updateFabricSwatchOrder,
};
