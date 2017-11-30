import request from 'superagent';

// Polyfills
import win from '../polyfills/windowPolyfill';

function postFlashSaleItem(lineItemId) {
  // TODO: Initalize superagent with default REST API Json values
  const csrf = win.document.querySelector('meta[name="csrf-token"]');
  const token = csrf ? csrf.content : '';

  return request
    .post(`/line_items/${lineItemId}`)
    .set('X-CSRF-Token', token)
    .set('Accept', 'application/json');
}

export default {
  postFlashSaleItem,
};
