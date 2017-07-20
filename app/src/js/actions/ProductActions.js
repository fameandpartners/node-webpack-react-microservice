import ProductConstants from '../constants/ProductConstants';

export function selectProductColor({ color }) {
  return {
    type: ProductConstants.SELECT_PRODUCT_COLOR,
    color,
  };
}

export default {
  selectProductColor,
};
