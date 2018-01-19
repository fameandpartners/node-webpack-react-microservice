import request from 'superagent';

// Polyfills
import win from '../polyfills/windowPolyfill';

function getBridesmaidsIncompatabilities({
  length,
  customizationIds,
  productId,
}) {
  // TODO: Initalize superagent with default REST API Json values
  const csrf = win.document.querySelector('meta[name="csrf-token"]');
  const token = csrf ? csrf.content : '';

  return request
    .get('/api/v1/bridesmaids/incompatabilities')
    .query({
      length,
      product_id: productId,
      customization_ids: customizationIds,
    })
    .set('X-CSRF-Token', token)
    .set('Accept', 'application/json');
}

export default {
  getBridesmaidsIncompatabilities,
};
