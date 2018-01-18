import request from 'superagent';

// Polyfills
import win from '../polyfills/windowPolyfill';

function getBridesmaidsIncompatabilities(data) {
  // TODO: Initalize superagent with default REST API Json values
  const csrf = win.document.querySelector('meta[name="csrf-token"]');
  const token = csrf ? csrf.content : '';

  return request
    .post('/bridesmaids/incompatabilities')
    .query(data)
    .set('X-CSRF-Token', token)
    .set('Accept', 'application/json');
}

export default {
  getBridesmaidsIncompatabilities,
};
