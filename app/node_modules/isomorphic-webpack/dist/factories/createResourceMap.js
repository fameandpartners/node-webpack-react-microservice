"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// @flow

/*:: type ManifestContentMapType = {
  [key: string]: {|
    id: number
  |}
};*/


/**
 * Creates an object that maps request to module ID.
 *
 * A 'request' is a require path used in the application
 * resolved to a relative path to the project context, e.g.
 * if `./src/test/index.js` requires `require('./style.css')`
 * the the 'request' is `./src/test.style.css`.
 */
/*:: type ResourceMapType = {
  [key: string]: number
};*/

exports.default = function (manifestContent /*: ManifestContentMapType*/) /*: ResourceMapType*/ {
  var map = {};

  var paths = Object.keys(manifestContent);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = paths[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var path = _step.value;

      map[path] = manifestContent[path].id;
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

  return map;
};

module.exports = exports["default"];