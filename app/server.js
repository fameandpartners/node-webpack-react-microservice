// only ES5 is allowed in this file
require('ignore-styles');
require('babel-register');

const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const React = require('react');
const Promise = require('bluebird');
const fs = require('fs');
const redis = require('redis');
const { render, template, setCacheStrategy } = require('rapscallion');


// Components
const Head = require('./src/js/Head');
const App = require('./src/js/App');

// Set up Express + Redis
const app = express();
const redisClient = redis.createClient();
const redisGet = Promise.promisify(redisClient.get, { context: redisClient });
const redisSet = Promise.promisify(redisClient.set, { context: redisClient });
setCacheStrategy({ // Global Singleton for Rapscallion
  get: key => redisGet(key).then(val => (val && JSON.parse(val)) || null),
  set: (key, val) => redisSet(key, JSON.stringify(val)),
});

// Middleware
app.use(express.static('./build'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/app', (req, res) => {
  fs.readFile('./build/asset-manifest.json', 'utf8', (err, assetManifest) => {
    if (err) return err;
    // const props = req.body;
    const props = { $$appState: { defaultValue: ['injected'] } };
    const assets = JSON.parse(assetManifest);
    const responseRenderer = template`
      <html>
        ${render(React.createElement(Head))}
        <body>
            <div id='root'>
              ${render(React.createElement(App, props))}
            </div>
          <script>
            window.__data = ${JSON.stringify(props)};
          </script>
          <link rel="stylesheet" href=${assets['main.css']} />
          <script src=${assets['main.js']}></script>
        </body>
      </html>
    `;

    responseRenderer.toStream().pipe(res);
    return null;
  });
});

app.get('*', (req, res) => {
  res.send('Howdy!');
});

app.listen(process.env.PORT || 8001);
console.log('');
console.log('Launched Successfully');
console.log('Go to http://localhost:8001');
module.exports = app;
