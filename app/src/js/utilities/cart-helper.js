/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable array-callback-return */
/* eslint-disable radix */

// polyfills
import win from '../polyfills/windowPolyfill';

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

function mapSizeIdFromSortKey(sortKey, auSite) {
  /**
   *  Legacy checkout code needs the size ID for mapping the dress,
   *  variant ID, thought it was less intrusive to map it from the
   *  user's selected size (which is identical to the sort_key) vs.
   *  rewriting the size selection component.
   */

  let sizeKey;

  if (auSite) {
    sizeKey = Number(sortKey) - 4;
  } else {
    sizeKey = Number(sortKey);
  }

  const sizeArr = win.PdpDataFull.product.sizes.table.default;

  return sizeArr.filter(i => i.table.sort_key === sizeKey)[0].table.id;
}

function transformLineItem(lineItem, auSite) {
  /*
    POST for legacy checkout code expects object in the following format:
    {
      size_id:            INT,
      color_id:           INT,
      variant_id:         INT,
      making_options_ids: INT,
      height_value:       INT,
      height_unit:        STRING,
      customizations_ids: ARRAY OF INT,
      dress_variant_id:   INT,
    }
  */

  const sizeId = mapSizeIdFromSortKey(lineItem.selectedDressSize, auSite);

  const transformed = {
    color_id: lineItem.color.id,
    customizations_ids: lineItem.addons.map(a => a.id),
    dress_variant_id: getDressVariantId(
      win.PdpDataFull.product.available_options.table.variants,
      lineItem.color.id,
      sizeId),
    height_unit: lineItem.selectedMeasurementMetric,
    height_value: lineItem.selectedHeightValue,
    making_options_ids: [lineItem.expressMakingID || 0],
    size_id: sizeId,
    variant_id: win ? win.PdpDataFull.product.master_id : null,
  };

  return transformed;
}

export function addToCart(item, auSite) {
  if (win.app && win.app.shopping_cart) {
    const transformedLineItem = transformLineItem(item, auSite);
    console.log(transformedLineItem);

    win.app.shopping_cart.addProduct(transformedLineItem);
  }
}

export default {
  addToCart,
};
