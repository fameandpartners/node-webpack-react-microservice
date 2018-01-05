/* eslint-disable */
require('ignore-styles');
require('babel-register');
// require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const React = require('react');
const Provider = require('react-redux').Provider;
const clientAssets = require('./build/webpack/asset-manifest.json');
// const Promise = require('bluebird');
// const redis = require('redis');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
// const { render, setCacheStrategy } = require('rapscallion');
const ReactDOMServer = require('react-dom/server');

// eslint-disable-next-line
const chalk = require('chalk');

// Assets
const template = require('./template');


// Utilities
const { transformProductJSON } = require('./src/js/utilities/pdp');

// Components
const App = require('./src/js/App');
const mockJSON = require('./src/mock/product.json');
const request = require('superagent');

// Store
const AppStore = require('./src/js/stores/AppStore');


// Set up Express + Redis
// *****************************************************************************
const app = express();
// const redisClient = redis.createClient({
//   host: process.env.REDIS_HOST || '127.0.0.1',
//   port: process.env.REDIS_PORT || 6379,
// });
// const redisGet = Promise.promisify(redisClient.get, { context: redisClient });
// const redisSet = Promise.promisify(redisClient.set, { context: redisClient });
// setCacheStrategy({ // Global Singleton for Rapscallion
//   get: key => redisGet(key).then(val => (val && JSON.parse(val)) || null),
//   set: (key, val) => redisSet(key, JSON.stringify(val)),
// });

// Middleware
// *****************************************************************************
app.use(helmet());
app.use(express.static('./build'));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());


app.get('/webpack/asset-manifest', (req, res) => {
  const clientAssets = require('./build/webpack/asset-manifest.json');
  var asset_paths = {
    jsBundle: clientAssets['pdp.js'],
    cssBundle: clientAssets['pdp.css'],
    flashJsBundle: clientAssets['flash.js'],
    flashCssBundle: clientAssets['flash.css'],
    bridesmaidsFilterJsBundle: clientAssets['bridesmaidsFilter.js'],
    bridesmaidsFilterCssBundle: clientAssets['bridesmaidsFilter.css'],
  }
  res.send(asset_paths);
});

app.get('/client', (req, res) => {
  res.header('Content-Type', 'application/json');

  // eslint-disable-next-line
  console.log('Sending fake assets');
  var asset_paths = {
    pathA: 'someBS',
    pathB: 'someBS',
  }
  res.send(asset_paths);
});

app.get('/pdp', (req, res) => {
  res.header('Content-Type', 'text/html');
  const props = transformProductJSON(mockJSON);
  const store = AppStore(props);
  const ReactRoot = ReactDOMServer.renderToString(
    React.createElement(Provider, { store }, React.createElement(App))
  );
  const html = template({
    root: ReactRoot,
    initialState: store.getState(),
    jsBundle: clientAssets['main.js'],
    cssBundle: clientAssets['main.css']
  });

  res.send(html);
});

app.post('/pdp', (req, res) => {
  res.header('Content-Type', 'application/json');

  // eslint-disable-next-line
  console.log(`Generating PDP for: ${chalk.yellow(req.body.data.product.name)}`);

  try {
    const props = transformProductJSON(req.body.data);
    const store = AppStore(props);
    const ReactRoot = ReactDOMServer.renderToString(
      React.createElement(Provider, { store }, React.createElement(App))
    );
    const html = template({
      root: ReactRoot,
      initialState: store.getState()
    });

    res.send({
      partial: html,
      jsBundle: clientAssets['main.js'],
      cssBundle: clientAssets['main.css']
    });
  } catch (e) {
    // Catch errors so we don't generate malformed HTML
    res.status(500).send({ e, error: true, message: 'Incorrect Params' });
  }
});

app.listen(process.env.PORT || 8001);

// reset the rails cache, have to do it here cause ebs environment variables are lies
require('./scripts/clear_cache');
/* eslint-disable no-console */
console.log('Launched Successfully');
console.log('Go to http://localhost:8001');
module.exports = app;
