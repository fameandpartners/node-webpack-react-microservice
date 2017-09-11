/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable array-callback-return */
/* eslint-disable radix */

/**
 *  This helper file handles the legacy checkout code POST.
 */

function getDressVariantId(variants, color, size) {
  let id;

  variants.map((val) => {
    if (parseInt(val.table.color_id) === parseInt(color)
      && parseInt(val.table.size_id) === parseInt(size)) {
      id = val.table.id;
    }
  });

  return id;
}

function mapSizeIdFromSortKey(sortKey) {
  /**
   *  Legacy checkout code needs the size ID for mapping the dress,
   *  variant ID, thought it was less intrusive to map it from the
   *  user's selected size (which is identical to the sort_key) vs.
   *  rewriting the size selection component.
   */

  const sizeArr = window.PdpDataFull.product.sizes.table.default;

  return sizeArr.filter(i => i.table.sort_key === Number(sortKey))[0].table.id;
}

function transformLineItem(lineItem) {
  /*
    POST for legacy checkout code expects object in the following format:
    {
      size_id:            INT,
      color_id:           INT,
      variant_id:         INT,
      making_options_ids: INT ???,
      height_value:       INT,
      height_unit:        STRING,
      customizations_ids: ARRAY OF INT,
      dress_variant_id:   INT,
    }
  */

  const sizeId = mapSizeIdFromSortKey(lineItem.selectedDressSize);

  const transformed = {
    color_id: lineItem.color.id,
    customizations_ids: lineItem.addons.map(a => a.id),
    dress_variant_id: getDressVariantId(
      window.PdpDataFull.product.available_options.table.variants,
      lineItem.color.id,
      sizeId),
    height_unit: lineItem.selectedMeasurementMetric,
    height_value: lineItem.selectedHeightValue,
    making_options_ids: null,
    size_id: sizeId,
    variant_id: window ? window.PdpDataFull.product.master_id : null,
  };

  console.group('transformLineItem()');
  console.log(lineItem);
  console.groupEnd();

  return transformed;
}

export function addToCart(item) {
  if (window.app && window.app.shopping_cart) {
    const transformedLineItem = transformLineItem(item);
    console.log(transformedLineItem);

    window.app.shopping_cart.addProduct(transformedLineItem);
  }
}

export default {
  addToCart,
};
