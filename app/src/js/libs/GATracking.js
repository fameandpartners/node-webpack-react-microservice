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

/* eslint-disable no-param-reassign */
export function trackEvent(eventData, dynamicData) {
  // ONLY FOR TESTING
  // attachGAForTesting();
  if (isGAAvailable()) {
    const event = assign({}, defaultData, eventData, dynamicData);
    win.ga('send', 'event', {
      eventCategory: event.category,
      eventAction: event.action,
      eventLabel: event.label,
      eventValue: event.value,
      nonInteraction: event.nonInteraction,
    });
  }
}

export default {
  trackEvent,
};
