const express = require('express');
const logger = require('morgan');

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
app.use(express.static('./build'));
app.use(logger('dev'));

app.get('/webpack/asset-manifest', (req, res) => {
  const clientAssets = require('./build/webpack/asset-manifest.json');
  const assetPaths = {
    jsBundle: clientAssets['pdp.js'],
    cssBundle: clientAssets['pdp.css'],
    flashJsBundle: clientAssets['flash.js'],
    flashCssBundle: clientAssets['flash.css'],
    bridesmaidJSBundle: clientAssets['bridesmaid.js'],
    bridesmaidCssBundle: clientAssets['bridesmaid.css'],
    bridesmaidsFilterJsBundle: clientAssets['bridesmaidsFilter.js'],
    bridesmaidsFilterCssBundle: clientAssets['bridesmaidsFilter.css'],
    swatchJsBundle: clientAssets['swatch.js'],
    swatchCssBundle: clientAssets['swatch.css'],
  };
  res.send(assetPaths);
});

app.listen(process.env.PORT || 8001);

// reset the rails cache, have to do it here cause ebs environment variables are lies
require('./scripts/clear_cache');
/* eslint-disable no-console */
console.log('Launched Successfully');
console.log('Go to http://localhost:8001');
module.exports = app;
