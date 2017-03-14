import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import React from 'react';
import fs from 'fs';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfiguration from './config/webpack.config.prod';
import { renderToString } from 'react-dom/server';
import csshook from 'css-modules-require-hook/preset';

const app = express();
// var { createIsomorphicWebpack } = require('isomorphic-webpack');

// var compiler = webpack(webpackConfiguration);
var App = require('./src/js/App');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// app.use(webpackDevMiddleware(compiler));

app.get('/app', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(renderToString(<App/>));
});

app.listen(8001);
console.log('Go to http://localhost:8001');
export default app;
