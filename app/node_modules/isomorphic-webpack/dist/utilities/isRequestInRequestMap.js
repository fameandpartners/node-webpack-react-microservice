"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

// @flow

exports.default = function (request /*: string*/, requestMap /*: Object*/) /*: boolean*/ {
  return requestMap.hasOwnProperty(request);
};

module.exports = exports["default"];