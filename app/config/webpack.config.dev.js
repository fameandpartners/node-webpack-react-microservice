const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const getClientEnvironment = require('./env');
const paths = require('./paths');
const path = require('path');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 8001;

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = '/';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = '';
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

const StyleLintPlugin = require('stylelint-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: 'webpack/static/[name].css',
  disable: false,
});


const standardEntries = [
  // FOR HOT RELOADING
  `webpack-dev-server/client?http://0.0.0.0:${DEFAULT_PORT}`, // WebpackDevServer host and port
  'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
  // Include an alternative client for WebpackDevServer. A client's job is to
  // connect to WebpackDevServer by a socket and get notified about changes.
  // When you save a file, the client will either apply hot updates (in case
  // of CSS changes), or refresh the page (in case of JS changes). When you
  // make a syntax error, this client will display a syntax error overlay.
  // Note: instead of the default WebpackDevServer client, we use a custom one
  // to bring better experience for Create React App users. You can replace
  // the line below with these two lines if you prefer the stock client:
  // require.resolve('webpack-dev-server/client') + '?/',
  // require.resolve('webpack/hot/dev-server'),
  require.resolve('react-dev-utils/webpackHotDevClient'),
  // We ship a few polyfills by default:
  require.resolve('./polyfills'),
];

function webclientSrcPath(subdir) {
  return path.join(__dirname, "../node_modules/webclient/src", subdir);
}

// This is the development configuration.
// It is focused on developer experience and fast rebuilds.
// The production configuration is different and lives in a separate file.
module.exports = {
  // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
  // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
  devtool: 'cheap-module-source-map',
  // These are the "entry points" to our application.
  // This means they will be the "root" imports that are included in JS bundle.
  // The first two entry points enable "hot" CSS and auto-refreshes for JS.
  entry: {
    pdp: [
      ...standardEntries,
      paths.appIndexJs,
    ], // PDP
    flash: [
      ...standardEntries,
      paths.flashIndexJs,
    ], // Flash Sale + Flash Sale Filtering
    // We include the app code last so that if there is a runtime error during
    // initialization, it doesn't blow up the WebpackDevServer client, and
    // changing JS code would still trigger a refresh.
  },
  output: {
    // Next line is not used in dev but WebpackDevServer crashes without it:
    path: paths.appBuild,
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: 'webpack/static/[name].js',
    // This is the URL that app is served from. We use "/" in development.
    publicPath,
  },
  resolve: {
    // This allows you to set a fallback for where Webpack should look for modules.
    // We read `NODE_PATH` environment variable in `paths.js` and pass paths here.
    // We placed these paths second because we want `node_modules` to "win"
    // if there are any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebookincubator/create-react-app/issues/253
    modules: ['node_modules'].concat(paths.nodePaths),
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools, although we do not recommend using it, see:
    // https://github.com/facebookincubator/create-react-app/issues/290
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    alias: {
      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      'react-native': 'react-native-web',
      '@containers': webclientSrcPath('common/containers'),
      '@common': webclientSrcPath('common'),
      '@components': webclientSrcPath('common/components'),
      '@constants': webclientSrcPath('common/constants'),
      '@services': webclientSrcPath('common/services'),
      '@svg': webclientSrcPath('common/assets/svg'),
      '@scss': webclientSrcPath('common/assets/scss'),
      '@transforms': webclientSrcPath('common/transforms'),
      '@translations': webclientSrcPath('common/translations'),
      '@typings': webclientSrcPath('typings'),
      '@utils': webclientSrcPath('utils')
    },
  },
  module: {
    rules: [
      { parser: { amd: false } },
      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [{
          loader: 'eslint-loader',
        }],
        include: paths.appSrc,
      },

      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.(ts|tsx)$/,
        
        use: [ 
          {
            loader: 'babel-loader',
          },
          {
            loader: "ts-loader", options: {transpileOnly: true}
          }
        ],
      },

      // ** ADDING/UPDATING LOADERS **
      // The "url" loader handles all assets unless explicitly excluded.
      // The `exclude` list *must* be updated with every change to loader extensions.
      // When adding a new loader, you must add its `test`
      // as a new entry in the `exclude` list for "url" loader.

      // "url" loader embeds assets smaller than specified size as data URLs to avoid requests.
      // Otherwise, it acts like the "file" loader.
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.(ts|tsx)$/,
          /\.scss$/,
          /\.json$/,
          /\.svg$/,
        ],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'webpack/static/[name].[hash:8].[ext]',
        },
      },
      // Process JS with Babel.
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: 'babel-loader',
        options: {
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
        },
      },
      // "style" loader turns CSS into JS modules that inject <style> tags.
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "postcss" loader applies autoprefixer to our CSS.
      // "sass" loader compiles Sass to CSS
      // In production, we use a plugin to extract that CSS to a file, but
      // in development "style" loader enables hot editing of CSS.
      {
        test: /\.relaunch\.scss$/,
        use: extractSass.extract({
          use: [
                  { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                plugins() {
                  return [
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                    }),
                  ];
                },
              },
            },
            // wrap our CSS to avoid styling conflicts in Rails app
            {
              loader: 'css-wrap-loader?selector=.__react_root_relaunch__',
            },
            {
              loader: 'sass-loader',
              options: {
                data: '@import "variables";',
                includePaths: [paths.cssSrc],
              },
            },
          ],
                      // use style-loader in development
          fallback: 'style-loader',
        }),
      },
      {
        test: /^(?!.*relaunch).*\.scss$/,
        use: extractSass.extract({
          use: [
                  { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                plugins() {
                  return [
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                    }),
                  ];
                },
              },
            },
            // wrap our CSS to avoid styling conflicts in Rails app
            {
              loader: 'css-wrap-loader?selector=.__react_root__',
            },
            {
              loader: 'sass-loader',
              options: {
                data: '@import "variables";',
                includePaths: [paths.cssSrc],
              },
            },
          ],
                      // use style-loader in development
          fallback: 'style-loader',
        }),
      },
      // "babel" loader needed to parse Icon.js file
      // "svg-sprite" loader used to generate and swap JSX component for svg
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'svg-sprite-loader',
            options: { 
                runtimeGenerator: require.resolve('./svg-to-icon-component-runtime-generator')
            }
          }
        ],
      },
      // ** STOP ** Are you adding a new loader?
      // Remember to add the new extension(s) to the "url" loader exclusion list.
    ],
  },
  plugins: [
    // Scope Hoisting for optimizing builds
    new webpack.optimize.ModuleConcatenationPlugin(),
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In development, this will be an empty string.
    new InterpolateHtmlPlugin(env.raw),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    new webpack.NamedModulesPlugin(),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
    new webpack.DefinePlugin(env.stringified),
    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin(),
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebookincubator/create-react-app/issues/240
    new CaseSensitivePathsPlugin(),
    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    // See https://github.com/facebookincubator/create-react-app/issues/186
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),

    new StyleLintPlugin({
      files: 'src/css/**/*.scss',
      syntax: 'scss',
    }),

    extractSass,
    new ManifestPlugin({
      fileName: 'webpack/asset-manifest.json',
    }),
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed. These warnings become
  // cumbersome.
  performance: {
    hints: false,
  },
};
