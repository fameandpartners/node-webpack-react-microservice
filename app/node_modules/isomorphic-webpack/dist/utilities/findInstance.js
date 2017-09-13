'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

// @flow

exports.default = function (haystack /*: Array<Object>*/, needleConstructor /*: Function*/) /*: Object*/ {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = haystack[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var needle = _step.value;

      if (needle instanceof needleConstructor) {
        return needle;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  throw new Error('Instance not found.');
};

module.exports = exports['default'];