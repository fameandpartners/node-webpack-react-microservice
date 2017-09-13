'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpackNodeExternals = require('webpack-node-externals');

var _webpackNodeExternals2 = _interopRequireDefault(_webpackNodeExternals);

var _webpackMerge = require('webpack-merge');

var _webpackMerge2 = _interopRequireDefault(_webpackMerge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @flow

exports.default = function (webpackConfiguration /*: Object*/) /*: Object*/ {
  var nodeExternalsWhitelist /*: Array<string | RegExp>*/ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var manifestPath = _path2.default.resolve(webpackConfiguration.context, 'manifest.json');

  var compilerConfiguration = (0, _webpackMerge2.default)(webpackConfiguration, {
    devtool: 'hidden-source-map',
    externals: [(0, _webpackNodeExternals2.default)({
      importType: 'commonjs2',
      whitelist: nodeExternalsWhitelist
    })

    // @todo
    //
    // Relative resources are not being resolved, because 'require'
    // is relative to the path of the 'overrideRequire' and not to
    // the path of the original resource.
    //
    // @see https://github.com/liady/webpack-node-externals/issues/14
    // (context, request, callback) => {
    //   if (request.includes('node_modules')) {
    //     callback(null, 'require("' + request + '")');
    //     return;
    //   }
    //   callback();
    // }
    ],
    plugins: [new _webpack.DllPlugin({
      path: manifestPath
    })],
    target: 'node'
  });

  return compilerConfiguration;
};

module.exports = exports['default'];