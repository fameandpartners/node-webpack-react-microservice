'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// @flow

/*:: import type {
  WebpackEntryConfigurationType
} from '../types';*/

exports.default = function (entry /*: WebpackEntryConfigurationType*/) /*: string*/ {
  if (typeof entry === 'string' || Array.isArray(entry)) {
    return 'main';
  } else {
    var bundleNames = Object.keys(entry);

    if (bundleNames.length === 0) {
      throw new Error('Invalid "entry" configuration.');
    } else if (bundleNames.length > 1) {
      // eslint-disable-next-line no-console
      console.log('Multiple bundles are not supported. See https://github.com/gajus/isomorphic-webpack/issues/10.');

      throw new Error('Unsupported "entry" configuration.');
    }

    return bundleNames[0];
  }
};

module.exports = exports['default'];