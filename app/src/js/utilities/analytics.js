import win from '../polyfills/windowPolyfill';

function addToCart({ id, productCentsBasePrice, productTitle, productVariantId }) {
  if (!win.dataLayer) { return console.warn('dataLayer is not available!'); }

  return win.dataLayer.push({
    event: 'addToCart',
    eventDetails: {
      product: {
        id,
        sku: productVariantId,
        name: productTitle,
        price: productCentsBasePrice / 100,
        type: 'dresses',
      },
    },
  });
}


function removeFromCart({ id, productCentsBasePrice, productTitle, productVariantId }) {
  if (!win.dataLayer) { return console.warn('dataLayer is not available!'); }

  return win.dataLayer.push({
    event: 'removeFromCart',
    eventDetails: {
      product: {
        id,
        sku: productVariantId,
        name: productTitle,
        price: productCentsBasePrice / 100,
        type: 'dresses',
      },
    },
  });
}


export default {
  addToCart,
  removeFromCart,
};
