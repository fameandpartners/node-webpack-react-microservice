'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _memoryFs = require('memory-fs');

var _memoryFs2 = _interopRequireDefault(_memoryFs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a webpack compiler.
 *
 * Configures the compiler to use memory file system.
 */
// @flow

exports.default = function (compilerConfiguration /*: Object*/) /*: Compiler*/ {
  var fs = new _memoryFs2.default();

  var compiler = (0, _webpack2.default)(compilerConfiguration);

  compiler.outputFileSystem = fs;

  return compiler;
};

module.exports = exports['default'];