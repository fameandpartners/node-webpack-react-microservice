/* eslint-disable no-undef */

import { assign } from 'lodash';
import win from '../polyfills/windowPolyfill';

function isGAAvailable() {
  return !!win.ga;
}

// function attachGAForTesting() {
//   // ATTACH FOR TESTING
//   win.ga = (...evtMeta) => {
//     console.warn(
//       'TEST MODE event being fired',
//       evtMeta,
//     );
//   };
// }

const defaultData = {
  nonInteraction: false,
};

export function trackEvent(eventData, dynamicData) {
  // ONLY FOR TESTING
  // attachGAForTesting();
  if (isGAAvailable()) {
    const event = assign({}, defaultData, eventData, dynamicData);
    window.dataLayer.push({
      event: event.action,
      eventDetail: { category: event.category, label: event.label },
    });
  }
}

export default {
  trackEvent,
};
