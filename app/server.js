require('ignore-styles');
require('babel-register');

const express = require('express');
const logger = require('morgan');
const React = require('react');
const Provider = require('react-redux').Provider;
const Promise = require('bluebird');
const redis = require('redis');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { render, setCacheStrategy } = require('rapscallion');
const chalk = require('chalk');
// const pdpData = require('./pdp.json');
// console.log(pdpData);

// Assets
const clientAssets = require('./build/asset-manifest.json');
const template = require('./template');


// Utilities
const { transformProductJSON } = require('./src/js/utilities/pdp');

// Components
const App = require('./src/js/App');
const mockJSON = require('./src/mock/product.json');

// Store
const AppStore = require('./src/js/stores/AppStore');

// Set up Express + Redis
// *****************************************************************************
const app = express();
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
});
const redisGet = Promise.promisify(redisClient.get, { context: redisClient });
const redisSet = Promise.promisify(redisClient.set, { context: redisClient });
setCacheStrategy({ // Global Singleton for Rapscallion
  get: key => redisGet(key).then(val => (val && JSON.parse(val)) || null),
  set: (key, val) => redisSet(key, JSON.stringify(val)),
});

// Middleware
// *****************************************************************************
app.use(helmet());
app.use(express.static('./build'));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// Rendering
// *****************************************************************************
app.get('/pdp', (req, res) => {
  const props = transformProductJSON(mockJSON);
  const store = AppStore(props);
  const ReactRoot = render(React.createElement(Provider, { store }, React.createElement(App)));
  const html = template({
    root: ReactRoot,
    initialState: store.getState(),
    jsBundle: clientAssets['main.js'],
    cssBundle: clientAssets['main.css'],
  });

  html.toStream().pipe(res);
});

app.post('/pdp', (req, res) => {
  res.header('Content-Type', 'text/html');
  console.log(`Generate PDP for: ${chalk.yellow(req.body.data.product.name)}`);

  try {
    const props = transformProductJSON(req.body.data);
    const store = AppStore(props);
    const ReactRoot = render(React.createElement(Provider, { store }, React.createElement(App)));
    const html = template({
      root: ReactRoot,
      initialState: store.getState(),
      jsBundle: clientAssets['main.js'],
      cssBundle: clientAssets['main.css'],
    });

    // Response stream back
    html.toStream().pipe(res);
  } catch (e) {
    // Catch errors so we don't generate malformed HTML
    res.send({ e, error: true, message: 'Incorrect Params' });
  }
});

app.listen(process.env.PORT || 8001);
console.log('Launched Successfully');
console.log('Go to http://localhost:8001');
module.exports = app;
