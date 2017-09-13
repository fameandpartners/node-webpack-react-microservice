'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ajv = require('ajv');

var _ajv2 = _interopRequireDefault(_ajv);

var _ajvKeywords = require('ajv-keywords');

var _ajvKeywords2 = _interopRequireDefault(_ajvKeywords);

var _isomorphicWebpackConfigurationSchema = require('../schemas/isomorphicWebpackConfigurationSchema.json');

var _isomorphicWebpackConfigurationSchema2 = _interopRequireDefault(_isomorphicWebpackConfigurationSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*:: import type {
  UserIsomorphicWebpackConfigurationType,
  IsomorphicWebpackConfigurationType
} from '../types';*/ // @flow

var ajv = (0, _ajv2.default)();

(0, _ajvKeywords2.default)(ajv);

var validate = ajv.compile(_isomorphicWebpackConfigurationSchema2.default);

exports.default = function () /*: IsomorphicWebpackConfigurationType*/ {
  var userIsomorphicWebpackConfig /*: UserIsomorphicWebpackConfigurationType*/ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!validate(userIsomorphicWebpackConfig)) {
    // eslint-disable-next-line no-console
    console.log('validate.errors', validate.errors);

    throw new Error('Invalid configuration.');
  }

  var isomorphicWebpackConfiguration = {
    // eslint-disable-next-line no-undefined
    nodeExternalsWhitelist: userIsomorphicWebpackConfig.nodeExternalsWhitelist === undefined ? [] : userIsomorphicWebpackConfig.nodeExternalsWhitelist,

    // eslint-disable-next-line no-undefined
    useCompilationPromise: userIsomorphicWebpackConfig.useCompilationPromise === undefined ? false : Boolean(userIsomorphicWebpackConfig.useCompilationPromise)
  };

  return isomorphicWebpackConfiguration;
};

module.exports = exports['default'];