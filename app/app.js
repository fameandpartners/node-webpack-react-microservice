var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var React = require('react');
var fs = require('fs');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackConfiguration = require('./config/webpack.config.prod');
var { renderToString } = require('react-dom/server');
var { createIsomorphicWebpack } = require('isomorphic-webpack');

var compiler = webpack(webpackConfiguration);
var App = require('./src/js/App');

app.use(webpackDevMiddleware(compiler, {
  noInfo: false,
  publicPath: '/static',
  quiet: false,
  stats: {
    assets: false,
    chunkModules: false,
    chunks: false,
    colors: true,
    hash: false,
    timings: false,
    version: false
  }
}));

const {
  createCompilationPromise,
  evalBundleCode
} = createIsomorphicWebpack(webpackConfiguration, {
  useCompilationPromise: true
});


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(webpackDevMiddleware(compiler));

app.use(async(req, res, next) => {
  await(createCompilationPromise);
  next();
})

const renderFullPage = (body) => {
  const html = renderToString(<App/>);

  fs.readFile('./build/index.html', 'utf8', function (err, file) {
    if (err) {
      return console.log(err);
    }
    return file.replace(/<div id="root"><\/div>/, `<div id="root">${html}</div>`);
  });
};

app.get('/', (req, res) => {
  const requestUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  const app = renderToString(evalBundleCode(requestUrl).default);
  res.send(renderFullPage(app));
})
// compiler.plugin('done', () => {
//   if (routesAreInitialized) { return; }
//   routesAreInitialized = true;
//
  //   const html = ReactDOMServer.renderToString(require('./src/js/App').default);
  //
  //   fs.readFile('./build/index.html', 'utf8', function (err, file) {
  //     if (err) {
  //       return console.log(err);
  //     }
  //     const document = file.replace(/<div id="root"><\/div>/, `<div id="root">${html}</div>`);
  //     res.send(document);
  //   });
  // });
//
// });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('<html>error</html>');
});

app.listen(3001);
console.log('Go to http://localhost:3001');
module.exports = app;
