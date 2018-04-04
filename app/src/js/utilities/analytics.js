import win from '../polyfills/windowPolyfill';

function addToCart({ currency, productCentsBasePrice, productId, productTitle }) {
  if (!win.dataLayer) { return console.warn('dataLayer is not available!'); }

  return win.dataLayer.push({
    event: 'addToCart',
    ecommerce: {
      currencyCode: currency, // ex: "USD", "CAD"
      add: {
        products: [{
          id: productId,  // Product ID or SKU number(String Type)
          name: productTitle,    // Product name(String Type)
          price: productCentsBasePrice / 100, // Product price(String Use Only XXXX.XX formatting)
          category: 'dress', // Category where this product is found in(Dresses, Skirts, etc...)
          variant: undefined, // NOTE: Not passed by backend & can be not surmised beforehand
          quantity: 1, // Product quantity being added(Number Type)
        }],
      },
    },
  });
}

function removeFromCart({ id, productCentsBasePrice, productTitle, productVariantId }) {
  if (!win.dataLayer) { return console.warn('dataLayer is not available!'); }

  return win.dataLayer.push({
    event: 'removeFromCart',
    ecommerce: {
      remove: {
        products: [{
          id,  // Product ID or SKU number(String Type)
          name: productTitle,    // Product name(String Type)
          price: productCentsBasePrice / 100,   // Product price(String Type. Use Only XXXX.XX )
          category: 'dress', // Category where this product is found in(Dresses, Skirts, etc... Do not include search result as a category) (String Type)
          variant: productVariantId, // Product Fabric and Color Selected(String Type)
          quantity: 1, // Product quantity being added(Number Type)
        }],
      },
    },
  });
}


export default {
  addToCart,
  removeFromCart,
};
