'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// @flow

/*:: import type {
  WebpackEntryConfigurationType
} from '../types';*/

exports.default = function (entry /*: WebpackEntryConfigurationType*/) /*: string*/ {
  if (typeof entry === 'string') {
    return entry;
  } else if (Array.isArray(entry)) {
    return entry[entry.length - 1];
  } else {
    var bundleNames = Object.keys(entry);

    if (bundleNames.length === 0) {
      throw new Error('Invalid "entry" configuration.');
    } else if (bundleNames.length > 1) {
      // eslint-disable-next-line no-console
      console.log('Multiple bundles are not supported. See https://github.com/gajus/isomorphic-webpack/issues/10.');

      throw new Error('Unsupported "entry" configuration.');
    }

    var bundle = entry[bundleNames[0]];

    if (typeof bundle === 'string') {
      return bundle;
    } else if (Array.isArray(bundle)) {
      return bundle[bundle.length - 1];
    } else {
      throw new Error('Invalid configuration.');
    }
  }
};

module.exports = exports['default'];