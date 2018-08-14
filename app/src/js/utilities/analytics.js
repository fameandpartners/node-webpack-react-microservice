import win from '../polyfills/windowPolyfill';

function addToCart({ id, productCentsBasePrice, productTitle, productVariantId }) {
  if (!win.dataLayer) { return console.warn('dataLayer is not available!'); }

  return win.dataLayer.push({
    event: 'Cart - Product Added',
    eventDetail: {
      product: {
        id,
        sku: productVariantId,
        name: productTitle,
        price: productCentsBasePrice / 100,
        type: 'Dress',
      },
    },
  });
}


function removeFromCart({ id, productCentsBasePrice, productTitle, productVariantId }) {
  if (!win.dataLayer) { return console.warn('dataLayer is not available!'); }

  return win.dataLayer.push({
    event: 'Cart - Product Removed',
    eventDetail: {
      product: {
        id,
        sku: productVariantId,
        name: productTitle,
        price: productCentsBasePrice / 100,
        type: 'Dress',
      },
    },
  });
}


export default {
  addToCart,
  removeFromCart,
};
