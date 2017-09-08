/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable array-callback-return */
/* eslint-disable radix */

/**
 *  These actions should be in Redux, just temporarily moving into
 *  separate helpers in order to speed up the Rails app merge process.
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
  const sizeArr = window.PdpDataFull.product.sizes.table.default;

  return sizeArr.filter(i => i.table.sort_key === Number(sortKey))[0].table.id;
}

function transformLineItem(lineItem) {
  /*
    TRANSFORM this:
    {
      "productId": 1087,
      "productImage": "https://d1msb7dh8kb0o9.cloudfront.net/spree/products/30242/original/c161045-navy-front.jpg?1469112720",
      "productTitle": "Matteah",
      "productCentsBasePrice": 32900,
      "color": {
        "id": 70,
        "name": "navy",
        "presentation": "Navy",
        "hexValue": "#0E0E47",
        "patternUrl": "this-does-not-exist-yet.png"
      },
      "addons": [
        {
          "id": 2743,
          "description": "Remove Armbands And Extend Ruffle At Sides And Back",
          "centsTotal": 999
        }
      ]
    }

    TO this:
    {
      size_id:            parseNumber($this.find('#pdpCartSizeId').val()),
      color_id:           parseNumber($this.find('#pdpCartColorId').val()),
      variant_id:         parseNumber($this.find('#pdpCartVariantId').val()),
      making_options_ids: parseNumber($this.find('#pdpCartMakingId').val()),
      height_value:       parseNumber($this.find('#pdpCartHeight').val()),
      height_unit:        $this.find('#pdpCartHeightUnit').val(),
      customizations_ids: $this.find('#pdpCartCustomId').val().split(','),
      dress_variant_id:   parseNumber($this.find('#pdpCartDressVariantId').val())
    }
  */

  const transformed = {
    color_id: window.__userColorData.color_id,
    customizations_ids: lineItem.addons.map(a => a.id),
    dress_variant_id: getDressVariantId(
      window.PdpDataFull.product.available_options.table.variants,
      lineItem.color.id,
      window.__userSizeData.size_id),
    height_unit: window.__userSizeData.height_unit,
    height_value: window.__userSizeData.height_value,
    making_options_ids: null,
    size_id: window.__userSizeData.size_id,
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

export function updateSizeData(sizeSortKey, height, unit) {
  console.log(`Saving Measurements: ${sizeSortKey}, ${height}, ${unit}`);

  if (window) {
    window.__userSizeData = {
      height_unit: unit,
      height_value: height,
      size_id: mapSizeIdFromSortKey(sizeSortKey),
    };
  }
}

export function updateColorData(color) {
  console.log(`Saving Color: ${color}`);

  if (window) {
    window.__userColorData = {
      color_id: color,
    };
  }
}

export default {
  addToCart,
  updateSizeData,
  updateColorData,
};
