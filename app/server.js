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
// const pdpData = require('./pdp.json');
// console.log(pdpData);

// Assets
const clientAssets = require('./build/asset-manifest.json');
const template = require('./template');


// Components
const App = require('./src/js/App');

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Rendering
// *****************************************************************************
app.get('/app', (req, res) => {
  res.header('Content-Type', 'text/html');
  const props = { $$appState: { defaultValue: ['injected'] } };
  const store = AppStore(props);
  const ReactRoot = render(React.createElement(Provider, { store },
    React.createElement(App)
  ));
  const html = template({
    root: ReactRoot,
    initialState: store.getState(),
    jsBundle: clientAssets['main.js'],
    cssBundle: clientAssets['main.css'],
  });

  html.toStream().pipe(res);
});

app.listen(process.env.PORT || 8001);
console.log('Launched Successfully');
console.log('Go to http://localhost:8001');
module.exports = app;
